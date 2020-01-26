
//存放与业务无关的工具方法

/**
 * @desc 函数防抖
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param immediate true 表立即执行，false 表非立即执行
 */
export const debounce=function(func, wait, immediate){
    let timeout;
    return function () {
      let context = this;
      let args = arguments;
      if (timeout) clearTimeout(timeout);
      if (immediate) {
        var callNow = !timeout;
        timeout = setTimeout(() => {
          timeout = null;
        }, wait)
        if (callNow) func.apply(context, args)
      } else {
        timeout = setTimeout(function () {
          func.apply(context, args)
        }, wait);
      }
    }
}
/**
 * @desc 报错函数
 */
export const errorFunc= res => {
  this.$alert('操作失败，请联系管理员', '警告', {
    confirmButtonText: '确定',
  });
}


