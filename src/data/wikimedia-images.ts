// EXPORTS: WIKIMEDIA_IMAGES
// 重点节点的真实配图（Wikimedia Commons 公共领域/CC 图片）
// 使用 upload.wikimedia.org 稳定缩略图 URL，宽度 800px
// key 必须与 history.ts 中 HISTORY_NODES 的 id 严格一致

export const WIKIMEDIA_IMAGES: Record<string, string> = {
  // ========== 建筑（匹配到具体节点的） ==========
  // 长城 → 秦朝
  'qin-unification':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/The_Great_Wall_of_China_at_Jinshanling-edit.jpg/800px-The_Great_Wall_of_China_at_Jinshanling-edit.jpg',
  // 泰姬陵 → 莫卧儿帝国
  'mughal-empire':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Taj_Mahal_%28Edited%29.jpeg/800px-Taj_Mahal_%28Edited%29.jpeg',
  // 马丘比丘 → 印加帝国
  'inca-empire':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Machu_Picchu%2C_Peru.jpg/800px-Machu_Picchu%2C_Peru.jpg',
  // 圣索菲亚 → 拜占庭帝国
  'byzantine-empire':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Hagia_Sophia_Mars_2013.jpg/800px-Hagia_Sophia_Mars_2013.jpg',
  // 罗马斗兽场 → 罗马帝国
  'roman-empire':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Colosseo_2020.jpg/800px-Colosseo_2020.jpg',
  // 帕特农神庙 → 雅典民主
  'athenian-democracy':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/The_Parthenon_in_Athens.jpg/800px-The_Parthenon_in_Athens.jpg',
  // 吉萨金字塔 → 古王国时期
  'egypt-old-kingdom':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Kheops-Pyramid.jpg/800px-Kheops-Pyramid.jpg',
  // 巨石阵 → 新石器时代
  'neolithic-revolution':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Stonehenge2007_07_30.jpg/800px-Stonehenge2007_07_30.jpg',
  // 吴哥窟 → 高棉帝国
  'khmer-empire':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Angkor_Wat_reflets.jpg/800px-Angkor_Wat_reflets.jpg',

  // ========== 文物 ==========
  // 后母戊鼎 → 商朝
  'dynasty-shang':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/HouMuWuDingFullView.jpg/800px-HouMuWuDingFullView.jpg',
  // 兵马俑 → 秦始皇
  'person-qinshihuang':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Terracotta_Army_Pit_1.JPG/800px-Terracotta_Army_Pit_1.JPG',
  // 蒙娜丽莎 → 达·芬奇
  'da-vinci':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/800px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg',
  // 图坦卡蒙面具 → 新王国时期
  'egypt-new-kingdom':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Tutankhamun_mask.jpg/800px-Tutankhamun_mask.jpg',
  // 曾侯乙编钟 → 战国
  'dynasty-warring-states':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Bianzhong.jpg/800px-Bianzhong.jpg',
  // 马踏飞燕 → 东汉
  'eastern-han':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Gansu_Museum_May_2007_267.jpg/800px-Gansu_Museum_May_2007_267.jpg',
  // 清明上河图 → 宋朝
  'song-dynasty':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Along_the_River_During_the_Qingming_Festival_%28detail_of_original%29.jpg/800px-Along_the_River_During_the_Qingming_Festival_%28detail_of_original%29.jpg',
  // 罗塞塔石碑 → 托勒密王朝
  'ptolemaic-egypt':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Rosetta_Stone.JPG/800px-Rosetta_Stone.JPG',

  // ========== 人物 ==========
  // 孔子
  'confucius':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Confucius%2C_gravure_chinoise_%28cropped%29.jpg/800px-Confucius%2C_gravure_chinoise_%28cropped%29.jpg',
  // 凯撒
  'person-julius-caesar':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Retrato_de_Julio_C%C3%A9sar_%2826724093101%29_%28cropped%29.jpg/800px-Retrato_de_Julio_C%C3%A9sar_%2826724093101%29_%28cropped%29.jpg',
  // 拿破仑
  'napoleon':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Jacques-Louis_David_-_The_Emperor_Napoleon_in_His_Study_at_the_Tuileries_-_Google_Art_Project.jpg/800px-Jacques-Louis_David_-_The_Emperor_Napoleon_in_His_Study_at_the_Tuileries_-_Google_Art_Project.jpg',
  // 林肯
  'lincoln':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Abraham_Lincoln_O-77_matte_collodion_print.jpg/800px-Abraham_Lincoln_O-77_matte_collodion_print.jpg',
  // 牛顿
  'newton':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/GodfreyKneller-IsaacNewton-1689.jpg/800px-GodfreyKneller-IsaacNewton-1689.jpg',
  // 莎士比亚
  'shakespeare':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Shakespeare.jpg/800px-Shakespeare.jpg',
  // 伊丽莎白一世
  'elizabeth-i':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Elizabeth_I_of_England_-_The_Ditchley_Portrait_by_Marcus_Gheeraerts_the_Younger.jpg/800px-Elizabeth_I_of_England_-_The_Ditchley_Portrait_by_Marcus_Gheeraerts_the_Younger.jpg',
  // 成吉思汗
  'person-chengjisihan':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/YuanEmperorAlbumGenghis.jpg/800px-YuanEmperorAlbumGenghis.jpg',
  // 康熙
  'person-kangxi':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Kangxi.jpeg/800px-Kangxi.jpeg',
  // 华盛顿 → 美国独立
  'american-independence':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/Gilbert_Stuart_Williamstown_Portrait_of_George_Washington.jpg/800px-Gilbert_Stuart_Williamstown_Portrait_of_George_Washington.jpg',
};
