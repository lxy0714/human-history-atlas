// 替换 src/pages 和 src/components 中的旧 id 引用
import fs from 'fs';
import path from 'path';

const ID_MAP = {
  'ancient-minoan-civilization': 'minos-civilization',
  'indus-valley': 'indus-valley-civilization',
  'mycenaean': 'mycenaean-civilization',
  'war-trojan': 'trojan-war',
  'person-laozi': 'laozi',
  'person-confucius': 'confucius',
  'idea-renaissance-chinese': 'china-baijia',
  'shang-yang-reform': 'china-shangyang',
  'building-petra': 'landmark-petra',
  'war-changping': 'china-changping',
  'person-xiangyu': 'xiang-yu',
  'building-great-wall': 'landmark-great-wall',
  'war-chu-han': 'china-chu-han',
  'event-xiangyu-liubang-chu-han': 'china-chu-han-contention',
  'rome-constantine': 'person-constantine',
  'china-kaiyuan-shengshi': 'event-kaiyuan',
  'event-an-shi': 'an-shi-rebellion',
  'five-dynasties': 'dynasty-wudaishi',
  'war-crusades': 'crusades',
  'person-yuefei': 'yue-fei',
  'idea-renaissance': 'renaissance',
  'person-wangyangming': 'wang-yangming',
  'person-elizabeth-i': 'elizabeth-i',
  'war-thirty-years': 'thirty-years-war',
  'person-peter-the-great': 'peter-great',
  'thinker-voltaire': 'person-voltaire',
  'thinker-rousseau': 'person-rousseau',
  'idea-enlightenment': 'enlightenment',
  'war-waterloo': 'waterloo',
  'war-opium': 'event-opium-war',
  'us-civil-war-detail': 'war-american-civil',
  'person-sunzhongshan': 'sun-yat-sen',
  'person-roosevelt': 'roosevelt',
  'event-xinhai': 'xinhai-revolution',
  'war-wwi': 'world-war-1',
  'econ-great-depression': 'great-depression',
  'economy-1929-depression': 'great-depression',
  'war-wwii': 'world-war-2',
  'stalingrad-battle': 'war-stalingrad',
  'cuban-missile-crisis-deep': 'cuban-missile-crisis',
};

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function walkDir(dir, ext = ['.ts', '.tsx']) {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkDir(full, ext));
    } else if (ext.some((e) => entry.name.endsWith(e))) {
      results.push(full);
    }
  }
  return results;
}

const dirs = ['src/pages', 'src/components', 'src/hooks', 'src/lib'];
let totalFiles = 0;
let totalReplacements = 0;

for (const dir of dirs) {
  if (!fs.existsSync(dir)) continue;
  const files = walkDir(dir);
  totalFiles += files.length;
  
  for (const filePath of files) {
    // 跳过 ui 组件目录（shadcn 基础组件）
    if (filePath.includes('/ui/') && filePath.includes('components')) continue;
    
    let content = fs.readFileSync(filePath, 'utf-8');
    let fileCount = 0;
    
    for (const [oldId, newId] of Object.entries(ID_MAP)) {
      const re = new RegExp(`(['"])${escapeRe(oldId)}\\1`, 'g');
      if (re.test(content)) {
        const matches = content.match(re);
        content = content.replace(re, `$1${newId}$1`);
        fileCount += matches?.length || 0;
      }
    }
    
    if (fileCount > 0) {
      fs.writeFileSync(filePath, content);
      console.log(`  ${filePath}: ${fileCount} 处`);
      totalReplacements += fileCount;
    }
  }
}

console.log(`\n扫描文件: ${totalFiles}, 替换: ${totalReplacements} 处`);
