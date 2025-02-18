/**
 * 格式化时间
 * @param input - 时间输入，可以是 ISO 字符串、Date 对象或时间戳
 * @param format - 格式，例如 'YYYY-MM-DD HH:mm:ss'
 * @returns 格式化后的时间字符串
 */
export function formatDate(input: string | Date | number, format: string = 'YYYY-MM-DD HH:mm:ss'): string {
    // 将输入转换为Date对象
    // 如果是字符串，转换为Date
    // 如果是Date实例，直接使用
    // 如果是数字（时间戳），转换为Date
    const date = typeof input === 'string' 
      ? new Date(input) 
      : input instanceof Date 
        ? input 
        : new Date(input);
  
    // 定义时间格式映射对象
    // YYYY: 年份
    // MM: 月份，补零
    // DD: 日期，补零
    // HH: 小时，补零
    // mm: 分钟，补零
    // ss: 秒数，补零
    const map: { [key: string]: number | string } = {
      YYYY: date.getFullYear(),
      MM: String(date.getMonth() + 1).padStart(2, '0'),
      DD: String(date.getDate()).padStart(2, '0'),
      HH: String(date.getHours()).padStart(2, '0'),
      mm: String(date.getMinutes()).padStart(2, '0'),
      ss: String(date.getSeconds()).padStart(2, '0'),
    };
  
    // 使用正则表达式替换格式字符串中的占位符
    return format.replace(/YYYY|MM|DD|HH|mm|ss/g, (key) => String(map[key]));
  }
  
  /** 
   * 通过传入的时间与传入的时长，返回格式（12月30日10:00-12:00）
   * @param input - 时间输入，可以是 ISO 字符串、Date 对象或时间戳
   * @param duration - 时长，单位为分钟
   * @returns 格式化后的时间字符串
   */
  export function formatTime(input: string | Date | number, duration: number): string {
    const date = typeof input === 'string' ? new Date(input) : input instanceof Date ? input : new Date(input);
    const endTime = new Date(date.getTime() + duration * 60 * 1000);
    return `${formatDate(date, 'MM月DD日HH:mm')}-${formatDate(endTime, 'HH:mm')}`;
  }

  /**
   * 将对象转换为URL参数
   * @param params - 要转换的对象
   * @returns 转换后的URL参数字符串
   */
  export function tansParams(params: Record<string, any>): string {
    let result = '';
    
    for (const propName of Object.keys(params)) {
      const value = params[propName];
      const part = encodeURIComponent(propName) + "=";
  
      if (value !== null && value !== "" && typeof value !== "undefined") {
        if (typeof value === 'object') {
          // 处理值为对象的情况
          for (const key of Object.keys(value)) {
            if (value[key] !== null && value[key] !== "" && typeof value[key] !== 'undefined') {
              const paramKey = `${propName}[${key}]`;
              const subPart = encodeURIComponent(paramKey) + "=";
              result += subPart + encodeURIComponent(value[key]) + "&";
            }
          }
        } else {
          // 处理基本类型值
          result += part + encodeURIComponent(value) + "&";
        }
      }
    }
  
    // 去掉末尾多余的 "&" 并返回
    return result.slice(0, -1);
  }
  