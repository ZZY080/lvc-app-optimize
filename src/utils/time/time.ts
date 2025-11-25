import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

// 启用插件
dayjs.extend(duration);

// 将Iso时间格式化为普通时间
export const formatIsoTime = (isoStringTime: string): string => {
  const date = new Date(isoStringTime);

  // 提取年月日
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 获取月份，注意：月份从0开始，需要加1
  const day = String(date.getDate()).padStart(2, "0"); // 获取日期
  // 拼接为 YYYY-MM-DD 格式
  return `${year}-${month}-${day}`;
};
// 将秒数转换为 hh:mm:ss 格式
export const formatSecondsToTime = (totalSeconds: number): string => {
  const hours = Math.floor(totalSeconds / 3600); // 计算小时
  const minutes = Math.floor((totalSeconds % 3600) / 60); // 计算分钟
  const seconds = totalSeconds % 60; // 计算剩余秒数

  // 格式化时间，补零显示两位数字
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

/**
 * 国际化秒数转换
 * @param {number} seconds 秒数
 * @param {string} locale 语言代码 (如 'zh-cn', 'en')
 * @param {boolean} showZeroHour 是否显示0小时
 * @returns {string} 格式化的时间字符串
 */
export const formatSeconds = (
  seconds: number,
  locale = "en",
  showZeroHour = false
) => {
  // 设置语言
  dayjs.locale(locale);

  // 转换为duration对象 (注意：秒转毫秒要×1000)
  const d = dayjs.duration(seconds * 1000);

  // 提取时间部分
  const hours = Math.floor(d.asHours());
  const mins = d.minutes();
  const secs = d.seconds();

  // 根据语言环境生成不同格式
  switch (locale) {
    case "cn":
      return `${hours}小时${mins}分${secs}秒`;
    case "en":
      return `${hours} h ${mins} m ${secs} s`;
    default: // 英语等
      return showZeroHour || hours > 0
        ? `${hours}:${mins.toString().padStart(2, "0")}:${secs
            .toString()
            .padStart(2, "0")}`
        : `${mins}:${secs.toString().padStart(2, "0")}`;
  }
};
