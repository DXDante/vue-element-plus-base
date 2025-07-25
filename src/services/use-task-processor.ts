class TaskProcessor {
  private _worker: Worker | null = null

  /**
   * 创建 worker
   * @param scriptStr 处理数据的字符串脚本代码, 格式保持以下示例
   * ```
   * `
   *  self.onmessage = ({ data }) => {
   *    // data 是要处理的源数据(注意不能是代理对象, 必须是源数据)
   *    console.time('###') // 输出执行时间
   *    self.postMessage(xxx)
   *    console.timeEnd('###')
   *  }
   * `
   * ```
   * @returns
   */
  create(scriptStr: string) {
    try {
      // 创建 Blob 对象
      const blob = new Blob([scriptStr], { type: 'application/javascript' })
      // 创建 Worker
      this._worker = new Worker(URL.createObjectURL(blob))
      return this
    } catch (error) {
      throw error
    }
  }

  /**
   * 运行 worker
   * @param resource 源数据(注意不能是代理数据)
   * @returns
   */
  run<T>(resource: T): Promise<unknown | null> {
    return new Promise((resolve, reject) => {
      if (this._worker === null) {
        return reject(new Error('未创建可供 worker 运行的字符串代码'))
      }
      this._worker.onmessage = ({ data }) => {
        resolve(data)
      }
      this._worker.onerror = (...rest) => {
        reject(null)
        console.error(...rest)
      }
      // 使用 Worker
      this._worker.postMessage(resource)
    })
  }

  constructor(scriptStr?: string) {
    if (!scriptStr) {
      return
    }
    this.create(scriptStr)
  }
}

/**
 * 使用任务处理器(动态使用字符串代码创建 web worker, 稍后通过调用 run 传递数据并处理数据, 返回 promise 的处理结果)
 * Tip: 如果传递大量数据, 就要慎重考虑, 因为传递到 worker 线程的数据会被 JSON 化, 导致转换耗时增加, 但是好处是不影响主线程代码执行(比如执行大数据循环时渲染一个 Loading, 让用户等待处理)
 * @param workerScript 处理数据的字符串脚本代码, 格式保持以下示例
 * ```
 * `
 *  self.onmessage = ({ data }) => {
 *    // data 是要处理的源数据(注意不能是代理对象, 必须是源数据)
 *    console.time('###') // 输出执行时间
 *    self.postMessage(xxx)
 *    console.timeEnd('###')
 *  }
 * `
 * ```
 * @returns
 */
const useTaskProcessor = (workerScript?: string) => {
  return new TaskProcessor(workerScript)
}

export default useTaskProcessor
