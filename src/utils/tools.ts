/**
 * 格式化时间
 * @param input - 时间输入，可以是 ISO 字符串、Date 对象或时间戳
 * @param format - 格式，例如 'YYYY-MM-DD HH:mm:ss'
 * @returns 格式化后的时间字符串
 */
export function formatDate(input: string | Date | number, format: string = 'YYYY-MM-DD HH:mm:ss'): string {
    const date = typeof input === 'string' 
      ? new Date(input) 
      : input instanceof Date 
        ? input 
        : new Date(input);
  
    const map: { [key: string]: number | string } = {
      YYYY: date.getFullYear(),
      MM: String(date.getMonth() + 1).padStart(2, '0'),
      DD: String(date.getDate()).padStart(2, '0'),
      HH: String(date.getHours()).padStart(2, '0'),
      mm: String(date.getMinutes()).padStart(2, '0'),
      ss: String(date.getSeconds()).padStart(2, '0'),
    };
  
    return format.replace(/YYYY|MM|DD|HH|mm|ss/g, (key) => String(map[key]));
  }
  