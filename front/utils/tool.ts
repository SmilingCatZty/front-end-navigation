type DebouceModel = {
  immediate: boolean
}

/**
 * 防抖函数
 * @param func 需要执行的方法
 * @param delay 延迟时间
 * @param options 其他选项 {immediate - 立即执行}
 * @returns 
 */
const debounce = (func: Function, delay: number, options:DebouceModel) => {
  if (typeof func !== 'function') {
    throw new TypeError('期望传入值为函数')
  }
  if (typeof delay !== 'number') {
    delay = Number(delay) || 0
  }
  const immediate = options && options.immediate

  let debounceTimeOut: ReturnType<typeof setTimeout> | null = null
  let immediateExecuted = false

  return (): void => {
    if (debounceTimeOut) {
      clearTimeout(debounceTimeOut)
    }
    if (immediate && !immediateExecuted) {
      func()
      immediateExecuted = true
      return
    }
    debounceTimeOut = setTimeout(() => {
      func()
      debounceTimeOut = null
    }, delay)
  }
}
