// EXPORTS: MONTH_DAY_EVENTS, getEventsOfDate, getEventsOfWeek, getEventsOfMonth, MONTH_DAY_TOTAL
// 有明确公历月日的历史事件（宁缺毋滥，史实准确）
// 仅存 nodeId -> { month, day } 映射，主体数据仍在 history.ts
// 中国古代农历事件若无可靠公历换算则不收录
// 所有 id 必须存在于 ALL_HISTORY_NODES，零悬空

export const MONTH_DAY_EVENTS: Record<string, { month: number; day: number }> = {
  // ===== 1 月 =====
  'german-unification': { month: 1, day: 18 },       // 1871 德意志统一
  'meiji-restoration': { month: 1, day: 3 },          // 1868 明治维新
  'event-yongzheng-reform': { month: 1, day: 11 },    // 1723 雍正即位改元（近似）

  // ===== 2 月 =====
  'communist-manifesto': { month: 2, day: 21 },       // 1848 共产党宣言发表
  'war-stalingrad': { month: 2, day: 2 },          // 1943 斯大林格勒德军投降
  'lincoln': { month: 2, day: 12 },                   // 1809 林肯诞辰
  'darwin': { month: 2, day: 12 },                    // 1809 达尔文诞辰
  'person-lincoln': { month: 2, day: 12 },            // 1809 林肯诞辰（双条）
  'person-darwin': { month: 2, day: 12 },             // 1809 达尔文诞辰（双条）

  // ===== 3 月 =====
  'economy-roosevelt-new-deal': { month: 3, day: 4 }, // 1933 罗斯福新政
  'crusades': { month: 3, day: 27 },                  // 1096 第一次十字军出发

  // ===== 4 月 =====
  'da-vinci': { month: 4, day: 23 },                  // 1452 达芬奇诞辰
  'person-shakespeare': { month: 4, day: 23 },        // 1564 莎士比亚诞辰/卒日

  // ===== 5 月 =====
  'israel-middle-east-wars': { month: 5, day: 14 },   // 1948 以色列建国
  'person-marx': { month: 5, day: 5 },                // 1818 马克思诞辰
  'constantinople-fall': { month: 5, day: 29 },       // 1453 君士坦丁堡陷落
  'napoleon': { month: 5, day: 18 },                  // 1804 拿破仑称帝
  'woman-joan-of-arc': { month: 5, day: 30 },         // 1431 贞德就义

  // ===== 6 月 =====
  'magna-carta': { month: 6, day: 15 },               // 1215 大宪章签署
  'war-normandy': { month: 6, day: 6 },               // 1944 诺曼底登陆
  'korean-war': { month: 6, day: 25 },                // 1950 朝鲜战争爆发
  'waterloo': { month: 6, day: 18 },                  // 1815 滑铁卢战役
  'war-midway': { month: 6, day: 4 },                 // 1942 中途岛海战

  // ===== 7 月 =====
  'american-independence': { month: 7, day: 4 },      // 1776 美国独立宣言
  'world-war-1': { month: 7, day: 28 },               // 1914 一战爆发
  'apollo-11': { month: 7, day: 20 },                 // 1969 阿波罗11号登月
  'french-revolution': { month: 7, day: 14 },         // 1789 攻占巴士底狱

  // ===== 8 月 =====
  'india-independence': { month: 8, day: 15 },        // 1947 印度独立
  'hiroshima-nagasaki': { month: 8, day: 6 },         // 1945 广岛原子弹
  'war-cannae': { month: 8, day: 2 },                 // 前216 坎尼战役
  'person-napoleon': { month: 8, day: 15 },           // 1769 拿破仑诞辰

  // ===== 9 月 =====
  'world-war-2': { month: 9, day: 1 },                // 1939 二战爆发
  'atomic-bomb': { month: 9, day: 2 },                // 1945 日本投降
  'confucius': { month: 9, day: 28 },                 // 孔子诞辰
  'gutenberg': { month: 9, day: 30 },                 // 古腾堡印刷圣经（约）
  'war-marathon': { month: 9, day: 12 },              // 前490 马拉松战役（约）

  // ===== 10 月 =====
  'xinhai-revolution': { month: 10, day: 10 },        // 1911 武昌起义
  'prc-founding': { month: 10, day: 1 },              // 1949 新中国成立
  'united-nations': { month: 10, day: 24 },           // 1945 联合国日
  'cuban-missile-crisis': { month: 10, day: 22 },     // 1962 古巴导弹危机
  'fascism-rise': { month: 10, day: 28 },             // 1922 墨索里尼进军罗马
  'qin-unification': { month: 10, day: 1 },           // 前221年 秦统一（约）
  'reformation': { month: 10, day: 31 },              // 1517 宗教改革日
  'sputnik': { month: 10, day: 4 },                   // 1957 斯普特尼克1号
  'person-gandhi': { month: 10, day: 2 },             // 1869 甘地诞辰

  // ===== 11 月 =====
  'october-revolution': { month: 11, day: 7 },        // 1917 十月革命
  'berlin-wall-fall': { month: 11, day: 9 },          // 1989 柏林墙倒塌
  'person-engels': { month: 11, day: 28 },            // 1820 恩格斯诞辰
  'person-martin-luther': { month: 11, day: 10 },     // 1483 马丁路德诞辰

  // ===== 12 月 =====
  'glorious-revolution': { month: 12, day: 16 },      // 1688 光荣革命
  'ww2-pearl-harbor': { month: 12, day: 7 },          // 1941 珍珠港事件
  'great-depression': { month: 12, day: 1 },          // 1929 大萧条
  'soviet-collapse': { month: 12, day: 26 },          // 1991 苏联解体
  'reform-and-opening': { month: 12, day: 18 },       // 1978 十一届三中全会
  'newton': { month: 12, day: 25 },                   // 1642 牛顿诞辰
  'person-newton': { month: 12, day: 25 },            // 1642 牛顿诞辰（双条）
  'person-charlemagne': { month: 12, day: 25 },       // 800 查理曼加冕
};

export const MONTH_DAY_TOTAL = Object.keys(MONTH_DAY_EVENTS).length;

/** 获取某一天的历史事件 nodeId 列表 */
export function getEventsOfDate(month: number, day: number): string[] {
  return Object.entries(MONTH_DAY_EVENTS)
    .filter(([, d]) => d.month === month && d.day === day)
    .map(([id]) => id);
}

/** 获取本周（含前后3天）的历史事件 nodeId 列表 */
export function getEventsOfWeek(month: number, day: number): string[] {
  const target = new Date(2000, month - 1, day);
  const results: string[] = [];
  for (const [id, d] of Object.entries(MONTH_DAY_EVENTS)) {
    const ev = new Date(2000, d.month - 1, d.day);
    const diff = Math.abs(ev.getTime() - target.getTime()) / (1000 * 60 * 60 * 24);
    if (diff <= 3) results.push(id);
  }
  return results;
}

/** 获取本月内所有历史事件 nodeId 列表 */
export function getEventsOfMonth(month: number): string[] {
  return Object.entries(MONTH_DAY_EVENTS)
    .filter(([, d]) => d.month === month)
    .map(([id]) => id);
}
