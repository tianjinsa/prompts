import { randomInt } from "node:crypto";
import path from "node:path";
import process from "node:process";


// 从 stdin 读取 VS Code Hook 传入的 JSON 数据
const chunks = [];
for await (const chunk of process.stdin) {
	chunks.push(chunk);
}

// 解析 Hook 输入；如果没有内容则回退为空对象
const input = JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");

// 当前即将调用的工具名
const toolName = String(input.tool_name || "");

// 当前工具的输入参数
const toolInput = input.tool_input || {};

// 工作区根目录：优先使用 Hook 输入中的 cwd
const workspaceRoot = typeof input.cwd === "string" && input.cwd.trim()
	? path.resolve(input.cwd)
	: null;

/**
 * 拒绝本次工具调用
 * @param {string} reason 展示给用户和模型的拒绝原因
 * @param {string} additionalContext 额外上下文，帮助模型理解为什么被拒绝
 */
function deny(reason, additionalContext = reason) {
	process.stdout.write(JSON.stringify({
		systemMessage: reason,
		hookSpecificOutput: {
			hookEventName: "PreToolUse",
			permissionDecision: "deny",
			permissionDecisionReason: reason,
			additionalContext
		}
	}));
	process.exit(0);
}

/**
 * 放行本次工具调用
 * @param {string} additionalContext 放行时提供给模型的额外上下文
 */
function allow(permissionDecisionReason = `路径检查通过：${toolName}`, additionalContext = '') {
	process.stdout.write(JSON.stringify({
		systemMessage: additionalContext,
		hookSpecificOutput: {
			hookEventName: "PreToolUse",
			permissionDecision: "allow",
			additionalContext: additionalContext,
		}
	}));
	process.exit(0);
}

// 如果拿不到工作区根目录，就无法安全判断 .Nexus 权限边界，直接拒绝
if (!workspaceRoot) {
	deny("Nexus hook 无法确定工作区根目录");
}

// 允许访问的根目录：工作区下的 .Nexus
const nexusRoot = path.resolve(workspaceRoot, ".Nexus");

/**
 * 将工具输入中的路径解析为绝对路径
 * 解析规则：相对路径基于 workspaceRoot；绝对路径会保持为绝对路径
 * @param {string} p
 * @returns {string|null}
 */
function toAbsolutePath(p) {
	if (typeof p !== "string" || !p.trim()) {
		return null;
	}
	return path.resolve(workspaceRoot, p.trim());
}

/**
 * 判断某个绝对路径是否在允许的范围内
 * 允许范围：
 * 1. 工作区下的 .Nexus 目录
 * 2. 任意路径下的 skills 目录（路径中包含 skills 作为组成部分）
 * @param {string} absPath
 * @returns {boolean}
 */
function isPathAllowed(absPath) {
	// 检查是否在 .Nexus 目录下
	const relToNexus = path.relative(nexusRoot, absPath);
	if (relToNexus === "" || (!relToNexus.startsWith("..") && !path.isAbsolute(relToNexus))) {
		return true;
	}
	// 检查路径中是否包含 skills 作为组成部分
	const pathParts = absPath.split(path.sep);
	return pathParts.includes("skills");
}

/**
 * 检查一组路径是否都在允许的范围内（.Nexus 目录或任意 skills 目录）
 * 只要有任意路径越界，就拒绝本次工具调用
 * @param {string[]} paths
 */
function checkPaths(paths) {
	for (const p of paths) {
		const abs = toAbsolutePath(p);
		if (!abs) {
			continue;
		}
		if (!isPathAllowed(abs)) {
			// 拒绝访问越界路径，并提供额外上下文帮助模型理解权限边界
			deny(
				`拦截nexus使用 ${toolName} 访问非允许目录文件的请求`,
				`Nexus 没有读取或修改非允许目录文件的权限 | 允许范围：.Nexus 目录或任意 skills 目录 | 你必须严格按照系统提示词描述的流程进行操作`
			);
			return;
		}
	}
}

/**
 * 从对象数组中提取 filePath/path
 * @param {unknown} items
 * @returns {string[]}
 */
function extractPathsFromItems(items) {
	if (!Array.isArray(items)) {
		return [];
	}

	return items
		.map((item) => item?.filePath || item?.path)
		.filter((p) => typeof p === "string" && p.trim());
}

// 按工具名分别处理
switch (toolName) {
	// 单文件读写类工具：通常使用 filePath 或 path
	case "read_file":
	case "replace_string_in_file":
	case "create_file":
	case "delete_file":
	case "edit_notebook_file":
		checkPaths([toolInput.filePath || toolInput.path]);
		allow();
		break;

	// multi_replace_string_in_file 的路径在 replacements[*].filePath
	case "multi_replace_string_in_file":
		checkPaths(extractPathsFromItems(toolInput.replacements));
		allow();
		break;

	// 批量编辑工具：通常在 files 数组中包含多个文件路径
	case "editFiles":
		checkPaths(extractPathsFromItems(toolInput.files));
		allow();
		break;

	// 其他未知工具：当前策略是默认放行
	// 如果你希望更严格，可以改成 deny(...)
	default:
		var x=randomInt(0, 100);
		if(x <= 10) {
			allow(`未命中受限文件工具，默认放行：${toolName}`,"随机提醒:你必须严格按照系统提示词描述的流程进行操作，比如plan.md文件的管理");
		}
		else {
			allow(`未命中受限文件工具，默认放行：${toolName},${x}`);
		}
}