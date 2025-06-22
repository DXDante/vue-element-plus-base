import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, dirname, extname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 *  此脚本在 yapi-to-typescript 生成接口类型文件后, 把 export 替换为 declare, 以全局使用
 *  见 package.json scripts 执行命令
 */

// 配置常量
const API_DIR = join(dirname(fileURLToPath(import.meta.url)), 'src/typings/api');
const FILE_EXTS = ['.ts', '.d.ts'];
const EXPORT_REGEX = /^export\s+(interface|type|enum|class|const|let|var|function)/gm;

// 带时间戳的日志
const logger = {
  info: (...args) => console.log(`[${new Date().toISOString()}] INFO`, ...args),
  warn: (...args) => console.warn(`[${new Date().toISOString()}] WARN`, ...args),
  error: (...args) => console.error(`[${new Date().toISOString()}] ERROR`, ...args),
  debug: (...args) => process.env.DEBUG && console.debug(`[${new Date().toISOString()}] DEBUG`, ...args)
};

async function processFile(file) {
  const start = Date.now();
  try {
    logger.debug(`开始处理 ${basename(file)}`);
    const content = await readFile(file, 'utf8');

    const replaceStart = Date.now();
    const newContent = content.replace(EXPORT_REGEX, 'declare $1');
    logger.debug(`正则替换耗时 ${Date.now() - replaceStart}ms`);

    if (newContent !== content) {
      const writeStart = Date.now();
      await writeFile(file, newContent);
      logger.debug(`文件写入耗时 ${Date.now() - writeStart}ms`);
      logger.info(`✅ 修改成功 ${basename(file)} (${Date.now() - start}ms)`);
      return { modified: true, size: content.length };
    }

    logger.debug(`⏩ 未修改 ${basename(file)} (${Date.now() - start}ms)`);
    return { modified: false, size: content.length };
  } catch (err) {
    logger.error(`处理失败 ${basename(file)}`, err.message);
    return { error: err.message };
  }
}

async function main() {
  try {
    logger.info('🚀 启动文件转换');
    const scanStart = Date.now();

    const dirents = await readdir(API_DIR, { withFileTypes: true });
    const files = dirents
      .filter(dirent => {
        const isTarget = dirent.isFile() && FILE_EXTS.includes(extname(dirent.name));
        if (!isTarget) logger.debug(`跳过非目标文件 ${dirent.name}`);
        return isTarget;
      })
      .map(dirent => join(API_DIR, dirent.name));

    logger.info(`🔍 扫描完成，共发现 ${files.length} 个文件 (${Date.now() - scanStart}ms)`);

    if (!files.length) {
      logger.warn('⚠️ 未找到可处理文件');
      return;
    }

    logger.info('🔄 开始处理文件...');
    const processStart = Date.now();
    const results = await Promise.all(files.map(processFile));

    // 统计结果
    const modified = results.filter(r => r.modified).length;
    const errors = results.filter(r => r.error);
    const totalSize = results.reduce((sum, r) => sum + (r.size || 0), 0);

    logger.info(`
      📊 转换完成
      ├─ 总耗时: ${Date.now() - processStart}ms
      ├─ 处理文件: ${files.length} 个 (${(totalSize / 1024).toFixed(2)}KB)
      ├─ 成功修改: ${modified} 个
      ├─ 未变化: ${files.length - modified - errors.length} 个
      └─ 失败: ${errors.length} 个
    `);

    errors.forEach(({ file, error }) =>
      logger.error(`失败文件 ${basename(file)}: ${error}`));

  } catch (error) {
    logger.error('致命错误', error.stack || error.message);
    process.exit(1);
  }
}

await main();