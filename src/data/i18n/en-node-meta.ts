// EXPORTS: EN_NODE_META, type EnNodeMeta
// 节点英文元数据（标题 + 摘要）
// 设计原则：
//   - 只存已翻译的节点，未翻译节点不出现（运行时回退中文）
//   - key = 节点 id
//   - 翻译进度：important 节点优先，然后各时代代表节点
//   - 新增翻译：直接在本文件追加记录即可

export interface EnNodeMeta {
  titleEn: string;
  summaryEn: string;
}

// 已翻译节点的英文元数据（按时代分组，方便按进度追加）
// 译法原则：人名地名用通行英文译名，不增删史实信息
export const EN_NODE_META: Record<string, EnNodeMeta> = {
  // ===== 史前时代 =====
  'australopithecus': {
    titleEn: 'Australopithecus Appears',
    summaryEn: 'The dawn of human evolution — the earliest hominids emerged in East Africa.',
  },
  'homo-habilis': {
    titleEn: 'Homo Habilis & the Stone Age Begins',
    summaryEn: 'The first tool-making hominid, marking the start of the Paleolithic era.',
  },
  'homo-erectus': {
    titleEn: 'Homo Erectus & the Control of Fire',
    summaryEn: 'Walked upright, migrated out of Africa, and mastered the use of fire.',
  },
  'homo-sapiens': {
    titleEn: 'Homo Sapiens Emerges',
    summaryEn: 'Anatomically modern humans appeared in Africa and spread across the globe.',
  },
  'neolithic': {
    titleEn: 'Neolithic Revolution',
    summaryEn: 'Transition from hunting-gathering to agriculture and settled communities.',
  },

  // ===== 古代文明 =====
  'sumer': {
    titleEn: 'Sumerian Civilization',
    summaryEn: "The world's earliest urban civilization, with cuneiform writing and city-states.",
  },
  'egypt-unification': {
    titleEn: 'Unification of Egypt',
    summaryEn: 'Upper and Lower Egypt united under Narmer, beginning the pharaonic era.',
  },
  'xia-dynasty': {
    titleEn: 'Xia Dynasty',
    summaryEn: "China's first recorded dynasty, established by Yu the Great.",
  },
  'babylon': {
    titleEn: 'Babylon & Hammurabi',
    summaryEn: 'Hammurabi issued one of the earliest known legal codes.',
  },
  'shang-dynasty': {
    titleEn: 'Shang Dynasty',
    summaryEn: 'Bronze Age civilization with oracle bone script and sophisticated ritual culture.',
  },

  // ===== 古典时代 =====
  'confucius': {
    titleEn: 'Confucius',
    summaryEn: 'Chinese philosopher whose teachings shaped East Asian thought for millennia.',
  },
  'laozi': {
    titleEn: 'Laozi & Daoism',
    summaryEn: 'Founder of Daoism, author of the Tao Te Ching.',
  },
  'athenian-democracy': {
    titleEn: 'Athenian Democracy',
    summaryEn: 'The first direct democracy in the Western world, under Cleisthenes.',
  },
  'qin-unification': {
    titleEn: 'Qin Unification of China',
    summaryEn: 'Qin Shi Huang unified the warring states and established the first imperial dynasty.',
  },
  'rome-founded': {
    titleEn: 'Foundation of Rome',
    summaryEn: 'Traditional founding date of the city of Rome, 753 BCE.',
  },
  'han-dynasty': {
    titleEn: 'Han Dynasty',
    summaryEn: 'Golden age of imperial China, with the Silk Road and Confucian state orthodoxy.',
  },
  'fall-of-rome': {
    titleEn: 'Fall of the Western Roman Empire',
    summaryEn: 'The deposition of Romulus Augustulus marked the end of ancient Rome.',
  },

  // ===== 中世纪 =====
  'tang-dynasty': {
    titleEn: 'Tang Dynasty',
    summaryEn: 'A cosmopolitan golden age of Chinese culture, poetry, and trade.',
  },
  'islamic-golden-age': {
    titleEn: 'Islamic Golden Age',
    summaryEn: 'Flourishing of science, mathematics, and culture across the Islamic world.',
  },
  'mongol-empire': {
    titleEn: 'Mongol Empire',
    summaryEn: 'The largest contiguous land empire in history, founded by Genghis Khan.',
  },
  'song-dynasty': {
    titleEn: 'Song Dynasty',
    summaryEn: 'Economic revolution, printing, and Neo-Confucian philosophy in medieval China.',
  },
  'black-death': {
    titleEn: 'The Black Death',
    summaryEn: 'Pandemic that devastated Europe and Asia, reshaping society and economy.',
  },

  // ===== 大航海与近代 =====
  'columbus': {
    titleEn: 'Columbus Reaches the Americas',
    summaryEn: 'Initiated sustained European contact with the Americas and the Columbian Exchange.',
  },
  'renaissance': {
    titleEn: 'The Renaissance',
    summaryEn: 'Cultural rebirth in Europe, with advances in art, science, and humanism.',
  },
  'ming-zhenghe': {
    titleEn: "Zheng He's Voyages",
    summaryEn: 'Massive Ming dynasty maritime expeditions across the Indian Ocean.',
  },
  'industrial-revolution-britain': {
    titleEn: 'Industrial Revolution Begins',
    summaryEn: 'Steam power and mechanized production transformed Britain and the world.',
  },

  // ===== 工业时代 =====
  'world-war-i': {
    titleEn: 'World War I',
    summaryEn: 'The Great War — a global conflict that reshaped empires and international order.',
  },
  'world-war-ii': {
    titleEn: 'World War II',
    summaryEn: 'The deadliest conflict in human history, spanning six years across the globe.',
  },
  'qing-fall': {
    titleEn: 'Fall of the Qing Dynasty',
    summaryEn: 'The 1911 Revolution ended over 2,000 years of imperial rule in China.',
  },

  // ===== 现代 =====
  'moon-landing': {
    titleEn: 'Moon Landing',
    summaryEn: "Apollo 11 landed on the Moon — humanity's first steps on another world.",
  },
  'personal-computer': {
    titleEn: 'The Personal Computer Revolution',
    summaryEn: 'Microcomputers brought computing power to homes and offices worldwide.',
  },
  'internet': {
    titleEn: 'Rise of the Internet',
    summaryEn: 'Global computer networks transformed communication, commerce, and culture.',
  },
  'cold-war-end': {
    titleEn: 'End of the Cold War',
    summaryEn: 'The dissolution of the Soviet Union ended the decades-long bipolar world order.',
  },
  'homo-neanderthalensis': {
    titleEn: 'Neanderthals',
    summaryEn: 'Archaic humans who inhabited Eurasia until roughly 40,000 years ago, known for stone tools and burial practices.',
  },
  'out-of-africa': {
    titleEn: 'Out of Africa',
    summaryEn: 'The migration of Homo sapiens from Africa that eventually populated every continent on Earth.',
  },
  'cave-paintings-lascaux': {
    titleEn: 'Lascaux Cave Paintings',
    summaryEn: 'Upper Paleolithic cave paintings in France, among the oldest and finest examples of prehistoric art.',
  },
  'agricultural-revolution': {
    titleEn: 'Neolithic Revolution',
    summaryEn: 'The transition from nomadic hunter-gatherer life to settled agriculture, beginning around 10,000 BCE in the Fertile Crescent.',
  },
  'mesopotamia-civilization': {
    titleEn: 'Mesopotamian Civilization',
    summaryEn: 'The earliest urban civilization, between the Tigris and Euphrates rivers, credited with writing, the wheel, and codified law.',
  },
  'akkadian-empire': {
    titleEn: 'Akkadian Empire',
    summaryEn: 'The first known empire in history, founded by Sargon of Akkad in the 24th century BCE.',
  },
  'hammurabi-code': {
    titleEn: 'Code of Hammurabi',
    summaryEn: 'One of the oldest known written legal codes, inscribed on a stele by the Babylonian king Hammurabi.',
  },
  'pyramids-giza': {
    titleEn: 'Pyramids of Giza',
    summaryEn: 'The most iconic monuments of Ancient Egypt, built during the Old Kingdom as royal tombs.',
  },
  'indus-valley-civilization': {
    titleEn: 'Indus Valley Civilization',
    summaryEn: 'A Bronze Age civilization centered on the Indus River, known for planned cities and an undeciphered script.',
  },
  'minoan-civilization': {
    titleEn: 'Minoan Civilization',
    summaryEn: 'A Bronze Age Aegean civilization centered on Crete, famous for the palace at Knossos and vibrant frescoes.',
  },
  'mycenaean-civilization': {
    titleEn: 'Mycenaean Civilization',
    summaryEn: 'The last phase of Bronze Age Greece, centered on palatial states like Mycenae and Tiryns.',
  },
  'zhou-dynasty': {
    titleEn: 'Zhou Dynasty',
    summaryEn: 'The longest-lasting dynasty in Chinese history, laying the cultural and political foundations of later Chinese civilization.',
  },
  'spring-autumn-period': {
    titleEn: 'Spring and Autumn Period',
    summaryEn: 'An era of Chinese history marked by the decline of Zhou authority and the rise of feudal states.',
  },
  'warring-states-period': {
    titleEn: 'Warring States Period',
    summaryEn: 'A period of intense warfare and philosophical ferment in ancient China, ending with Qin unification.',
  },
  'persian-empire': {
    titleEn: 'Achaemenid Persian Empire',
    summaryEn: 'The first world empire, spanning from the Indus to the Mediterranean, known for administrative innovation and the Royal Road.',
  },
  'greco-persian-wars': {
    titleEn: 'Greco-Persian Wars',
    summaryEn: 'A series of conflicts between the Achaemenid Empire and Greek city-states, including the battles of Marathon and Thermopylae.',
  },
  'alexander-the-great': {
    titleEn: 'Alexander the Great',
    summaryEn: 'King of Macedon who conquered the Persian Empire and spread Hellenistic culture from Greece to India.',
  },
  'roman-republic': {
    titleEn: 'Roman Republic',
    summaryEn: 'The period of Roman history when the state was governed by elected officials and the Senate, before the rise of emperors.',
  },
  'punic-wars': {
    titleEn: 'Punic Wars',
    summaryEn: 'A series of three wars between Rome and Carthage that established Roman dominance over the western Mediterranean.',
  },
  'caesar-augustus': {
    titleEn: 'Augustus',
    summaryEn: 'The first Roman emperor, who ended the late Republican civil wars and inaugurated the Pax Romana.',
  },
  'mauryan-empire': {
    titleEn: 'Mauryan Empire',
    summaryEn: 'The first pan-Indian empire, founded by Chandragupta Maurya and reaching its peak under Ashoka.',
  },
  'ashoka': {
    titleEn: 'Emperor Ashoka',
    summaryEn: 'Mauryan emperor who renounced war after the Kalinga campaign and promoted Buddhism across his empire.',
  },
  'gupta-empire': {
    titleEn: 'Gupta Empire',
    summaryEn: 'An Indian golden age known for major advances in mathematics, astronomy, literature, and the arts.',
  },
  'byzantine-empire': {
    titleEn: 'Byzantine Empire',
    summaryEn: 'The eastern continuation of the Roman Empire, centered on Constantinople, lasting until 1453 CE.',
  },
  'rise-of-islam': {
    titleEn: 'Rise of Islam',
    summaryEn: 'The emergence of Islam under the Prophet Muhammad in 7th-century Arabia, rapidly expanding into a major civilization.',
  },
  'charlemagne': {
    titleEn: 'Charlemagne',
    summaryEn: 'King of the Franks and first Holy Roman Emperor, who unified much of western Europe in the early Middle Ages.',
  },
  'viking-age': {
    titleEn: 'Viking Age',
    summaryEn: 'A period of Norse expansion, trade, and settlement across Europe and the North Atlantic from the late 8th to 11th centuries.',
  },
  'crusades': {
    titleEn: 'Crusades',
    summaryEn: 'A series of religious wars waged by Latin Christians to reclaim the Holy Land from Muslim rule.',
  },
  'song-yuan-maritime': {
    titleEn: 'Maritime Trade of Song and Yuan',
    summaryEn: 'The flourishing of long-distance maritime trade during the Song and Yuan dynasties, connecting China to the Indian Ocean world.',
  },
  'ottoman-empire': {
    titleEn: 'Ottoman Empire',
    summaryEn: 'A multi-ethnic empire founded by Turkic tribes that lasted over six centuries and ruled the eastern Mediterranean.',
  },
  'age-of-exploration': {
    titleEn: 'Age of Exploration',
    summaryEn: 'The 15th–17th century era when European seafarers explored new ocean routes, reshaping global trade and knowledge.',
  },
  'scientific-revolution': {
    titleEn: 'Scientific Revolution',
    summaryEn: 'The early modern transformation in mathematics, physics, astronomy, and biology that laid the foundations of modern science.',
  },
  'french-revolution': {
    titleEn: 'French Revolution',
    summaryEn: 'A period of radical political upheaval in France that ended the ancien régime and inspired modern democratic movements.',
  },
  'napoleon': {
    titleEn: 'Napoleon Bonaparte',
    summaryEn: 'French military leader and emperor who conquered much of Europe and promulgated the influential Napoleonic Code.',
  },
  'american-revolution': {
    titleEn: 'American Revolution',
    summaryEn: 'The 1775–1783 conflict in which the Thirteen Colonies won independence from Great Britain.',
  },
  'meiji-restoration': {
    titleEn: 'Meiji Restoration',
    summaryEn: 'The 1868 political revolution that restored imperial rule in Japan and launched rapid modernization and industrialization.',
  },
  'great-depression': {
    titleEn: 'Great Depression',
    summaryEn: 'The longest and most severe worldwide economic depression of the 20th century, beginning with the 1929 stock market crash.',
  },
  'cold-war': {
    titleEn: 'Cold War',
    summaryEn: 'The decades-long geopolitical rivalry between the United States and the Soviet Union following World War II.',
  },
  'human-genome-project': {
    titleEn: 'Human Genome Project',
    summaryEn: 'The international research project that first sequenced the entire human genome, completed in 2003.',
  },

  // ===== 非洲 =====
  'africa-kush-meroe': {
    titleEn: 'Kingdom of Kush and Meroe',
    summaryEn: 'A major ancient Nubian kingdom along the Nile, a rival and occasional conqueror of Egypt.',
  },
  'aksum-empire': {
    titleEn: 'Aksumite Empire',
    summaryEn: 'A powerful trading empire in the Horn of Africa, one of the first African states to adopt Christianity.',
  },
  'africa-ghana-empire': {
    titleEn: 'Ghana Empire',
    summaryEn: 'A wealthy medieval West African empire built on control of the trans-Saharan gold trade.',
  },
  'mali-empire': {
    titleEn: 'Mali Empire',
    summaryEn: 'A great medieval West African empire famous for its wealth, Islamic scholarship, and the pilgrimage of Mansa Musa.',
  },
  'africa-great-zimbabwe': {
    titleEn: 'Great Zimbabwe',
    summaryEn: 'A medieval Shona city with massive stone enclosures, capital of a major southern African trading state.',
  },
  'africa-timbuktu': {
    titleEn: 'Timbuktu',
    summaryEn: 'A fabled center of Islamic scholarship and trans-Saharan trade in the Mali and Songhai empires.',
  },
  'africa-benin-bronze': {
    titleEn: 'Benin Bronzes',
    summaryEn: 'A magnificent collection of brass and bronze sculptures from the Kingdom of Benin in modern Nigeria.',
  },
  'africa-shaka-zulu': {
    titleEn: 'Shaka and the Zulu Kingdom',
    summaryEn: 'The founding of the Zulu kingdom by Shaka kaSenzangakhona, one of the most influential military reformers in southern African history.',
  },
  'africa-scramble': {
    titleEn: 'Scramble for Africa',
    summaryEn: 'The late 19th-century colonization of nearly all of Africa by European powers, formalized at the Berlin Conference of 1884–1885.',
  },
  'africa-independence-year': {
    titleEn: 'Year of Africa — 1960',
    summaryEn: 'The year 1960, when seventeen African nations gained independence, marking the end of the colonial era on the continent.',
  },

  // ===== 美洲与大洋洲 =====
  'america-olmec': {
    titleEn: 'Olmec Civilization',
    summaryEn: 'The earliest major Mesoamerican civilization, famed for its colossal stone heads and long-lasting cultural legacy.',
  },
  'america-teotihuacan': {
    titleEn: 'Teotihuacan',
    summaryEn: 'A vast pre-Columbian metropolis in central Mexico, with the Pyramid of the Sun as its monumental centerpiece.',
  },
  'america-maya-cities': {
    titleEn: 'Classic Maya Cities',
    summaryEn: 'The great city-states of the Classic Maya period, with their writing, mathematics, and astronomy.',
  },
  'america-chichen-itza': {
    titleEn: 'Chichen Itza',
    summaryEn: 'A major Postclassic Maya and Toltec city on the Yucatan Peninsula, a UNESCO World Heritage Site.',
  },
  'america-aztec': {
    titleEn: 'Aztec Empire',
    summaryEn: 'The last great Mesoamerican empire, centered on the island capital Tenochtitlan, until the Spanish conquest.',
  },
  'america-inca-roads': {
    titleEn: 'Inca Road System',
    summaryEn: 'The extraordinary network of royal highways spanning the Andes, engineered for runners, armies, and trade.',
  },
  'america-tiwanaku': {
    titleEn: 'Tiwanaku Empire',
    summaryEn: 'A major Andean civilization centered on Lake Titicaca, predecessor to the Inca Empire.',
  },
  'america-cahokia': {
    titleEn: 'Cahokia',
    summaryEn: 'The largest pre-Columbian city north of Mexico, with enormous earthen mounds along the Mississippi.',
  },
  'america-easter-island': {
    titleEn: 'Easter Island and the Moai',
    summaryEn: 'The remote Polynesian island famous for its giant stone statues (moai) and the mystery of its ecological collapse.',
  },
  'america-austronesian-voyaging': {
    titleEn: 'Austronesian Expansion',
    summaryEn: 'The millennia-long maritime settlement of the Pacific islands by Austronesian-speaking peoples from Southeast Asia.',
  },
  'america-maori-aotearoa': {
    titleEn: 'Māori Settlement of Aotearoa',
    summaryEn: 'The arrival and settlement of Polynesian ancestors of the Māori people in New Zealand, around the 13th century.',
  },
  'america-viking-vinland': {
    titleEn: 'Vikings in Vinland',
    summaryEn: 'The short-lived Norse settlement in North America at L\'Anse aux Meadows, centuries before Columbus.',
  },

  // ===== 近东与地中海 =====
  'ancient-hittite-empire': {
    titleEn: 'Hittite Empire',
    summaryEn: 'A powerful Bronze Age empire of Anatolia, among the first to smelt iron and a rival of New Kingdom Egypt.',
  },
  'ancient-phoenicia': {
    titleEn: 'Phoenician Civilization',
    summaryEn: 'A maritime trading civilization of the Levant, inventors of the alphabet that became the ancestor of nearly all Western scripts.',
  },
  'ancient-israel-kingdom': {
    titleEn: 'Kingdoms of Israel and Judah',
    summaryEn: 'The Iron Age kingdoms of the Hebrews, whose religious and literary heritage became foundational to Judaism and the Western tradition.',
  },
  'ancient-neo-babylon': {
    titleEn: 'Neo-Babylonian Empire',
    summaryEn: 'The Chaldean revival of Babylon, whose king Nebuchadnezzar II built enormous palaces and fortifications.',
  },
  'ancient-sparta': {
    titleEn: 'Sparta',
    summaryEn: 'The militarized Greek city-state whose unique constitution and warrior ethos made it a legend of antiquity.',
  },
  'ancient-alexandria-library': {
    titleEn: 'Library of Alexandria',
    summaryEn: 'The greatest library of the ancient world, a symbol of Hellenistic scholarship in the Egyptian city founded by Alexander.',
  },
  'ancient-etruscan': {
    titleEn: 'Etruscan Civilization',
    summaryEn: 'The pre-Roman civilization of central Italy whose art, religion, and engineering deeply shaped early Rome.',
  },
  'ancient-hellenistic-era': {
    titleEn: 'Hellenistic Era',
    summaryEn: 'The centuries after Alexander the Great, when Greek culture spread from Egypt to Central Asia and scholarship flourished.',
  },

  // ===== 中亚 =====
  'seljuk-empire': {
    titleEn: 'Seljuk Empire',
    summaryEn: 'A medieval Turco-Persian empire that brought Turkish power to the Middle East and defeated Byzantium at Manzikert.',
  },
  'golden-horde': {
    titleEn: 'Golden Horde',
    summaryEn: 'The Mongol khanate of Russia and the western steppe, a major player in medieval Eurasian trade and politics.',
  },
  'ilkhanate': {
    titleEn: 'Ilkhanate',
    summaryEn: 'The Mongol khanate of Persia, which converted to Islam and fostered a brilliant Persian cultural renaissance.',
  },
  'samanid-dynasty': {
    titleEn: 'Samanid Dynasty',
    summaryEn: 'A Persianate dynasty of Central Asia, a golden age of Islamic scholarship and New Persian literature.',
  },
  'hephtalites': {
    titleEn: 'Hephthalite Empire',
    summaryEn: 'A nomadic confederation, often called the "White Huns", that dominated Central Asia in late antiquity.',
  },
  'timurid-renaissance': {
    titleEn: 'Timurid Renaissance',
    summaryEn: 'The cultural flowering of the Timurid Empire in Central Asia, famed for its architecture, poetry, and astronomy.',
  },

  // ===== 南亚 =====
  'maurya-empire': {
    titleEn: 'Maurya Empire',
    summaryEn: 'India\'s first great empire, founded by Chandragupta Maurya and reaching its peak under Ashoka.',
  },
  'mughal-empire': {
    titleEn: 'Mughal Empire',
    summaryEn: 'The Muslim dynasty that ruled most of India for three centuries, building the Taj Mahal and a spectacular Indo-Persian culture.',
  },
  'akbar-religious-synthesis': {
    titleEn: 'Akbar the Great',
    summaryEn: 'The greatest Mughal emperor, known for religious tolerance, administrative reforms, and cultural synthesis.',
  },
  'aurangzeb-decline': {
    titleEn: 'Aurangzeb and Mughal Decline',
    summaryEn: 'The long reign of Aurangzeb, when the Mughal Empire reached its greatest extent but also began to unravel.',
  },

  // ===== 中国（先秦至唐前）=====
  'china-sanxingdui-civilization': {
    titleEn: 'Sanxingdui Civilization',
    summaryEn: 'A spectacular Bronze Age civilization in Sichuan, rediscovered in the 20th century through its gigantic bronze masks.',
  },
  'china-western-zhou-system': {
    titleEn: 'Western Zhou Feudal System',
    summaryEn: 'The political and ritual order of the early Zhou dynasty — the fengjian system and the classics of ritual.',
  },
  'china-spring-autumn-hegemons': {
    titleEn: 'Spring and Autumn Hegemons',
    summaryEn: 'The "Five Hegemons" of the Spring and Autumn period — powerful lords who asserted leadership over the Zhou feudal order.',
  },
  'china-warring-states-reform': {
    titleEn: 'Warring States Reforms',
    summaryEn: 'The wave of Legalist reforms, most famously Shang Yang\'s in Qin, that transformed state power and warfare in ancient China.',
  },
  'china-chu-han-contention': {
    titleEn: 'Chu-Han Contention',
    summaryEn: 'The civil war between Xiang Yu and Liu Bang after the fall of Qin, from which the Han dynasty emerged.',
  },
  'thinker-sunzi': {
    titleEn: 'Sun Tzu',
    summaryEn: 'The ancient Chinese general and author of The Art of War, the most influential treatise on strategy in the world.',
  },
  'thinker-xunzi': {
    titleEn: 'Xunzi',
    summaryEn: 'Confucian thinker who argued that human nature is bad and must be shaped by ritual and education.',
  },

  // ===== 中国（秦汉）=====
  'event-wangmang': {
    titleEn: 'Wang Mang and the Xin Dynasty',
    summaryEn: 'The controversial reformer who briefly seized the Han throne, whose radical policies ended in civil war and his death.',
  },
  'silk-road': {
    titleEn: 'The Silk Road',
    summaryEn: 'The network of trade routes linking China with Central Asia, the Middle East, and the Mediterranean for two millennia.',
  },

  // ===== 中国（魏晋南北朝与隋唐）=====
  'china-fanzhen-liangshui': {
    titleEn: 'Fanzhen Military Governors',
    summaryEn: 'The powerful regional military governors of the late Tang whose autonomy undermined central imperial authority.',
  },
  'china-buddhism-introduction': {
    titleEn: 'Spread of Buddhism in China',
    summaryEn: 'The arrival and flourishing of Buddhism in China, which reshaped Chinese thought, art, and society for centuries.',
  },
  'china-kentoshi-jianzhen': {
    titleEn: 'Japanese Missions to Tang China',
    summaryEn: 'The kentōshi missions that brought Tang culture, writing, and institutions to Japan, and the monk Jianzhen\'s journey east.',
  },

  // ===== 中国（宋辽金元）=====
  'economy-south-shift': {
    titleEn: 'Economic Shift to the South',
    summaryEn: 'The gradual shift of China\'s economic and demographic center from the Yellow River to the Yangtze, completed in Song times.',
  },
  'song-maritime-trade': {
    titleEn: 'Song Maritime Trade',
    summaryEn: 'The flourishing of long-distance maritime trade under the Song dynasty, connecting China to Southeast Asia and beyond.',
  },
  'event-jiaozi': {
    titleEn: 'Jiaozi — First Paper Money',
    summaryEn: 'The world\'s first paper currency, issued in Song dynasty Sichuan, a landmark in the history of money.',
  },
  'event-treaty-of-shanyuan': {
    titleEn: 'Treaty of Chanyuan',
    summaryEn: 'The peace treaty between the Northern Song and Liao dynasties that secured a century of peace on the northern border.',
  },

  // ===== 中国（明清）=====
  'event-jingnan-move-capital': {
    titleEn: 'Jingnan Campaign and the Move to Beijing',
    summaryEn: 'The Yongle Emperor\'s usurpation of the throne and his transfer of the Ming capital from Nanjing to Beijing.',
  },
  'institution-ming-cabinet': {
    titleEn: 'Ming Grand Secretariat',
    summaryEn: 'The cabinet system of the Ming dynasty, which developed after the abolition of the prime ministership to assist the emperor.',
  },
  'person-zhangjuzheng': {
    titleEn: 'Zhang Juzheng',
    summaryEn: 'The powerful Ming Grand Secretary whose sweeping reforms temporarily restored dynastic strength in the late 16th century.',
  },
  'event-tumu-crisis': {
    titleEn: 'Tumu Crisis',
    summaryEn: 'The 1449 battle where the Oirat Mongols captured the Zhengtong Emperor, a turning point in Ming frontier policy.',
  },
  'zheng-he-voyages': {
    titleEn: 'Zheng He\'s Voyages',
    summaryEn: 'The seven great maritime expeditions of the Ming admiral Zheng He, reaching as far as East Africa in the early 15th century.',
  },
};
