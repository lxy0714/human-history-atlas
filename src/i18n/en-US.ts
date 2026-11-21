// EXPORTS: enUS
// English UI translation dictionary
// 组织结构与中文调用路径一致（按功能域分组）
// 缺失时回退到中文原文，不会静默失败

export const enUS = {
  // ===== 通用 =====
  common: {
    fullscreen: 'Fullscreen',
    loading: 'Loading...',
    error: 'Error',
    back: 'Back',
    close: 'Close',
    search: 'Search',
    clear: 'Clear',
    filter: 'Filter',
    all: 'All',
    confirm: 'Confirm',
    cancel: 'Cancel',
    save: 'Save',
    more: 'More',
    copy: 'Copy',
    copied: 'Copied',
    language: 'Language',
    languageZh: '中文',
    languageEn: 'English',
  },

  // ===== 导航 =====
  nav: {
    viewSwitch: 'Switch view',
    timeline: 'Timeline',
    map: 'World Map',
    list: 'Encyclopedia',
    special: 'Special Hall',
    specialHall: 'Special Hall',
    searchPlaceholder: 'Search historical events...',
    randomExplore: 'Random Explore',
    settings: 'Settings',
    menu: 'Menu',
  },

  // ===== 搜索 =====
  search: {
    placeholder: 'Search titles & summaries',
    fulltextPlaceholder: 'Search full text (title + summary + body)',
    fulltextLoading: 'Loading full-text index...',
    fulltextOn: 'Full-text search enabled',
    fulltextToggle: 'Enable full-text search',
    fulltextShort: 'Full',
    resultsFound: '{n} results found',
    noResults: 'No matching results',
    hint: 'Enter keywords to search historical events',
  },

  // ===== 顶栏 =====
  header: {
    tagline: 'Global History Panorama',
    someCiv: 'a civilization',
    someEra: 'an era',
    whyExplore: 'Why this one',
    reason1: 'From {era} {civ} — see what else happened in the same period',
    reason2: 'A key piece in the {civ} narrative',
    reason3: 'Fascinating contemporary parallels with history you know',
    reason4: 'A must-know node in {civ} history',
    reason5: 'See the butterfly effect on this causal chain',
  },

  // ===== 时代 =====
  era: {
    prehistoric: 'Prehistoric',
    ancient: 'Ancient',
    classical: 'Classical',
    medieval: 'Medieval',
    exploration: 'Age of Exploration',
    earlyModern: 'Early Modern',
    industrial: 'Industrial',
    modern: 'Modern',
    contemporary: 'Contemporary',
  },

  // ===== 文明 =====
  civilization: {
    china: 'China',
    europe: 'Europe',
    middleEast: 'Middle East',
    southAsia: 'South Asia',
    eastAsia: 'East Asia',
    america: 'Americas',
    africa: 'Africa',
    global: 'Global',
    centralAsia: 'Central Asia',
    oceania: 'Oceania',
  },

  // ===== 分类 =====
  category: {
    politics: 'Politics',
    military: 'Military',
    science: 'Science & Tech',
    culture: 'Culture',
    myth: 'Mythology',
    artifact: 'Artifact',
    philosophy: 'Philosophy',
    religion: 'Religion',
    economy: 'Economy',
    dailyLife: 'Daily Life',
    city: 'Urban History',
    person: 'Person',
    dynasty: 'Dynasty',
    event: 'Event',
  },

  // ===== 视图 =====
  view: {
    timeline: 'Timeline',
    map: 'World Map',
    list: 'Encyclopedia',
    special: 'Special Hall',
    density: 'Density',
    comfortable: 'Comfortable',
    compact: 'Compact',
    play: 'Play',
    pause: 'Pause',
    speed: 'Speed',
    favorites: 'Favorites',
    about: 'About',
    totalNodes: 'Total nodes',
    filtered: 'filtered',
  },

  // ===== 地图视图 =====
  map: {
    off: 'Off',
    geoMarkers: 'geo markers',
    layerControl: 'Layer control',
    nodeMarkers: 'Historical node markers',
    empireLayer: 'Empire territory layer',
    routeAnim: 'Historical route animation',
    civColors: 'Civilization colour coding',
    territoryMode: 'Territory display mode',
    concurrentYear: 'Concurrent by year',
    peakOverlay: 'Peak overlay',
    eraJump: 'Jump to era',
    civColor: 'Civilization colours',
    kinds: 'kinds',
    capital: 'Capital',
    capitalOf: 'Capital of',
    concurrentEmpires: 'Concurrent empires',
    legend: 'Civilization Legend',
    legendShort: 'Legend',
    routes: 'Routes',
    fullscreen: 'Fullscreen',
    nodesHere: 'historical events here',
    moreNodes: '{n} more',
    clickToList: 'Click to see full list',
    jumpTo: 'Jump to location',
  },

  // ===== 时间轴 =====
  timeline: {
    zoomOut: 'Zoom out',
    zoomIn: 'Zoom in',
    backToTop: 'Back to top',
    important: 'Key',
    dynasty: 'Dynasty',
    eraShort_prehistoric: 'Pre',
    eraShort_ancient: 'Anc',
    eraShort_classical: 'Cla',
    eraShort_medieval: 'Med',
    eraShort_earlyModern: 'Ear',
    eraShort_industrial: 'Ind',
    eraShort_modern: 'Mod',
  },

  // ===== 泳道 =====
  swimlane: {
    title: 'Civilization Swimlanes',
    locateEra: 'Jump to era',
    disputed: 'Disputed',
  },

  // ===== 详情面板 =====
  detail: {
    summary: 'Summary',
    description: 'Overview',
    relatedNodes: 'Related Events',
    tags: 'Tags',
    timeScale: 'Timeline',
    addFavorite: 'Add to Favorites',
    removeFavorite: 'Remove from Favorites',
    disputed: 'Scholarly Dispute',
    important: 'Key Event',
    person: 'Figure',
    myth: 'Myth',
    dynasty: 'Dynasty',
    event: 'Event',
    artifact: 'Artifact',
    prevNode: 'Previous',
    nextNode: 'Next',
    toc: 'Contents',
    close: 'Close details',
    source: 'Source',
    era: 'Era',
    civilization: 'Civilization',
    category: 'Category',
    year: 'Year',
    location: 'Location',
    readMore: 'Read more',
    backToList: 'Back to list',
    noBody: 'No article available',
    bodyLoadFailed: 'Failed to load content',
    bodyLoading: 'Loading article...',
    retry: 'Retry',
    keyPoints: 'Key Takeaways',
    keyPointsCount: 'points',
    scholarlyDispute: 'Scholarly Dispute',
    mythLegend: 'Myth & Legend',
    mythDisclaimer: 'This entry describes mythological content, not historical record. Myths are each civilization\'s imaginative explanations for the origin of the universe, humanity, and natural phenomena.',
    topicTags: 'Topic Tags',
    imageSource: 'Image source: Wikimedia Commons',
    timeLabel: 'Time',
    locationLabel: 'Location / Civilization',
    mastered: 'Mastered',
    read: 'Read',
    markMastered: 'Mark as mastered',
    unmarkMastered: 'Unmark as mastered',
    favorite: 'Favorite',
    unfavorite: 'Unfavorite',
    switchHorizontal: 'Switch to horizontal',
    switchVertical: 'Switch to vertical',
    horizontalRead: 'Horizontal reading',
    verticalRead: 'Vertical reading',
    nodeDetail: 'Node details',
    fallbackTitle: 'English version not yet available',
    fallbackDesc: 'This article is currently only available in Chinese. English translation is in progress — thank you for your patience.',
    disputedTitle: 'Scholarly Dispute',
    mythTitle: 'Myth & Legend',
    // 关联理由
    reasonCause: 'Precursor',
    reasonEffect: 'Consequence',
    reasonParallel: 'Contemporary',
    reasonCulture: 'Cultural heritage',
    reasonPerson: 'Key figure',
    reasonGeographic: 'Geographic link',
    reasonTemporal: 'Timeline thread',
    reasonRelated: 'Related',
    reasonSameEra: 'Same era',
    // 类型标签
    typePerson: 'Person',
    typeDynasty: 'Dynasty',
    typeArtifact: 'Artifact',
    typeMyth: 'Myth',
    typeEvent: 'Event',
    typeImportant: 'Key Event',
  },

  // ===== 专题馆 =====
  special: {
    title: 'SPECIAL HALL',
    subtitle: 'Pick a theme to dive deeper into history',
    back: 'Back to Special Hall',
    atlas: 'Atlas of Empires',
    cities: 'Story of Cities',
    dailyLife: 'Daily Life Through Time',
    comparison: 'Empire Comparison',
    learningPath: 'Learning Paths',
    quiz: 'Quiz & Achievements',
    glossary: 'Glossary',
    loading: 'Loading exhibit...',
    loadingGraph: 'Loading graph...',
    references: 'References & Sources',
    fullNetwork: 'Full Network',
    peopleSubgraph: 'People Subgraph',
    hallTitle: 'SPECIAL COLLECTIONS',
    hallSubtitle: 'SPECIAL HALL',
    hallDesc: 'Pick a topic and dive deeper into one facet of history',
    favoriteCount: 'Favorited',
    favoriteNodes: 'nodes',
    noFavorites: 'No favorites yet — add some from the detail panel',
    referencesNote: 'This app is a popular history work. The following primary sources were consulted during research:',
    ref1: 'A Global History (Stavrianos)',
    ref2: 'Records of the Grand Historian (Sima Qian)',
    ref3: 'Zizhi Tongjian / Comprehensive Mirror (Sima Guang)',
    ref4: 'Cambridge History of China / Cambridge World History',
    ref5: 'Official histories of each civilization',
    ref6: 'Wikipedia (multilingual editions)',
    ref7: 'UNESCO World Heritage List',
    ref8: 'Encyclopedia Britannica',
    ref9: 'Public reports of major archaeological discoveries',
    disclaimer: 'Note: Some dates follow prevailing scholarly consensus; different sources and studies may differ. Node content is introductory; for academic research, please consult professional literature. Corrections and additions are welcome.',
    backToList: 'Back to Special Hall',
  },

  // ===== 放映机 =====
  projector: {
    title: 'History Projector',
    play: 'Play',
    pause: 'Pause',
    reset: 'Reset',
    speed: 'Speed',
    prevEra: 'Previous era',
    nextEra: 'Next era',
    filterCivilization: 'All civilizations',
    narrative: 'Narrative',
    eventStream: 'Timeline',
    mapLocked: 'Map locked during playback',
    endReached: 'End of timeline',
    close: 'Exit Projector',
    filterEra: 'All Eras',
  },

  // ===== 提示 =====
  toast: {
    offlineReady: 'History data cached for offline use',
    copied: 'Copied to clipboard',
    addedToFavorites: 'Added to favorites',
    removedFromFavorites: 'Removed from favorites',
    searchNoResults: 'No results found',
    loadFailed: 'Failed to load',
  },

  // ===== 空态 / 错误 =====
  empty: {
    noFavorites: 'No favorites yet',
    noFavoritesDesc: 'Mark events you love to find them here quickly',
    noResults: 'No matching events',
    noResultsDesc: 'Try adjusting your filters or search terms',
    loading: 'Loading history data...',
    loadError: 'Failed to load history data',
    loadErrorDesc: 'Check your connection and try again',
    retry: 'Retry',
    chunkError: 'Failed to load view',
    chunkErrorDesc: 'A resource failed to load. Refresh to try again.',
    refresh: 'Refresh',
    noNode: 'Node not found',
    noNodeDesc: 'The historical record may have been archived or removed',
    searchTitle: 'Like an unexcavated site',
    searchDesc: 'No matching records. Try other keywords or filters.',
    nodeTitle: 'Time leaves a blank here',
    nodeDesc: 'No nodes under current filters. Try another era or civilization.',
    listTitle: 'Not yet in the annals',
    listDesc: 'No matching encyclopedia entry. Adjust your filters and try again.',
    hallTitle: 'The hall is yet empty',
    hallDesc: 'No content yet. Go discover more interesting exhibits!',
  },

  // ===== 主题 =====
  theme: {
    title: 'Theme',
    museum: 'Museum',
    museumDesc: 'Dark wood showcase (default)',
    ink: 'Ink Night',
    inkDesc: 'Pure black OLED, high contrast gold',
    parchment: 'Parchment',
    parchmentDesc: 'Warm vintage reading',
    xuanzhi: 'Xuan Paper',
    xuanzhiDesc: 'Clean white, long reads',
    bamboo: 'Bamboo',
    bambooDesc: 'Ink-green bamboo slip texture',
  },

  // ===== 快捷键 =====
  shortcuts: {
    title: 'Keyboard Shortcuts',
    subtitle: 'Navigate faster with keys',
    playPause: 'Play / pause',
    reset: 'Reset timeline',
    nextEra: 'Next era',
    prevEra: 'Previous era',
    search: 'Search',
    toggleDetail: 'Toggle details',
    close: 'Close panel',
    escToClose: 'Press Esc to close',
    navigation: 'Navigation',
    view: 'View',
    actions: 'Actions',
    pressKey: 'Press',
    to: 'to',
  },

  // ===== 测验 / 成就 =====
  quiz: {
    title: 'Quiz',
    subtitle: 'Test your historical knowledge',
    start: 'Start Quiz',
    next: 'Next',
    submit: 'Submit',
    correct: 'Correct!',
    wrong: 'Not quite',
    score: 'Score',
    achievements: 'Achievements',
    unlocked: 'Unlocked',
    locked: 'Locked',
    nextQuestion: 'Next question',
    showAnswer: 'Show answer',
    totalQuestions: 'Total questions',
    correctCount: 'Correct answers',
    accuracy: 'Accuracy',
    tryAgain: 'Try again',
    shortAnswer: 'Short answer',
    multipleChoice: 'Multiple choice',
    hint: 'Hint',
    difficulty: {
      easy: 'Easy',
      medium: 'Medium',
      hard: 'Hard',
    },
  },

  // ===== 成就 =====
  achievement: {
    title: 'Achievements',
    subtitle: 'Track your learning journey',
    total: 'Total achievements',
    progress: 'Progress',
  },

  // ===== 学习路径 =====
  learning: {
    title: 'Learning Paths',
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
    progress: 'Progress',
    startPath: 'Start Path',
    continuePath: 'Continue',
    completed: 'Completed',
    subtitle: 'Structured history journeys',
    startLearning: 'Start learning',
    estimatedTime: 'Est. time',
    nodes: 'nodes',
  },

  // ===== 术语表 =====
  glossary: {
    title: 'Glossary',
    subtitle: 'Key terms in world history',
    searchPlaceholder: 'Search terms...',
    noResults: 'No matching terms',
  },

  // ===== 徽章与标签 =====
  // ===== 通用零散 UI =====
  ui: {
    total: 'Total',
    nodes: 'nodes',
    historyNodes: 'historical nodes',
    eras: 'eras',
    andMore: 'And',
    nodesEllipsis: 'more nodes…',
    eraIndex: 'Era index',
    comfortable: 'Comfortable',
    compact: 'Compact',
    expandArrow: 'Expand →',
    legendHint: 'Click a legend entry to show or hide its curve',
    riseFall: 'Civilization rise & fall',
    play: 'Play',
    filters: 'Filters',
    playing: 'Playing',
    artifactBuilding: 'Artifact / Building',
  },

  badge: {
    typePerson: 'Figure',
    typeEvent: 'Event',
    typeWar: 'War',
    typeDynasty: 'Dynasty',
    typeCivilization: 'Civilization',
    typeArtifact: 'Artifact',
    typeBuilding: 'Building',
    typeLandmark: 'Landmark',
    typeMyth: 'Myth',
    typeCulture: 'Culture',
    important: 'Key Event',
    disputed: 'Disputed',
    myth: 'Myth & Legend',
    contemporary: 'Contemporary',
    related: 'Related',
  },

  // ===== 侧边栏 =====
  sidebar: {
    filter: 'Filter',
    civilizations: 'Civilizations',
    categories: 'Categories',
    clearAll: 'Clear all filters',
    expand: 'Expand index',
    collapse: 'Collapse index',
    jumpToEra: 'Jump to era',
    nodesCount: (n: number) => `${n} nodes`,
    expanded: 'expanded',
    collapsed: 'collapsed',
  },

  // ===== 资源加载错误 =====
  chunk: {
    title: 'Failed to load page resources',
    descLine1: 'The app is being updated and some resources are temporarily unavailable. This is normal and usually resolves in a few seconds.',
    descLine2: 'Click the button below to reload and continue browsing.',
    reload: 'Reload',
    footer: 'If retrying multiple times still fails, please try again later or clear your browser cache.',
  },

  // ===== 错误边界 =====
  errorBoundary: {
    title: 'This page of the scroll has been lost',
    desc: 'Something went wrong while loading. Try reloading this section.',
    retry: 'Reload',
    goHome: 'Go home',
  },

  // ===== 启动页 =====
  loading: {
    title: 'Panorama of World History',
    subtitle: 'From human origins to today',
    hint: 'Unfolding the scroll of history...',
  },

  // ===== 文明对比 =====
  compare: {
    title: 'Civilization Comparison',
    quickSelect: 'Quick compare',
    timeRange: 'Time Span',
    capital: 'Capital / Center',
    territory: 'Territory',
    population: 'Population',
    politics: 'Political System',
    economy: 'Economy',
    military: 'Military',
    culture: 'Cultural Achievements',
    technology: 'Technology',
    influence: 'Historical Influence',
    summary: 'Summary',
  },

  // ===== 时间轴控件 =====
  timelineControl: {
    collapse: 'Collapse timeline',
    expand: 'Expand timeline',
    play: 'Play',
    pause: 'Pause',
    zoomIn: 'Zoom in',
    zoomOut: 'Zoom out',
    currentRange: 'Current range',
  },

  // ===== 专题大厅 =====
  specials: {
    title: 'Special Topics',
    subtitle: 'Deep dives into history',
    categories: {
      empire: 'Empires',
      culture: 'Culture',
      figure: 'Figures',
      city: 'Cities',
      technology: 'Technology',
      daily: 'Daily Life',
      quiz: 'Quiz & Achievements',
      tool: 'Tools',
      other: 'More',
    },
    enter: 'Enter',
  },

  // ===== 帝国对比 =====
  empireCompare: {
    title: 'Empire Comparison',
    subtitle: 'Side-by-side across dimensions',
    selectEmpire: 'Select an empire',
    vs: 'vs',
    addToCompare: 'Add to comparison',
    removeFromCompare: 'Remove',
    dimension: 'Dimension',
    left: 'Left',
    right: 'Right',
  },

  // ===== 城市兴衰 =====
  cityRiseFall: {
    title: 'Rise and Fall of Cities',
    subtitle: 'Trajectories of great cities through time',
    peak: 'Peak',
    founder: 'Founder / Origin',
    currentName: 'Today',
  },

  // ===== 日常生活 =====
  dailyLife: {
    title: 'Daily Life Through History',
    subtitle: 'How ordinary people lived in different eras',
    food: 'Food',
    clothing: 'Clothing',
    shelter: 'Housing',
    work: 'Work',
    family: 'Family',
    religion: 'Religion',
  },

  // ===== 专题详情通用 =====
  topicDetail: {
    backToList: 'Back to topics',
    overview: 'Overview',
    timeline: 'Timeline',
    details: 'Details',
    related: 'Related',
    loading: 'Loading...',
    empty: 'No content yet',
  },

  // ===== 收藏 =====
  favorites: {
    title: 'Favorites',
    empty: 'No favorites yet',
    emptyHint: 'Tap the star icon on any node to save it here',
    remove: 'Remove',
  },

  // ===== 今日历史 =====
  todayInHistory: {
    title: 'On This Day',
    subtitle: 'What happened on this day in history',
    noEvents: 'No recorded events for this day',
    events: 'events',
  },

  // ===== 冷知识 =====
  funFacts: {
    title: 'Fun Facts',
    subtitle: 'Surprising tidbits from history',
    nextFact: 'Next',
    previousFact: 'Previous',
  },

  // ===== 时间胶囊 =====
  timeCapsule: {
    title: 'Time Capsule',
    subtitle: 'Bury a message for your future self',
    writeMessage: 'Write a message',
    bury: 'Bury the capsule',
    openDate: 'Open date',
    locked: 'Locked until',
  },

  // ===== 六度分隔 =====
  sixDegrees: {
    title: 'Six Degrees of History',
    subtitle: 'Find connections between any two figures',
    start: 'Start figure',
    end: 'End figure',
    findPath: 'Find connection',
    noPath: 'No connection found',
    degrees: 'degrees of separation',
  },

  // ===== 名人名言 =====
  quotes: {
    title: 'Historical Quotes',
    subtitle: 'Words that shaped the ages',
  },

  // ===== 发明时间轴 =====
  inventions: {
    title: 'Inventions Timeline',
    subtitle: 'Breakthroughs that changed the world',
    category: 'Category',
    inventor: 'Inventor',
    year: 'Year',
  },

  // ===== 武器时间轴 =====
  weapons: {
    title: 'Weapons Through History',
    subtitle: 'From stone axes to gunpowder',
    era: 'Era',
    type: 'Type',
  },

  // ===== 服饰时间轴 =====
  fashion: {
    title: 'Fashion Through History',
    subtitle: 'Styles across civilizations and eras',
    culture: 'Culture',
    period: 'Period',
  },

  // ===== 排行榜 =====
  rankings: {
    title: 'Historical Rankings',
    subtitle: 'Compare by the numbers',
    largestEmpires: 'Largest empires',
    longestReigns: 'Longest reigns',
    deadliestBattles: 'Deadliest battles',
    rank: 'Rank',
    name: 'Name',
    value: 'Value',
  },

  // ===== 文明图集 =====
  atlas: {
    title: 'Civilization Atlas',
    subtitle: 'Visual guide to world civilizations',
    filterBy: 'Filter by',
    region: 'Region',
    era: 'Era',
  },

  // ===== 时代换算器 =====
  eraConverter: {
    title: 'Era Converter',
    subtitle: 'Convert between different calendar systems',
    inputYear: 'Year',
    result: 'Result',
    gregorian: 'Gregorian',
  },

  // ===== 因果链 =====
  causalChains: {
    title: 'Causal Chains',
    subtitle: 'How events ripple through history',
    cause: 'Cause',
    effect: 'Effect',
    chain: 'Chain',
    intermediate: 'Intermediate',
  },

  // ===== 法律史 =====
  legalHistory: {
    title: 'Legal History',
    subtitle: 'From ancient codes to modern law',
    codeName: 'Code',
    year: 'Year',
    region: 'Region',
    keyProvisions: 'Key provisions',
  },

  // ===== 瘟疫史 =====
  plagueHistory: {
    title: 'Plagues & Pandemics',
    subtitle: 'Diseases that reshaped history',
    outbreak: 'Outbreak',
    deathToll: 'Death toll',
    cause: 'Cause',
    impact: 'Impact',
  },

  // ===== 交通史 =====
  commTransport: {
    title: 'Transportation & Communication',
    subtitle: 'How the world got connected',
    land: 'Land',
    sea: 'Sea',
    air: 'Air',
    communication: 'Communication',
  },

  // ===== 物种传播 =====
  speciesSpread: {
    title: 'Species Spread',
    subtitle: 'How plants and animals traveled the world',
    origin: 'Origin',
    spreadTo: 'Spread to',
    timePeriod: 'Period',
  },

  // ===== 人物自我图谱 =====
  personEgo: {
    title: 'Figure Relation Graph',
    subtitle: 'Network around a historical figure',
    searchPlaceholder: 'Search for a figure...',
    noResults: 'Figure not found',
    connections: 'connections',
  },

  // ===== 世系堂 =====
  lineageHall: {
    title: 'Lineage Hall',
    subtitle: 'Dynastic successions and royal trees',
    selectDynasty: 'Select a dynasty',
    founder: 'Founder',
    lastRuler: 'Last ruler',
    duration: 'Duration',
  },

  // ===== 全关系图谱 =====
  fullRelationGraph: {
    title: 'Full Relation Graph',
    subtitle: 'The complete network of historical connections',
    zoom: 'Zoom',
    pan: 'Pan',
    search: 'Search node',
    filter: 'Filter',
  },

  // ===== 关系图谱 =====
  relationGraph: {
    title: 'Relation Graph',
    subtitle: 'Visualize connections',
    legend: 'Legend',
  },

  // ===== 城市记忆 =====
  cityMemory: {
    title: 'City Memory',
    subtitle: 'Stories embedded in urban space',
    selectCity: 'Select a city',
    landmarks: 'Landmarks',
    stories: 'Stories',
  },

  // ===== 文明对比专题 =====
  civilizationCompare: {
    title: 'Civilization Compare',
    subtitle: 'Examine civilizations side by side',
    addPair: 'Add pair',
    reset: 'Reset',
  },

  // ===== 路径详情 =====
  pathDetail: {
    title: 'Path Details',
    subtitle: 'Step-by-step learning journey',
    steps: 'Steps',
    current: 'Current',
  },
};

