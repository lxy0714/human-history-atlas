// 把数据里预存的中文 yearDisplay 串转成英文。
// 节点只有 year、没有结束年，无法从数值重算区间，故对既有串做确定性 token 转换。
// 词表来自对 history-index.ts 全量 yearDisplay 的成分统计 + 763 节点逐条回退明细，
// 未覆盖的成分整体回退中文原文，绝不中英混排、绝不猜测或丢弃信息。

import type { I18nLang } from './types';

function ordinal(n: number): string {
  const t = n % 100;
  if (t >= 11 && t <= 13) return `${n}th`;
  switch (n % 10) {
    case 1: return `${n}st`;
    case 2: return `${n}nd`;
    case 3: return `${n}rd`;
    default: return `${n}th`;
  }
}
const ord = (d: string) => ordinal(Number(d.replace(/,/g, '')));

/** N万年前 → 英文数量级（≥100万用 million，否则千分位整数）。 */
function wanAgo(n: string): string {
  const years = Number(n) * 10000;
  if (years >= 1_000_000) {
    const m = years / 1_000_000;
    const label = Number.isInteger(m) ? String(m) : m.toFixed(1);
    return `${label} million years ago`;
  }
  return `${years.toLocaleString('en-US')} years ago`;
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

/** 少量带书名号 / 散文的复合串：逐条人工译，避免机器拼接出错。 */
const OVERRIDES: Record<string, string> = {
  '公元1688年光荣革命，1689年颁布《权利法案》':
    'Glorious Revolution 1688; Bill of Rights enacted 1689',
  '公元1839年（虎门销烟），1840年战争爆发':
    'Humen opium destruction 1839; war broke out 1840',
  '历史六次大改道': 'Six major course changes in recorded history',
  '明万历二十年（小说《西游记》成书）':
    '20th year of Wanli, Ming (novel Journey to the West compiled)',
  '传说时代（约前2,070年建夏）': 'Legendary era (Xia founded c. 2070 BCE)',
  '始建于前214年，明代大修': 'Begun 214 BCE; major reconstruction under the Ming',
  '约前312年纳巴泰王国建都': 'Nabataean capital founded c. 312 BCE',
  '公元1258年、公元1285年、公元1287—公元1288年':
    '1258, 1285, 1287–1288 CE',
  '战国至汉代（文献成书）': 'Warring States to Han (text compiled)',
  '前8世纪（《神谱》成型）': '8th century BCE (Theogony composed)',
  '约公元8—11世纪（维京时代吟唱定型）':
    'c. 8th–11th century CE (fixed in Viking-age verse)',
  '公元1931年—公元1945年（14年抗战）':
    '1931–1945 CE (14-year resistance)',
  '公元1760年—公元1840年（第一次）': '1760–1840 CE (First)',
  '公元184年—公元280年（汉末三国）': '184–280 CE (late Han / Three Kingdoms)',
  '前264年—前146年（三次）': '264–146 BCE (three wars)',
  '18世纪末—19世纪中': 'late 18th – mid 19th century',
};

/** 括注：整体替换，必须先于朝代词表，否则「金字塔」里的「金」会被误当金朝。 */
const PARENS: Array<[string, string]> = [
  ['（古王国时期）', '(Old Kingdom)'],
  ['（金字塔铭文时期）', '(Pyramid Texts era)'],
  ['（苏美尔版）', '(Sumerian version)'],
  ['（传说时期）', '(legendary period)'],
  ['（吠陀时代）', '(Vedic period)'],
  ['（文学作品）', '(literary work)'],
];

/** 朝代 / 时期：按长度降序应用，长词优先。 */
const DYNASTIES: Array<[string, string]> = ([
  ['战国中晚期', 'mid-to-late Warring States'],
  ['战国早期', 'early Warring States'],
  ['商代晚期', 'late Shang'],
  ['曹魏-西晋', 'Cao Wei–Western Jin'],
  ['前秦至元', 'Former Qin to Yuan'],
  ['金末-元初', 'late Jin–early Yuan'],
  ['明末清初', 'late Ming–early Qing'],
  ['汉代—清代', 'Han–Qing dynasties'],
  ['唐中期', 'mid-Tang'],
  ['希腊化时期', 'Hellenistic period'],
  ['托勒密王朝', 'Ptolemaic dynasty'],
  ['战国', 'Warring States'],
  ['西汉', 'Western Han'],
  ['东汉', 'Eastern Han'],
  ['东晋', 'Eastern Jin'],
  ['西晋', 'Western Jin'],
  ['北宋', 'Northern Song'],
  ['南宋', 'Southern Song'],
  ['宋元', 'Song–Yuan'],
  ['晚明', 'late Ming'],
  ['明清', 'Ming–Qing'],
  ['明-清', 'Ming–Qing'],
  ['明代', 'Ming dynasty'],
  ['汉代', 'Han dynasty'],
  ['中世纪', 'Middle Ages'],
  ['辽', 'Liao'],
  ['金', 'Jin'],
  ['元', 'Yuan'],
  ['明', 'Ming'],
  ['清', 'Qing'],
  ['隋', 'Sui'],
  ['唐', 'Tang'],
] as Array<[string, string]>).sort((a, b) => b[0].length - a[0].length);

/** 动词 / 修饰：在年份数字转换之后应用。 */
const VERBS: Array<[RegExp, string]> = [
  [/完工/g, 'completed'],
  [/建成/g, 'completed'],
  [/重建/g, 'rebuilt'],
  [/建造/g, 'built'],
  [/成书/g, 'compiled'],
  [/印制/g, 'printed'],
  [/出版/g, 'published'],
  [/前后/g, ' (approx.)'],
  [/以来/g, ' onward'],
  [/起/g, ' onward'],
];

const RULES: Array<[RegExp, string | ((...a: string[]) => string)]> = [
  // 完整日期先于裸年份
  [/(\d{3,4})年(\d{1,2})月(\d{1,2})日/g,
    (_m, y, mo, d) => `${MONTHS[Number(mo) - 1]} ${Number(d)}, ${y} CE`],
  [/(\d{3,4})年(\d{1,2})月/g, (_m, y, mo) => `${MONTHS[Number(mo) - 1]} ${y} CE`],
  // 孤立月份：区间后半段，如「1898年6月—9月」的「9月」
  [/(\d{1,2})月/g, (_m, mo) => MONTHS[Number(mo) - 1]],
  // 世纪区间
  [/约前(\d+)—前(\d+)世纪/g, (_m, a, b) => `c. ${ord(a)}–${ord(b)} century BCE`],
  [/前(\d+)—(\d+)世纪/g, (_m, a, b) => `${ord(a)}–${ord(b)} century BCE`],
  [/公元(\d+)—(\d+)世纪/g, (_m, a, b) => `${ord(a)}–${ord(b)} century CE`],
  // 万年 / 年前
  // 「年前后」必须先于「年前」，否则 前400年前后 会被拆成 前400 years ago后
  [/前([\d,]+)年前后/g, '$1 BCE (approx.)'],
  [/公元([\d,]+)年前后/g, '$1 CE (approx.)'],
  [/(\d+)年前后/g, 'around $1 years ago'],
  // 「N万年前」= N×10000 年，必须换算，不能把 300万 当成 300 million
  [/约(\d+)万年前/g, (_m, n) => `c. ${wanAgo(n)}`],
  [/(\d+)万年前/g, (_m, n) => wanAgo(n)],
  [/约(\d+)年前/g, 'c. $1 years ago'],
  [/(\d+)年前/g, '$1 years ago'],
  [/传说时代/g, 'Legendary era'],
  [/公元元年/g, '1 CE'],
  // 单世纪
  [/约前(\d+)世纪/g, (_m, d) => `c. ${ord(d)} century BCE`],
  [/约公元(\d+)世纪/g, (_m, d) => `c. ${ord(d)} century CE`],
  [/前(\d+)世纪/g, (_m, d) => `${ord(d)} century BCE`],
  [/公元(\d+)世纪/g, (_m, d) => `${ord(d)} century CE`],
  [/(\d+)世纪/g, (_m, d) => `${ord(d)} century`],
  // 年
  [/约前([\d,]+)年/g, 'c. $1 BCE'],
  [/约公元([\d,]+)年/g, 'c. $1 CE'],
  [/前([\d,]+)年/g, '$1 BCE'],
  [/公元([\d,]+)年/g, '$1 CE'],
  [/([\d,]+)年代/g, '$1s'],
  [/至今/g, 'present'],
  [/约/g, 'c. '],
  [/古代/g, 'Ancient'],
  // 裸年份（无「公元」前缀），必须排在带前缀规则之后
  [/(\d{3,4})年/g, '$1 CE'],
];

/**
 * 按语言输出年份显示串。中文原样返回；英文按词表转换。
 * 转换后若仍含中文，整体回退中文原文，避免中英混排。
 */
export function localizeYearDisplay(zh: string, lang: I18nLang): string {
  if (lang !== 'en-US' || !zh) return zh;
  if (OVERRIDES[zh]) return OVERRIDES[zh];

  let out = zh;
  for (const [a, b] of PARENS) out = out.split(a).join(b);
  for (const [re, rep] of RULES) {
    out = typeof rep === 'string'
      ? out.replace(re, rep)
      : out.replace(re, rep as (...a: string[]) => string);
  }
  for (const [a, b] of DYNASTIES) out = out.split(a).join(b);
  for (const [re, rep] of VERBS) out = out.replace(re, rep);

  // 动词紧跟在年份后（如 537 CEcompleted），补一个空格
  out = out.replace(/(CE|BCE|century)(?=[A-Za-z])/g, '$1 ');
  out = out
    .replace(/\s*—\s*/g, ' — ')
    .replace(/，/g, '; ')
    .replace(/、/g, ', ')
    .replace(/\s{2,}/g, ' ')
    .replace(/\s+([;,])/g, '$1')
    .trim();

  if (/[\u4e00-\u9fff]/.test(out)) return zh;
  return out;
}

/** 该串在英文态是否会回退中文（用于统计与文档）。 */
export function hasUntranslatedYear(zh: string): boolean {
  return localizeYearDisplay(zh, 'en-US') === zh && /[\u4e00-\u9fff]/.test(zh);
}