import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { Home, BookOpen, Compass, User, MapPin, Calendar, Bell, ChevronRight, ChevronLeft, Search, Info, Plus, Camera, Upload, Trash2, Check, X, Moon, Cloud, Globe, Download, Share2, Printer, FileText, Image as ImageIcon } from 'lucide-react';

// ============== COLOR PALETTE ==============
const palette = {
  washi: '#F5EFE3',
  washiDark: '#EBE2CD',
  washiDeep: '#DCCFB2',
  sumi: '#1A1410',
  sumiSoft: '#3A2F26',
  shu: '#A53A2A',
  shuDark: '#7A2A1F',
  kin: '#B89668',
  ai: '#2C3E5A',
  matcha: '#6B7F4D',
};

// ============== DATA ==============
const REGIONS = [
  { id: 'all', jp: '全部', romaji: 'All' },
  { id: '北海道', jp: '北海道', romaji: 'Hokkaido' },
  { id: '東北', jp: '東北', romaji: 'Tohoku' },
  { id: '關東', jp: '關東', romaji: 'Kanto' },
  { id: '中部', jp: '中部', romaji: 'Chubu' },
  { id: '關西', jp: '關西', romaji: 'Kansai' },
  { id: '中國', jp: '中國', romaji: 'Chugoku' },
  { id: '四國', jp: '四國', romaji: 'Shikoku' },
  { id: '九州', jp: '九州', romaji: 'Kyushu' },
  { id: '沖繩', jp: '沖繩', romaji: 'Okinawa' },
];

const CATEGORIES = [
  { id: 'all', jp: '全部', mark: '全', desc: 'All', longDesc: '' },
  { id: '神宮', jp: '神宮', mark: '宮', desc: 'Imperial Shrine', color: '#A53A2A',
    longDesc: '社格最高的神社，多供奉皇室祖先神或歷代天皇。「神宮」一詞最初專指伊勢神宮，後來成為祭祀皇族神靈神社的統稱。' },
  { id: '大社', jp: '大社', mark: '大', desc: 'Grand Shrine', color: '#A53A2A',
    longDesc: '規模宏大、歷史悠久的主要神社，多為各神道流派的總本社。在律令制下與「神宮」同屬最高社格，地位崇高。' },
  { id: '神社', jp: '神社', mark: '社', desc: 'Shrine', color: '#A53A2A',
    longDesc: '一般的神社，遍布日本全國，供奉各種神祇，是地方信仰的中心。從山林到街角，神社是日本人日常祈願與祭典的所在。' },
  { id: '寺', jp: '寺', mark: '寺', desc: 'Temple', color: '#1A1410',
    longDesc: '佛教寺院的通稱，由僧侶住持。日本寺院多屬天台宗、真言宗、淨土宗、禪宗、日蓮宗等宗派，承載千年佛教文化。' },
  { id: '院', jp: '院', mark: '院', desc: 'Sub-temple', color: '#1A1410',
    longDesc: '通常指寺院內的塔頭（附屬小院）或獨立成寺的院落。「院」原為皇族出家居所，後成為高僧居處或大寺中的小寺。' },
];

const PLACES = [
  // 神宮
  { id: 'p1', name: '伊勢神宮', reading: 'いせじんぐう', category: '神宮', region: '關西', pref: '三重縣', kanji: '神', desc: '日本神社的最高位，供奉皇祖神天照大御神。內宮（皇大神宮）與外宮（豐受大神宮）合稱「兩宮」。', founded: '紀元前4年（傳）' },
  { id: 'p2', name: '明治神宮', reading: 'めいじじんぐう', category: '神宮', region: '關東', pref: '東京都', kanji: '明', desc: '供奉明治天皇與昭憲皇太后。每年初詣參拜人數全日本第一，森林由全國捐贈樹木造成。', founded: '1920 年' },
  { id: 'p3', name: '熱田神宮', reading: 'あつたじんぐう', category: '神宮', region: '中部', pref: '愛知縣', kanji: '熱', desc: '供奉三神器之一的「草薙神劍」，是名古屋的代表神社，社格僅次於伊勢神宮。', founded: '113 年（傳）' },
  { id: 'p4', name: '橿原神宮', reading: 'かしはらじんぐう', category: '神宮', region: '關西', pref: '奈良縣', kanji: '橿', desc: '建於初代神武天皇即位之地，供奉神武天皇與媛蹈韛五十鈴媛皇后。', founded: '1890 年' },
  { id: 'p5', name: '平安神宮', reading: 'へいあんじんぐう', category: '神宮', region: '關西', pref: '京都府', kanji: '平', desc: '為紀念遷都平安京 1100 年而建，朱紅大鳥居壯觀，神苑四季景色迷人。', founded: '1895 年' },
  { id: 'p6', name: '鹿島神宮', reading: 'かしまじんぐう', category: '神宮', region: '關東', pref: '茨城縣', kanji: '鹿', desc: '東國最古老的神社之一，供奉武神武甕槌大神，與香取神宮並稱東國二宮。', founded: '紀元前 660 年（傳）' },
  { id: 'p7', name: '香取神宮', reading: 'かとりじんぐう', category: '神宮', region: '關東', pref: '千葉縣', kanji: '香', desc: '下總國一宮，供奉經津主大神，與鹿島神宮一同守護東國。', founded: '紀元前 643 年（傳）' },
  { id: 'p8', name: '北海道神宮', reading: 'ほっかいどうじんぐう', category: '神宮', region: '北海道', pref: '北海道', kanji: '北', desc: '北海道開拓的精神支柱，供奉開拓三神與明治天皇，札幌市民春日賞櫻名所。', founded: '1869 年' },
  { id: 'p9', name: '宇佐神宮', reading: 'うさじんぐう', category: '神宮', region: '九州', pref: '大分縣', kanji: '宇', desc: '全國八幡宮的總本宮，供奉應神天皇等三柱，自古為皇室所重。', founded: '725 年' },
  { id: 'p10', name: '霧島神宮', reading: 'きりしまじんぐう', category: '神宮', region: '九州', pref: '鹿兒島縣', kanji: '霧', desc: '供奉天孫降臨神話的瓊瓊杵尊，朱紅社殿坐落於霧島連山中，氣勢壯麗。', founded: '6 世紀（傳）' },

  // 大社
  { id: 'p11', name: '出雲大社', reading: 'いずもおおやしろ', category: '大社', region: '中國', pref: '島根縣', kanji: '出', desc: '日本最古老的神社之一，供奉大國主大神。以結緣聞名，巨大注連繩為其象徵。', founded: '神話時代' },
  { id: 'p12', name: '伏見稻荷大社', reading: 'ふしみいなりたいしゃ', category: '大社', region: '關西', pref: '京都府', kanji: '稻', desc: '全國稻荷神社的總本宮，著名的千本鳥居蜿蜒延伸至稻荷山頂。', founded: '711 年' },
  { id: 'p13', name: '春日大社', reading: 'かすがたいしゃ', category: '大社', region: '關西', pref: '奈良縣', kanji: '春', desc: '藤原氏的氏神，朱紅社殿與三千座石燈籠構成奈良經典印象。', founded: '768 年' },
  { id: 'p14', name: '諏訪大社', reading: 'すわたいしゃ', category: '大社', region: '中部', pref: '長野縣', kanji: '諏', desc: '全國諏訪神社總本社，由上社本宮、前宮與下社春宮、秋宮共四社組成。', founded: '神話時代' },
  { id: 'p15', name: '住吉大社', reading: 'すみよしたいしゃ', category: '大社', region: '關西', pref: '大阪府', kanji: '住', desc: '全國住吉神社的總本社，獨特的住吉造建築為國寶。', founded: '211 年' },
  { id: 'p16', name: '熊野本宮大社', reading: 'くまのほんぐうたいしゃ', category: '大社', region: '關西', pref: '和歌山縣', kanji: '熊', desc: '熊野三山之首，世界遺產熊野古道的中心。', founded: '崇神天皇時代' },
  { id: 'p17', name: '富士山本宮淺間大社', reading: 'ふじさんほんぐうせんげんたいしゃ', category: '大社', region: '中部', pref: '靜岡縣', kanji: '淺', desc: '全國淺間神社的總本宮，富士山信仰的核心，山頂奧宮為富士山本身。', founded: '紀元前 27 年（傳）' },
  { id: 'p18', name: '宗像大社', reading: 'むなかたたいしゃ', category: '大社', region: '九州', pref: '福岡縣', kanji: '宗', desc: '世界遺產，由邊津宮、中津宮、沖津宮三宮組成，海之守護神。', founded: '神話時代' },
  { id: 'p19', name: '三嶋大社', reading: 'みしまたいしゃ', category: '大社', region: '中部', pref: '靜岡縣', kanji: '嶋', desc: '伊豆國一之宮，源賴朝舉兵時祈願之所，至今仍為武運之社。', founded: '8 世紀以前' },
  { id: 'p20', name: '多賀大社', reading: 'たがたいしゃ', category: '大社', region: '關西', pref: '滋賀縣', kanji: '多', desc: '供奉伊邪那岐、伊邪那美兩神，自古為延命長壽之神。', founded: '神話時代' },

  // 神社
  { id: 'p21', name: '嚴島神社', reading: 'いつくしまじんじゃ', category: '神社', region: '中國', pref: '廣島縣', kanji: '嚴', desc: '世界遺產，海上大鳥居聞名於世。供奉宗像三女神。', founded: '593 年' },
  { id: 'p22', name: '八坂神社', reading: 'やさかじんじゃ', category: '神社', region: '關西', pref: '京都府', kanji: '坂', desc: '京都祇園的中心，祇園祭主辦神社，供奉素戔嗚尊。', founded: '656 年' },
  { id: 'p23', name: '北野天滿宮', reading: 'きたのてんまんぐう', category: '神社', region: '關西', pref: '京都府', kanji: '滿', desc: '全國天滿宮的總本社之一，供奉學問之神菅原道真。', founded: '947 年' },
  { id: 'p24', name: '太宰府天滿宮', reading: 'だざいふてんまんぐう', category: '神社', region: '九州', pref: '福岡縣', kanji: '宰', desc: '與北野天滿宮並稱全國天滿宮總本社，學問與合格祈願聖地。', founded: '905 年' },
  { id: 'p25', name: '日光東照宮', reading: 'にっこうとうしょうぐう', category: '神社', region: '關東', pref: '栃木縣', kanji: '日', desc: '世界遺產，供奉德川家康。陽明門等華麗建築為江戶藝術巔峰。', founded: '1617 年' },
  { id: 'p26', name: '鶴岡八幡宮', reading: 'つるがおかはちまんぐう', category: '神社', region: '關東', pref: '神奈川縣', kanji: '鶴', desc: '鎌倉象徵，源賴朝建立的武家守護神。', founded: '1063 年' },
  { id: 'p27', name: '上賀茂神社', reading: 'かみがもじんじゃ', category: '神社', region: '關西', pref: '京都府', kanji: '賀', desc: '世界遺產，京都最古老的神社之一，正式名賀茂別雷神社。', founded: '678 年' },
  { id: 'p28', name: '下鴨神社', reading: 'しもがもじんじゃ', category: '神社', region: '關西', pref: '京都府', kanji: '鴨', desc: '世界遺產，與上賀茂神社並稱賀茂兩社。糺之森原始森林聞名。', founded: '紀元前 2 世紀（傳）' },
  { id: 'p29', name: '大神神社', reading: 'おおみわじんじゃ', category: '神社', region: '關西', pref: '奈良縣', kanji: '大', desc: '日本最古老的神社之一，三輪山本身即為神體，無本殿。', founded: '神話時代' },
  { id: 'p30', name: '神田神社', reading: 'かんだみょうじん', category: '神社', region: '關東', pref: '東京都', kanji: '田', desc: '東京總鎮守，神田祭為江戶三大祭之一。', founded: '730 年' },
  { id: 'p31', name: '靖國神社', reading: 'やすくにじんじゃ', category: '神社', region: '關東', pref: '東京都', kanji: '靖', desc: '供奉自幕末以來為國捐軀者，東京千鳥淵賞櫻名所。', founded: '1869 年' },
  { id: 'p32', name: '氷川神社', reading: 'ひかわじんじゃ', category: '神社', region: '關東', pref: '埼玉縣', kanji: '氷', desc: '武藏國一之宮，關東地區氷川神社的總本社。', founded: '紀元前 5 世紀（傳）' },

  // 寺
  { id: 'p33', name: '清水寺', reading: 'きよみずでら', category: '寺', region: '關西', pref: '京都府', kanji: '清', desc: '世界遺產，「清水的舞台」聞名於世。供奉十一面千手觀音。', founded: '778 年' },
  { id: 'p34', name: '金閣寺', reading: 'きんかくじ', category: '寺', region: '關西', pref: '京都府', kanji: '金', desc: '正式名鹿苑寺。三層舍利殿覆以金箔，倒映於鏡湖池。', founded: '1397 年' },
  { id: 'p35', name: '銀閣寺', reading: 'ぎんかくじ', category: '寺', region: '關西', pref: '京都府', kanji: '銀', desc: '正式名慈照寺。足利義政所建，東山文化代表。', founded: '1482 年' },
  { id: 'p36', name: '龍安寺', reading: 'りょうあんじ', category: '寺', region: '關西', pref: '京都府', kanji: '龍', desc: '世界遺產，著名石庭十五石枯山水，禪意深遠。', founded: '1450 年' },
  { id: 'p37', name: '東大寺', reading: 'とうだいじ', category: '寺', region: '關西', pref: '奈良縣', kanji: '東', desc: '世界遺產，大佛殿為世界最大木造建築。盧舍那大佛莊嚴宏偉。', founded: '728 年' },
  { id: 'p38', name: '法隆寺', reading: 'ほうりゅうじ', category: '寺', region: '關西', pref: '奈良縣', kanji: '法', desc: '世界最古老的木造建築群，世界遺產。聖德太子建。', founded: '607 年' },
  { id: 'p39', name: '興福寺', reading: 'こうふくじ', category: '寺', region: '關西', pref: '奈良縣', kanji: '興', desc: '藤原氏氏寺，五重塔為奈良象徵之一。', founded: '710 年' },
  { id: 'p40', name: '淺草寺', reading: 'せんそうじ', category: '寺', region: '關東', pref: '東京都', kanji: '淺', desc: '東京最古老的寺院，雷門大紅燈籠為東京象徵。', founded: '628 年' },
  { id: 'p41', name: '中尊寺', reading: 'ちゅうそんじ', category: '寺', region: '東北', pref: '岩手縣', kanji: '中', desc: '世界遺產，金色堂為平安時代藝術精華。', founded: '850 年' },
  { id: 'p42', name: '善光寺', reading: 'ぜんこうじ', category: '寺', region: '中部', pref: '長野縣', kanji: '善', desc: '無宗派寺院，自古有「一生に一度は善光寺参り」之言。', founded: '644 年' },
  { id: 'p43', name: '永平寺', reading: 'えいへいじ', category: '寺', region: '中部', pref: '福井縣', kanji: '永', desc: '曹洞宗大本山，道元禪師創建。深山古剎修行道場。', founded: '1244 年' },
  { id: 'p44', name: '延曆寺', reading: 'えんりゃくじ', category: '寺', region: '關西', pref: '滋賀縣', kanji: '延', desc: '世界遺產，比叡山天台宗總本山。「日本佛教之母山」。', founded: '788 年' },
  { id: 'p45', name: '東寺', reading: 'とうじ', category: '寺', region: '關西', pref: '京都府', kanji: '寺', desc: '世界遺產，正式名教王護國寺。五重塔為京都象徵。', founded: '796 年' },
  { id: 'p46', name: '醍醐寺', reading: 'だいごじ', category: '寺', region: '關西', pref: '京都府', kanji: '醍', desc: '世界遺產，秀吉「醍醐花見」聞名，櫻花名所。', founded: '874 年' },

  // 院
  { id: 'p47', name: '平等院', reading: 'びょうどういん', category: '院', region: '關西', pref: '京都府', kanji: '平', desc: '世界遺產，鳳凰堂為十円硬幣圖案。淨土庭園的代表。', founded: '1052 年' },
  { id: 'p48', name: '知恩院', reading: 'ちおんいん', category: '院', region: '關西', pref: '京都府', kanji: '知', desc: '淨土宗總本山，三門為日本最大木造門。', founded: '1234 年' },
  { id: 'p49', name: '三千院', reading: 'さんぜんいん', category: '院', region: '關西', pref: '京都府', kanji: '三', desc: '位於大原山中，苔庭與往生極樂院聞名。', founded: '8 世紀末' },
  { id: 'p50', name: '醍醐寺三寶院', reading: 'だいごじさんぼういん', category: '院', region: '關西', pref: '京都府', kanji: '寶', desc: '世界遺產，秀吉設計的庭園聞名。', founded: '1115 年' },
  { id: 'p51', name: '高台寺圓德院', reading: 'こうだいじえんとくいん', category: '院', region: '關西', pref: '京都府', kanji: '圓', desc: '北政所寧寧晚年居所，書院與庭園優雅。', founded: '1605 年' },
  { id: 'p52', name: '大徳寺大仙院', reading: 'だいとくじだいせんいん', category: '院', region: '關西', pref: '京都府', kanji: '仙', desc: '大徳寺塔頭，以室町時代枯山水庭園聞名。', founded: '1509 年' },
];

// ============== UTILITY COMPONENTS ==============

const InkStamp = ({ kanji, color = palette.shu, size = 56 }) => {
  const fid = `grain-${kanji}-${size}`;
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 100 100" className="absolute inset-0">
        <defs>
          <filter id={fid}>
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" />
            <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.4 0" />
            <feComposite in2="SourceGraphic" operator="in" />
          </filter>
        </defs>
        <circle cx="50" cy="50" r="44" fill={color} opacity="0.92" />
        <circle cx="50" cy="50" r="44" fill={color} filter={`url(#${fid})`} />
        <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,240,225,0.35)" strokeWidth="0.8" />
      </svg>
      <span className="relative z-10 text-white" style={{
        fontFamily: '"Shippori Mincho", serif',
        fontSize: size * 0.5,
        fontWeight: 800,
        letterSpacing: '-0.05em',
        textShadow: '0 1px 2px rgba(0,0,0,0.2)'
      }}>{kanji}</span>
    </div>
  );
};

const SeigaihaBG = ({ opacity = 0.06, color = palette.ai }) => {
  const id = `sei-${Math.random().toString(36).slice(2, 9)}`;
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity }}>
      <defs>
        <pattern id={id} x="0" y="0" width="40" height="20" patternUnits="userSpaceOnUse">
          <g fill="none" stroke={color} strokeWidth="0.6">
            <path d="M0 20 A20 20 0 0 1 40 20" />
            <path d="M-20 20 A20 20 0 0 1 20 20" />
            <path d="M20 20 A20 20 0 0 1 60 20" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
};

// ============== MAIN APP ==============

export default function GoshuinApp() {
  const [activeTab, setActiveTab] = useState('home');
  const [profileView, setProfileView] = useState('main');
  const [settingsToggles, setSettingsToggles] = useState({ darkMode: false, notifications: true, autoBackup: false });
  const [confirmingClear, setConfirmingClear] = useState(false);
  const [storageLoaded, setStorageLoaded] = useState(false);

  const [filterMode, setFilterMode] = useState('region');
  const [activeRegion, setActiveRegion] = useState('all');
  const [activeCategory, setActiveCategory] = useState('all');
  const [discoverCategory, setDiscoverCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selected, setSelected] = useState(null); // { type: 'entry' | 'place', data }
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCategoryInfo, setShowCategoryInfo] = useState(null);
  const [addStep, setAddStep] = useState(1);
  const [addMode, setAddMode] = useState(null); // 'list' | 'custom'
  const [draft, setDraft] = useState({ placeId: null, customPlace: null, photo: null, date: '', notes: '' });
  const fileInputRef = useRef(null);

  // User collection — empty by default
  const [collection, setCollection] = useState([]);

  // ===== localStorage: load on mount =====
  useEffect(() => {
    try {
      const stored = localStorage.getItem('goshuin_collection');
      if (stored) setCollection(JSON.parse(stored));
    } catch (e) {
      console.warn('Failed to load collection from localStorage', e);
    }
    setStorageLoaded(true);
  }, []);

  // ===== localStorage: save on change =====
  useEffect(() => {
    if (!storageLoaded) return;
    try {
      localStorage.setItem('goshuin_collection', JSON.stringify(collection));
    } catch (e) {
      // QuotaExceededError — try saving without photos as fallback
      try {
        const stripped = collection.map(c => ({ ...c, photo: null }));
        localStorage.setItem('goshuin_collection', JSON.stringify(stripped));
        console.warn('Storage quota exceeded — saved without photos');
      } catch (e2) {
        console.error('Failed to save collection', e2);
      }
    }
  }, [collection, storageLoaded]);

  // Get place by id (from PLACES or custom)
  const getPlace = (placeId, customPlace) => {
    if (customPlace) return customPlace;
    return PLACES.find(p => p.id === placeId);
  };

  // Combine entries with place data
  const enrichedCollection = collection.map(entry => ({
    ...entry,
    place: getPlace(entry.placeId, entry.customPlace)
  })).filter(e => e.place);

  // Filter logic
  const filteredCollection = enrichedCollection.filter(e => {
    if (filterMode === 'region' && activeRegion !== 'all') return e.place.region === activeRegion;
    if (filterMode === 'category' && activeCategory !== 'all') return e.place.category === activeCategory;
    return true;
  });

  // Discover filtered
  const discoverPlaces = PLACES.filter(p => {
    if (discoverCategory !== 'all' && p.category !== discoverCategory) return false;
    if (searchQuery && !p.name.includes(searchQuery) && !p.reading.includes(searchQuery)) return false;
    return true;
  });

  // Stats
  const totalCount = collection.length;
  const uniquePlaces = new Set(collection.map(e => e.placeId || (e.customPlace?.name))).size;
  const visitedRegions = new Set(enrichedCollection.map(e => e.place.region)).size;
  const categoryCounts = CATEGORIES.slice(1).map(c => ({
    ...c,
    count: enrichedCollection.filter(e => e.place.category === c.id).length
  }));
  const regionCounts = REGIONS.slice(1).map(r => ({
    ...r,
    count: enrichedCollection.filter(e => e.place.region === r.id).length
  }));

  // ==== Photo upload with auto-compression ====
  // Compresses to max 1200px on long side, JPEG quality 0.82
  // Reduces typical photo from 3-5MB to 200-500KB
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        const MAX_DIM = 1200;
        let { width, height } = img;
        if (width > MAX_DIM || height > MAX_DIM) {
          const ratio = Math.min(MAX_DIM / width, MAX_DIM / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const compressed = canvas.toDataURL('image/jpeg', 0.82);
        setDraft(d => ({ ...d, photo: compressed }));
      };
      img.onerror = () => {
        // Fallback: use original
        setDraft(d => ({ ...d, photo: ev.target.result }));
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  };

  // ==== Save new entry ====
  const handleSave = () => {
    if (!draft.placeId && !draft.customPlace) return;
    const today = new Date();
    const dateStr = draft.date || `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;
    const newEntry = {
      id: `u${Date.now()}`,
      placeId: draft.placeId,
      customPlace: draft.customPlace,
      photo: draft.photo,
      date: dateStr,
      notes: draft.notes,
    };
    setCollection([newEntry, ...collection]);
    closeAddModal();
  };

  const closeAddModal = () => {
    setShowAddModal(false);
    setAddStep(1);
    setAddMode(null);
    setDraft({ placeId: null, customPlace: null, photo: null, date: '', notes: '' });
  };

  const handleDeleteEntry = (id) => {
    setCollection(collection.filter(e => e.id !== id));
    setSelected(null);
  };

  // ============== SCREENS ==============

  const HomeScreen = () => (
    <div className="overflow-y-auto h-full pb-32" style={{ backgroundColor: palette.washi }}>
      <div className="relative px-6 pt-3 pb-5">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1 h-5" style={{ backgroundColor: palette.shu }} />
              <p className="text-[10px] tracking-[0.3em] uppercase" style={{ color: palette.sumiSoft, fontFamily: '"Cormorant Garamond", serif' }}>Goshuin Collection</p>
            </div>
            <h1 className="text-[32px] leading-none" style={{ fontFamily: '"Shippori Mincho", serif', fontWeight: 700, color: palette.sumi, letterSpacing: '0.05em' }}>御朱印帳</h1>
          </div>
          <button className="relative w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: palette.washiDark }}>
            <Bell size={16} style={{ color: palette.sumi }} strokeWidth={1.5} />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ backgroundColor: palette.shu }} />
          </button>
        </div>
      </div>

      {/* Greeting card */}
      <div className="mx-5 relative rounded-2xl overflow-hidden mb-6" style={{ backgroundColor: palette.sumi }}>
        <SeigaihaBG opacity={0.12} color="#F5EFE3" />
        <div className="absolute -right-6 -top-6 opacity-10" style={{ fontFamily: '"Shippori Mincho", serif', fontSize: 140, color: palette.washi, fontWeight: 900, lineHeight: 1 }}>朱</div>
        <div className="relative p-5">
          <p className="text-[10px] tracking-[0.4em] mb-2" style={{ color: palette.kin, fontFamily: '"Cormorant Garamond", serif' }}>令和七年 五月</p>
          <p className="text-xl leading-snug" style={{ fontFamily: '"Shippori Mincho", serif', color: palette.washi, fontWeight: 500 }}>願您今日<br />參拜順遂安康。</p>
        </div>
      </div>

      {/* Stats */}
      <div className="px-5 mb-6">
        <div className="grid grid-cols-3 gap-2">
          {[
            { num: totalCount, label: '收集數', sub: 'Total' },
            { num: uniquePlaces, label: '訪問地', sub: 'Places' },
            { num: visitedRegions, label: '地區', sub: 'Regions' },
          ].map((s, i) => (
            <div key={i} className="relative rounded-xl p-3 overflow-hidden" style={{ backgroundColor: palette.washiDark }}>
              <div className="absolute top-1 right-2 text-[8px] tracking-widest" style={{ color: palette.shu, fontFamily: '"Cormorant Garamond", serif' }}>{s.sub}</div>
              <div className="text-[28px] leading-none mb-1" style={{ fontFamily: '"Shippori Mincho", serif', color: palette.sumi, fontWeight: 700 }}>{s.num}</div>
              <div className="text-[11px]" style={{ color: palette.sumiSoft, fontFamily: '"Klee One", serif' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories quick info */}
      <div className="mb-6">
        <div className="flex items-end justify-between px-5 mb-3">
          <div>
            <p className="text-[9px] tracking-[0.3em] uppercase mb-0.5" style={{ color: palette.shu, fontFamily: '"Cormorant Garamond", serif' }}>Categories</p>
            <h2 className="text-base" style={{ fontFamily: '"Shippori Mincho", serif', color: palette.sumi, fontWeight: 600 }}>五大類別</h2>
          </div>
          <button onClick={() => setActiveTab('discover')} className="flex items-center gap-0.5 text-[11px]" style={{ color: palette.sumiSoft, fontFamily: '"Klee One", serif' }}>
            探索<ChevronRight size={12} />
          </button>
        </div>
        <div className="flex gap-2 overflow-x-auto px-5 pb-2">
          {CATEGORIES.slice(1).map(c => (
            <button key={c.id} onClick={() => setShowCategoryInfo(c)} className="flex-shrink-0 w-32 rounded-xl p-3 text-left relative overflow-hidden" style={{ backgroundColor: palette.washiDark, border: `1px solid ${palette.washiDeep}` }}>
              <div className="relative">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-2" style={{ backgroundColor: palette.sumi }}>
                  <span style={{ fontFamily: '"Shippori Mincho", serif', fontSize: 18, color: palette.kin, fontWeight: 700 }}>{c.mark}</span>
                </div>
                <p className="text-[14px] leading-none" style={{ fontFamily: '"Shippori Mincho", serif', color: palette.sumi, fontWeight: 700 }}>{c.jp}</p>
                <p className="text-[8px] tracking-widest mt-1" style={{ color: palette.sumiSoft, fontFamily: '"Cormorant Garamond", serif' }}>{c.desc.toUpperCase()}</p>
                <div className="flex items-center gap-1 mt-2">
                  <Info size={9} style={{ color: palette.shu }} />
                  <p className="text-[9px]" style={{ color: palette.sumiSoft, fontFamily: '"Klee One", serif' }}>了解更多</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Recent collection */}
      {enrichedCollection.length > 0 ? (
        <div className="mb-6">
          <div className="flex items-end justify-between px-5 mb-3">
            <div>
              <p className="text-[9px] tracking-[0.3em] uppercase mb-0.5" style={{ color: palette.shu, fontFamily: '"Cormorant Garamond", serif' }}>Recent Stamps</p>
              <h2 className="text-base" style={{ fontFamily: '"Shippori Mincho", serif', color: palette.sumi, fontWeight: 600 }}>最近的御朱印</h2>
            </div>
            <button onClick={() => setActiveTab('collection')} className="flex items-center gap-0.5 text-[11px]" style={{ color: palette.sumiSoft, fontFamily: '"Klee One", serif' }}>
              全部<ChevronRight size={12} />
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto px-5 pb-2">
            {enrichedCollection.slice(0, 6).map(e => (
              <button key={e.id} onClick={() => setSelected({ type: 'entry', data: e })} className="flex-shrink-0 w-32 relative rounded-lg overflow-hidden" style={{ backgroundColor: palette.washi, border: `1px solid ${palette.washiDeep}` }}>
                <div className="aspect-[3/4] flex items-center justify-center relative" style={{ background: e.photo ? '#000' : `linear-gradient(135deg, ${palette.washi} 0%, ${palette.washiDark} 100%)` }}>
                  {e.photo ? (
                    <img src={e.photo} alt={e.place.name} className="w-full h-full object-cover" />
                  ) : (
                    <>
                      <div className="absolute top-2 left-2 text-[8px] tracking-widest" style={{ color: palette.sumiSoft, fontFamily: '"Cormorant Garamond", serif' }}>NO.{String(enrichedCollection.indexOf(e) + 1).padStart(3, '0')}</div>
                      <InkStamp kanji={e.place.kanji} color={e.place.category === '寺' || e.place.category === '院' ? palette.sumi : palette.shu} size={64} />
                      <div className="absolute bottom-1 right-2 text-[8px]" style={{ color: palette.sumiSoft, fontFamily: '"Klee One", serif', writingMode: 'vertical-rl' }}>{e.place.pref.replace('縣','').replace('府','').replace('都','')}</div>
                    </>
                  )}
                </div>
                <div className="px-2 py-2 border-t" style={{ borderColor: palette.washiDeep }}>
                  <p className="text-[12px] leading-tight truncate" style={{ fontFamily: '"Shippori Mincho", serif', color: palette.sumi, fontWeight: 600 }}>{e.place.name}</p>
                  <p className="text-[8px] mt-0.5 truncate" style={{ color: palette.sumiSoft, fontFamily: '"Klee One", serif' }}>{e.date}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="mx-5 mb-6 relative rounded-2xl overflow-hidden p-6 text-center" style={{ backgroundColor: palette.washiDark, border: `1px dashed ${palette.washiDeep}` }}>
          <div className="relative">
            <p className="text-[40px] leading-none mb-2" style={{ fontFamily: '"Shippori Mincho", serif', color: palette.washiDeep, fontWeight: 700 }}>始</p>
            <p className="text-[13px] mb-1" style={{ fontFamily: '"Shippori Mincho", serif', color: palette.sumi, fontWeight: 600 }}>開始您的御朱印之旅</p>
            <p className="text-[11px]" style={{ color: palette.sumiSoft, fontFamily: '"Klee One", serif' }}>點擊下方新增第一個御朱印</p>
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="px-5 mb-6">
        <button onClick={() => setShowAddModal(true)} className="w-full relative rounded-2xl overflow-hidden p-5 flex items-center gap-3" style={{ background: `linear-gradient(135deg, ${palette.shu} 0%, ${palette.shuDark} 100%)` }}>
          <SeigaihaBG opacity={0.18} color="#F5EFE3" />
          <div className="relative w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(245,239,227,0.15)', backdropFilter: 'blur(8px)' }}>
            <Plus size={20} style={{ color: palette.washi }} strokeWidth={2} />
          </div>
          <div className="relative text-left flex-1">
            <p className="text-[10px] tracking-[0.3em]" style={{ color: 'rgba(245,239,227,0.7)', fontFamily: '"Cormorant Garamond", serif' }}>UPLOAD NEW</p>
            <p className="text-base mt-0.5" style={{ fontFamily: '"Shippori Mincho", serif', color: palette.washi, fontWeight: 600 }}>新增御朱印</p>
          </div>
          <ChevronRight size={16} style={{ color: palette.washi }} className="relative" />
        </button>
      </div>
    </div>
  );

  const CollectionScreen = () => (
    <div className="overflow-y-auto h-full pb-32" style={{ backgroundColor: palette.washi }}>
      <div className="px-6 pt-3 pb-4 flex items-end justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1 h-5" style={{ backgroundColor: palette.shu }} />
            <p className="text-[10px] tracking-[0.3em] uppercase" style={{ color: palette.sumiSoft, fontFamily: '"Cormorant Garamond", serif' }}>My Collection</p>
          </div>
          <h1 className="text-[28px] leading-none" style={{ fontFamily: '"Shippori Mincho", serif', fontWeight: 700, color: palette.sumi, letterSpacing: '0.05em' }}>朱印簿</h1>
        </div>
        <button onClick={() => setShowAddModal(true)} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: palette.sumi }}>
          <Plus size={16} style={{ color: palette.washi }} strokeWidth={2} />
        </button>
      </div>

      {/* Filter mode toggle */}
      <div className="px-5 mb-4">
        <div className="relative flex p-1 rounded-full" style={{ backgroundColor: palette.washiDark }}>
          <div className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full transition-all duration-300" style={{
            backgroundColor: palette.sumi,
            left: filterMode === 'region' ? '4px' : 'calc(50% + 0px)'
          }} />
          {[
            { id: 'region', jp: '依地區', en: 'Region' },
            { id: 'category', jp: '依類別', en: 'Category' },
          ].map(t => (
            <button key={t.id} onClick={() => setFilterMode(t.id)} className="relative flex-1 py-2 text-center transition-colors">
              <p className="text-[12px] leading-none" style={{ fontFamily: '"Shippori Mincho", serif', color: filterMode === t.id ? palette.washi : palette.sumi, fontWeight: 600 }}>{t.jp}</p>
              <p className="text-[8px] tracking-widest mt-0.5" style={{ color: filterMode === t.id ? 'rgba(245,239,227,0.6)' : palette.sumiSoft, fontFamily: '"Cormorant Garamond", serif' }}>{t.en.toUpperCase()}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Filter chips */}
      <div className="mb-5">
        {filterMode === 'region' ? (
          <div className="flex gap-2 overflow-x-auto px-5 pb-1">
            {REGIONS.map(r => {
              const cnt = r.id === 'all' ? enrichedCollection.length : enrichedCollection.filter(e => e.place.region === r.id).length;
              return (
                <button key={r.id} onClick={() => setActiveRegion(r.id)} className="flex-shrink-0 px-3.5 py-2 rounded-full transition-all" style={{
                  backgroundColor: activeRegion === r.id ? palette.shu : 'transparent',
                  border: `1px solid ${activeRegion === r.id ? palette.shu : palette.washiDeep}`,
                }}>
                  <div className="flex items-center gap-1.5">
                    <p className="text-[12px] leading-none" style={{ fontFamily: '"Shippori Mincho", serif', color: activeRegion === r.id ? palette.washi : palette.sumi, fontWeight: 600 }}>{r.jp}</p>
                    <span className="text-[9px] px-1 rounded" style={{
                      backgroundColor: activeRegion === r.id ? 'rgba(245,239,227,0.2)' : palette.washiDark,
                      color: activeRegion === r.id ? palette.washi : palette.sumiSoft,
                      fontFamily: '"Cormorant Garamond", serif'
                    }}>{cnt}</span>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="flex gap-2 overflow-x-auto px-5 pb-1">
            {CATEGORIES.map(c => {
              const cnt = c.id === 'all' ? enrichedCollection.length : enrichedCollection.filter(e => e.place.category === c.id).length;
              return (
                <button key={c.id} onClick={() => setActiveCategory(c.id)} className="flex-shrink-0 transition-all" style={{
                  backgroundColor: activeCategory === c.id ? palette.sumi : 'transparent',
                  border: `1px solid ${activeCategory === c.id ? palette.sumi : palette.washiDeep}`,
                  borderRadius: '12px',
                  padding: '8px 12px',
                  minWidth: 70,
                }}>
                  <p className="text-[10px] tracking-widest leading-none mb-1" style={{ color: activeCategory === c.id ? palette.kin : palette.sumiSoft, fontFamily: '"Cormorant Garamond", serif' }}>{c.desc.toUpperCase()}</p>
                  <p className="text-[14px] leading-none" style={{ fontFamily: '"Shippori Mincho", serif', color: activeCategory === c.id ? palette.washi : palette.sumi, fontWeight: 700 }}>{c.jp}</p>
                  <p className="text-[9px] mt-1" style={{ color: activeCategory === c.id ? 'rgba(245,239,227,0.5)' : palette.sumiSoft, fontFamily: '"Cormorant Garamond", serif' }}>{cnt} 件</p>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="px-5 flex items-center justify-between mb-3">
        <p className="text-[11px]" style={{ color: palette.sumiSoft, fontFamily: '"Klee One", serif' }}>共 {filteredCollection.length} 件</p>
        <div className="h-px flex-1 mx-3" style={{ backgroundColor: palette.washiDeep }} />
        <p className="text-[9px] tracking-widest" style={{ color: palette.sumiSoft, fontFamily: '"Cormorant Garamond", serif' }}>NEWEST</p>
      </div>

      {/* Goshuin grid */}
      {filteredCollection.length > 0 ? (
        <div className="px-5 grid grid-cols-2 gap-3">
          {filteredCollection.map((e, idx) => (
            <button key={e.id} onClick={() => setSelected({ type: 'entry', data: e })} className="relative rounded-lg overflow-hidden text-left" style={{
              backgroundColor: palette.washi,
              border: `1px solid ${palette.washiDeep}`,
              boxShadow: '0 1px 0 rgba(220,207,178,0.5)'
            }}>
              <div className="aspect-[3/4] relative flex flex-col" style={{ background: e.photo ? '#000' : `linear-gradient(135deg, ${palette.washi} 0%, ${palette.washiDark} 100%)` }}>
                {e.photo ? (
                  <>
                    <img src={e.photo} alt={e.place.name} className="w-full h-full object-cover" />
                    <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded" style={{ backgroundColor: 'rgba(26,20,16,0.7)', backdropFilter: 'blur(4px)' }}>
                      <p className="text-[8px]" style={{ color: palette.kin, fontFamily: '"Shippori Mincho", serif', fontWeight: 600 }}>{e.place.category}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="absolute top-0 left-0 w-6 h-6 border-l border-t" style={{ borderColor: palette.shu, opacity: 0.6 }} />
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-r border-b" style={{ borderColor: palette.shu, opacity: 0.6 }} />
                    <div className="absolute top-2 left-2 text-[8px] tracking-widest" style={{ color: palette.sumiSoft, fontFamily: '"Cormorant Garamond", serif' }}>NO.{String(idx + 1).padStart(3, '0')}</div>
                    <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded" style={{ backgroundColor: palette.sumi }}>
                      <p className="text-[8px]" style={{ color: palette.kin, fontFamily: '"Shippori Mincho", serif', fontWeight: 600 }}>{e.place.category}</p>
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                      <InkStamp kanji={e.place.kanji} color={e.place.category === '寺' || e.place.category === '院' ? palette.sumi : palette.shu} size={70} />
                    </div>
                    <div className="absolute bottom-2 left-2 text-[8px]" style={{ color: palette.sumiSoft, fontFamily: '"Klee One", serif' }}>{e.place.pref.replace('縣','').replace('府','').replace('都','')}</div>
                    <div className="absolute bottom-2 right-2 flex items-center gap-0.5">
                      <Camera size={9} style={{ color: palette.sumiSoft, opacity: 0.5 }} />
                    </div>
                  </>
                )}
              </div>
              <div className="px-2.5 py-2 border-t" style={{ borderColor: palette.washiDeep }}>
                <p className="text-[12px] leading-tight truncate" style={{ fontFamily: '"Shippori Mincho", serif', color: palette.sumi, fontWeight: 600 }}>{e.place.name}</p>
                <p className="text-[8px] mt-0.5 truncate" style={{ color: palette.sumiSoft, fontFamily: '"Klee One", serif' }}>{e.date}</p>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="px-5 py-12 text-center">
          <p className="text-[40px] mb-3" style={{ fontFamily: '"Shippori Mincho", serif', color: palette.washiDeep, fontWeight: 700 }}>無</p>
          <p className="text-[12px]" style={{ color: palette.sumiSoft, fontFamily: '"Klee One", serif' }}>此分類尚無御朱印</p>
          <button onClick={() => setShowAddModal(true)} className="mt-4 px-4 py-2 rounded-full text-[11px]" style={{ backgroundColor: palette.sumi, color: palette.washi, fontFamily: '"Shippori Mincho", serif' }}>立即新增</button>
        </div>
      )}
    </div>
  );

  const DiscoverScreen = () => (
    <div className="overflow-y-auto h-full pb-32" style={{ backgroundColor: palette.washi }}>
      <div className="px-6 pt-3 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1 h-5" style={{ backgroundColor: palette.shu }} />
          <p className="text-[10px] tracking-[0.3em] uppercase" style={{ color: palette.sumiSoft, fontFamily: '"Cormorant Garamond", serif' }}>Discover</p>
        </div>
        <h1 className="text-[28px] leading-none" style={{ fontFamily: '"Shippori Mincho", serif', fontWeight: 700, color: palette.sumi, letterSpacing: '0.05em' }}>探索</h1>
      </div>

      {/* Search */}
      <div className="px-5 mb-5">
        <div className="flex items-center gap-2 px-4 py-3 rounded-full" style={{ backgroundColor: palette.washiDark }}>
          <Search size={14} style={{ color: palette.sumiSoft }} strokeWidth={1.5} />
          <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="搜尋寺社名稱…" className="flex-1 bg-transparent outline-none text-[12px]" style={{ color: palette.sumi, fontFamily: '"Klee One", serif' }} />
          {searchQuery && <button onClick={() => setSearchQuery('')}><X size={12} style={{ color: palette.sumiSoft }} /></button>}
        </div>
      </div>

      {/* Categories */}
      <div className="px-5 mb-4">
        <p className="text-[9px] tracking-[0.3em] uppercase mb-0.5" style={{ color: palette.shu, fontFamily: '"Cormorant Garamond", serif' }}>By Category</p>
        <h2 className="text-base mb-3" style={{ fontFamily: '"Shippori Mincho", serif', color: palette.sumi, fontWeight: 600 }}>依類別瀏覽</h2>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {CATEGORIES.map(c => (
            <button key={c.id} onClick={() => setDiscoverCategory(c.id)} className="flex-shrink-0 transition-all" style={{
              backgroundColor: discoverCategory === c.id ? palette.sumi : 'transparent',
              border: `1px solid ${discoverCategory === c.id ? palette.sumi : palette.washiDeep}`,
              borderRadius: '12px',
              padding: '8px 12px',
              minWidth: 70,
            }}>
              <p className="text-[10px] tracking-widest leading-none mb-1" style={{ color: discoverCategory === c.id ? palette.kin : palette.sumiSoft, fontFamily: '"Cormorant Garamond", serif' }}>{c.desc.toUpperCase()}</p>
              <p className="text-[14px] leading-none" style={{ fontFamily: '"Shippori Mincho", serif', color: discoverCategory === c.id ? palette.washi : palette.sumi, fontWeight: 700 }}>{c.jp}</p>
              {c.id !== 'all' && (
                <p className="text-[9px] mt-1" style={{ color: discoverCategory === c.id ? 'rgba(245,239,227,0.5)' : palette.sumiSoft, fontFamily: '"Cormorant Garamond", serif' }}>{PLACES.filter(p => p.category === c.id).length} 件</p>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Category info card */}
      {discoverCategory !== 'all' && (() => {
        const c = CATEGORIES.find(x => x.id === discoverCategory);
        return (
          <div className="px-5 mb-5">
            <div className="relative rounded-2xl p-4 overflow-hidden" style={{ backgroundColor: palette.sumi }}>
              <SeigaihaBG opacity={0.1} color="#F5EFE3" />
              <div className="absolute -right-4 -top-4 opacity-10" style={{ fontFamily: '"Shippori Mincho", serif', fontSize: 100, color: palette.washi, fontWeight: 900, lineHeight: 1 }}>{c.mark}</div>
              <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <Info size={11} style={{ color: palette.kin }} />
                  <p className="text-[9px] tracking-widest" style={{ color: palette.kin, fontFamily: '"Cormorant Garamond", serif' }}>ABOUT {c.desc.toUpperCase()}</p>
                </div>
                <h3 className="text-lg leading-tight mb-2" style={{ fontFamily: '"Shippori Mincho", serif', color: palette.washi, fontWeight: 600 }}>{c.jp}</h3>
                <p className="text-[11px] leading-relaxed" style={{ color: 'rgba(245,239,227,0.75)', fontFamily: '"Klee One", serif' }}>{c.longDesc}</p>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Places list */}
      <div className="px-5 mb-3 flex items-center justify-between">
        <p className="text-[11px]" style={{ color: palette.sumiSoft, fontFamily: '"Klee One", serif' }}>共 {discoverPlaces.length} 處</p>
        <div className="h-px flex-1 mx-3" style={{ backgroundColor: palette.washiDeep }} />
        <p className="text-[9px] tracking-widest" style={{ color: palette.sumiSoft, fontFamily: '"Cormorant Garamond", serif' }}>PLACES</p>
      </div>

      <div className="px-5 space-y-2">
        {discoverPlaces.map(p => {
          const isCollected = collection.some(e => e.placeId === p.id);
          return (
            <button key={p.id} onClick={() => setSelected({ type: 'place', data: p })} className="w-full flex items-center gap-3 p-3 rounded-xl text-left" style={{ backgroundColor: palette.washiDark, border: `1px solid ${palette.washiDeep}` }}>
              <InkStamp kanji={p.kanji} color={p.category === '寺' || p.category === '院' ? palette.sumi : palette.shu} size={48} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-[14px] leading-tight truncate" style={{ fontFamily: '"Shippori Mincho", serif', color: palette.sumi, fontWeight: 700 }}>{p.name}</p>
                  {isCollected && <Check size={11} style={{ color: palette.matcha }} strokeWidth={2.5} />}
                </div>
                <p className="text-[10px] mt-0.5 truncate" style={{ color: palette.sumiSoft, fontFamily: '"Klee One", serif' }}>{p.reading}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-[8px] px-1.5 py-0.5 rounded" style={{ backgroundColor: palette.sumi, color: palette.kin, fontFamily: '"Shippori Mincho", serif' }}>{p.category}</span>
                  <div className="flex items-center gap-0.5">
                    <MapPin size={9} style={{ color: palette.shu }} />
                    <p className="text-[9px]" style={{ color: palette.sumiSoft, fontFamily: '"Klee One", serif' }}>{p.region} · {p.pref}</p>
                  </div>
                </div>
              </div>
              <ChevronRight size={14} style={{ color: palette.sumiSoft }} />
            </button>
          );
        })}
        {discoverPlaces.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-[12px]" style={{ color: palette.sumiSoft, fontFamily: '"Klee One", serif' }}>查無相關寺社</p>
          </div>
        )}
      </div>

      {/* Add custom hint */}
      <div className="px-5 mt-6">
        <button onClick={() => { setShowAddModal(true); setAddMode('custom'); setAddStep(2); }} className="w-full p-4 rounded-xl border-2 border-dashed flex items-center justify-center gap-2" style={{ borderColor: palette.washiDeep, backgroundColor: 'rgba(255,255,255,0.3)' }}>
          <Plus size={14} style={{ color: palette.shu }} />
          <p className="text-[12px]" style={{ fontFamily: '"Shippori Mincho", serif', color: palette.sumi, fontWeight: 600 }}>找不到？自行新增寺社</p>
        </button>
      </div>
    </div>
  );

  // ============== PROFILE & SUB-PAGES ==============

  const SubPageHeader = ({ title, subtitle }) => (
    <div className="px-5 pt-3 pb-4 flex items-center gap-3" style={{ borderBottom: `1px solid ${palette.washiDeep}` }}>
      <button onClick={() => setProfileView('main')} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: palette.washiDark }}>
        <ChevronLeft size={16} style={{ color: palette.sumi }} />
      </button>
      <div>
        <p className="text-[9px] tracking-[0.3em] uppercase" style={{ color: palette.shu, fontFamily: '"Cormorant Garamond", serif' }}>{subtitle}</p>
        <h1 className="text-[20px] leading-none mt-0.5" style={{ fontFamily: '"Shippori Mincho", serif', fontWeight: 700, color: palette.sumi, letterSpacing: '0.05em' }}>{title}</h1>
      </div>
    </div>
  );

  const Toggle = ({ on, onChange }) => (
    <button onClick={onChange} className="w-10 h-5 rounded-full relative transition-colors flex-shrink-0" style={{ backgroundColor: on ? palette.shu : palette.washiDeep }}>
      <div className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all" style={{ left: on ? '22px' : '2px', boxShadow: '0 1px 2px rgba(0,0,0,0.15)' }} />
    </button>
  );

  const ProfileMain = () => {
    const regionsWithData = regionCounts.filter(r => r.count > 0);
    const menuItems = [
      { jp: '匯出朱印簿', en: 'Export', sub: '輸出為 PDF、圖片或分享', view: 'export', icon: Download },
      { jp: '應用程式設定', en: 'Settings', sub: '顯示、通知、資料管理', view: 'settings', icon: Globe },
      { jp: '關於', en: 'About', sub: '應用程式與御朱印介紹', view: 'about', icon: Info },
    ];
    return (
      <div className="overflow-y-auto h-full pb-32" style={{ backgroundColor: palette.washi }}>
        <div className="px-6 pt-3 pb-4">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1 h-5" style={{ backgroundColor: palette.shu }} />
            <p className="text-[10px] tracking-[0.3em] uppercase" style={{ color: palette.sumiSoft, fontFamily: '"Cormorant Garamond", serif' }}>Personal</p>
          </div>
          <h1 className="text-[28px] leading-none" style={{ fontFamily: '"Shippori Mincho", serif', fontWeight: 700, color: palette.sumi, letterSpacing: '0.05em' }}>個人</h1>
        </div>

        {/* Stats summary */}
        <div className="px-5 mb-6">
          <div className="grid grid-cols-3 gap-2">
            {[
              { num: totalCount, label: '收集數', en: 'Total' },
              { num: uniquePlaces, label: '訪問地', en: 'Places' },
              { num: visitedRegions, label: '地區', en: 'Regions' },
            ].map((s, i) => (
              <div key={i} className="relative rounded-xl p-3 overflow-hidden" style={{ backgroundColor: palette.washiDark }}>
                <p className="text-[8px] tracking-widest" style={{ color: palette.shu, fontFamily: '"Cormorant Garamond", serif' }}>{s.en.toUpperCase()}</p>
                <p className="text-[28px] leading-none mt-1" style={{ fontFamily: '"Shippori Mincho", serif', color: palette.sumi, fontWeight: 700 }}>{s.num}</p>
                <p className="text-[10px] mt-1" style={{ color: palette.sumiSoft, fontFamily: '"Klee One", serif' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Category breakdown */}
        {totalCount > 0 && (
          <div className="px-5 mb-6">
            <p className="text-[9px] tracking-[0.3em] uppercase mb-0.5" style={{ color: palette.shu, fontFamily: '"Cormorant Garamond", serif' }}>By Category</p>
            <h2 className="text-base mb-3" style={{ fontFamily: '"Shippori Mincho", serif', color: palette.sumi, fontWeight: 600 }}>類別統計</h2>
            <div className="rounded-xl overflow-hidden" style={{ backgroundColor: palette.washiDark }}>
              {categoryCounts.map((c, i, arr) => (
                <div key={c.id} className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: i < arr.length - 1 ? `1px solid ${palette.washiDeep}` : 'none' }}>
                  <div className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0" style={{ backgroundColor: palette.sumi }}>
                    <span style={{ fontFamily: '"Shippori Mincho", serif', fontSize: 14, color: palette.kin, fontWeight: 700 }}>{c.mark}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-[12px] leading-none" style={{ fontFamily: '"Shippori Mincho", serif', color: palette.sumi, fontWeight: 700 }}>{c.jp}</p>
                    <div className="h-1 rounded-full mt-2 relative overflow-hidden" style={{ backgroundColor: palette.washiDeep }}>
                      <div className="h-full rounded-full" style={{ width: `${(c.count / totalCount) * 100}%`, backgroundColor: palette.shu }} />
                    </div>
                  </div>
                  <p className="text-[14px]" style={{ fontFamily: '"Cormorant Garamond", serif', color: palette.sumi, fontWeight: 700 }}>{c.count}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Region breakdown */}
        {totalCount > 0 && regionsWithData.length > 0 && (
          <div className="px-5 mb-6">
            <p className="text-[9px] tracking-[0.3em] uppercase mb-0.5" style={{ color: palette.shu, fontFamily: '"Cormorant Garamond", serif' }}>By Region</p>
            <h2 className="text-base mb-3" style={{ fontFamily: '"Shippori Mincho", serif', color: palette.sumi, fontWeight: 600 }}>地區分布</h2>
            <div className="rounded-xl overflow-hidden p-1" style={{ backgroundColor: palette.washiDark }}>
              <div className="grid grid-cols-3 gap-1">
                {REGIONS.slice(1).map(r => {
                  const cnt = regionCounts.find(x => x.id === r.id)?.count || 0;
                  const visited = cnt > 0;
                  return (
                    <div key={r.id} className="rounded-lg p-2.5 text-center" style={{ backgroundColor: visited ? palette.washi : 'transparent', opacity: visited ? 1 : 0.5 }}>
                      <p className="text-[12px] leading-none" style={{ fontFamily: '"Shippori Mincho", serif', color: visited ? palette.sumi : palette.sumiSoft, fontWeight: visited ? 700 : 500 }}>{r.jp}</p>
                      <p className="text-[16px] leading-none mt-1.5" style={{ fontFamily: '"Cormorant Garamond", serif', color: visited ? palette.shu : palette.washiDeep, fontWeight: 700 }}>{cnt}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Menu */}
        <div className="px-5 mb-4">
          <p className="text-[9px] tracking-[0.3em] uppercase mb-2" style={{ color: palette.shu, fontFamily: '"Cormorant Garamond", serif' }}>Menu</p>
          <div className="rounded-xl overflow-hidden" style={{ backgroundColor: palette.washiDark }}>
            {menuItems.map((m, i, arr) => {
              const Icon = m.icon;
              return (
                <button key={i} onClick={() => setProfileView(m.view)} className="w-full flex items-center gap-3 px-4 py-3.5 text-left" style={{
                  borderBottom: i < arr.length - 1 ? `1px solid ${palette.washiDeep}` : 'none'
                }}>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: palette.sumi }}>
                    <Icon size={14} style={{ color: palette.kin }} strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <p className="text-[13px] leading-none" style={{ fontFamily: '"Shippori Mincho", serif', color: palette.sumi, fontWeight: 600 }}>{m.jp}</p>
                    <p className="text-[10px] mt-1" style={{ color: palette.sumiSoft, fontFamily: '"Klee One", serif' }}>{m.sub}</p>
                  </div>
                  <ChevronRight size={14} style={{ color: palette.sumiSoft }} />
                </button>
              );
            })}
          </div>
        </div>

        <div className="text-center">
          <p className="text-[9px] tracking-[0.4em]" style={{ color: palette.sumiSoft, fontFamily: '"Cormorant Garamond", serif' }}>御朱印帳 · v 1.0.0</p>
        </div>
      </div>
    );
  };

  const ExportSubPage = () => (
    <div className="overflow-y-auto h-full pb-32" style={{ backgroundColor: palette.washi }}>
      <SubPageHeader title="匯出朱印簿" subtitle="Export" />

      {/* Summary */}
      <div className="mx-5 mt-5 mb-5 relative rounded-2xl overflow-hidden p-5" style={{ backgroundColor: palette.sumi }}>
        <SeigaihaBG opacity={0.12} color="#F5EFE3" />
        <div className="absolute -right-4 -top-6 opacity-10" style={{ fontFamily: '"Shippori Mincho", serif', fontSize: 130, color: palette.washi, fontWeight: 900, lineHeight: 1 }}>冊</div>
        <div className="relative">
          <p className="text-[10px] tracking-[0.3em]" style={{ color: palette.kin, fontFamily: '"Cormorant Garamond", serif' }}>YOUR COLLECTION</p>
          <p className="text-[32px] leading-none mt-2" style={{ fontFamily: '"Shippori Mincho", serif', color: palette.washi, fontWeight: 700 }}>
            {totalCount}
            <span className="text-base ml-2" style={{ color: palette.kin }}>件御朱印</span>
          </p>
          <p className="text-[11px] mt-3" style={{ color: 'rgba(245,239,227,0.6)', fontFamily: '"Klee One", serif' }}>
            來自 {visitedRegions} 個地區 · {uniquePlaces} 處寺社
          </p>
        </div>
      </div>

      {/* Export options */}
      <div className="px-5">
        <p className="text-[9px] tracking-[0.3em] mb-3" style={{ color: palette.shu, fontFamily: '"Cormorant Garamond", serif' }}>EXPORT FORMATS</p>
        <div className="space-y-2">
          {[
            { icon: FileText, jp: '匯出為 PDF', sub: '完整朱印簿，含所有照片與筆記' },
            { icon: ImageIcon, jp: '匯出為一張圖片', sub: '所有朱印拼貼成單張長圖' },
            { icon: Share2, jp: '分享', sub: '透過其他應用程式分享朱印簿' },
            { icon: Printer, jp: '列印', sub: '列印實體朱印簿' },
          ].map((opt, i) => {
            const Icon = opt.icon;
            const disabled = totalCount === 0;
            return (
              <button key={i} disabled={disabled} className="w-full flex items-center gap-3 p-4 rounded-xl text-left" style={{ backgroundColor: palette.washiDark, border: `1px solid ${palette.washiDeep}`, opacity: disabled ? 0.4 : 1 }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: palette.sumi }}>
                  <Icon size={15} style={{ color: palette.kin }} strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] leading-none" style={{ fontFamily: '"Shippori Mincho", serif', color: palette.sumi, fontWeight: 700 }}>{opt.jp}</p>
                  <p className="text-[10px] mt-1 truncate" style={{ color: palette.sumiSoft, fontFamily: '"Klee One", serif' }}>{opt.sub}</p>
                </div>
                <ChevronRight size={14} style={{ color: palette.sumiSoft }} />
              </button>
            );
          })}
        </div>
        {totalCount === 0 && (
          <p className="text-[10px] text-center mt-4" style={{ color: palette.sumiSoft, fontFamily: '"Klee One", serif' }}>尚未有御朱印可供匯出</p>
        )}
      </div>
    </div>
  );

  const SettingsSubPage = () => (
    <div className="overflow-y-auto h-full pb-32" style={{ backgroundColor: palette.washi }}>
      <SubPageHeader title="應用程式設定" subtitle="Settings" />

      {/* Display */}
      <div className="px-5 mt-5 mb-5">
        <p className="text-[9px] tracking-[0.3em] mb-2" style={{ color: palette.shu, fontFamily: '"Cormorant Garamond", serif' }}>DISPLAY</p>
        <div className="rounded-xl overflow-hidden" style={{ backgroundColor: palette.washiDark }}>
          <div className="flex items-center gap-3 px-4 py-3.5">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: palette.sumi }}>
              <Moon size={14} style={{ color: palette.kin }} strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <p className="text-[13px] leading-none" style={{ fontFamily: '"Shippori Mincho", serif', color: palette.sumi, fontWeight: 600 }}>暗色模式</p>
              <p className="text-[10px] mt-1" style={{ color: palette.sumiSoft, fontFamily: '"Klee One", serif' }}>適合夜間使用</p>
            </div>
            <Toggle on={settingsToggles.darkMode} onChange={() => setSettingsToggles(s => ({ ...s, darkMode: !s.darkMode }))} />
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="px-5 mb-5">
        <p className="text-[9px] tracking-[0.3em] mb-2" style={{ color: palette.shu, fontFamily: '"Cormorant Garamond", serif' }}>NOTIFICATIONS</p>
        <div className="rounded-xl overflow-hidden" style={{ backgroundColor: palette.washiDark }}>
          <div className="flex items-center gap-3 px-4 py-3.5">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: palette.sumi }}>
              <Bell size={14} style={{ color: palette.kin }} strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <p className="text-[13px] leading-none" style={{ fontFamily: '"Shippori Mincho", serif', color: palette.sumi, fontWeight: 600 }}>參拜紀念日提醒</p>
              <p className="text-[10px] mt-1" style={{ color: palette.sumiSoft, fontFamily: '"Klee One", serif' }}>每年同日提醒回顧</p>
            </div>
            <Toggle on={settingsToggles.notifications} onChange={() => setSettingsToggles(s => ({ ...s, notifications: !s.notifications }))} />
          </div>
        </div>
      </div>

      {/* Data */}
      <div className="px-5 mb-5">
        <p className="text-[9px] tracking-[0.3em] mb-2" style={{ color: palette.shu, fontFamily: '"Cormorant Garamond", serif' }}>DATA</p>
        <div className="rounded-xl overflow-hidden" style={{ backgroundColor: palette.washiDark }}>
          <div className="flex items-center gap-3 px-4 py-3.5" style={{ borderBottom: `1px solid ${palette.washiDeep}` }}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: palette.sumi }}>
              <Cloud size={14} style={{ color: palette.kin }} strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <p className="text-[13px] leading-none" style={{ fontFamily: '"Shippori Mincho", serif', color: palette.sumi, fontWeight: 600 }}>自動備份</p>
              <p className="text-[10px] mt-1" style={{ color: palette.sumiSoft, fontFamily: '"Klee One", serif' }}>備份至雲端</p>
            </div>
            <Toggle on={settingsToggles.autoBackup} onChange={() => setSettingsToggles(s => ({ ...s, autoBackup: !s.autoBackup }))} />
          </div>
          <div className="flex items-center gap-3 px-4 py-3.5">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: palette.sumi }}>
              <Globe size={14} style={{ color: palette.kin }} strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <p className="text-[13px] leading-none" style={{ fontFamily: '"Shippori Mincho", serif', color: palette.sumi, fontWeight: 600 }}>語言</p>
              <p className="text-[10px] mt-1" style={{ color: palette.sumiSoft, fontFamily: '"Klee One", serif' }}>應用程式介面語言</p>
            </div>
            <p className="text-[12px]" style={{ color: palette.shu, fontFamily: '"Klee One", serif' }}>繁體中文</p>
          </div>
        </div>
      </div>

      {/* Danger zone */}
      {collection.length > 0 && (
        <div className="px-5 mb-5">
          <p className="text-[9px] tracking-[0.3em] mb-2" style={{ color: palette.shuDark, fontFamily: '"Cormorant Garamond", serif' }}>DANGER ZONE</p>
          <button
            onClick={() => {
              if (confirmingClear) { setCollection([]); setConfirmingClear(false); }
              else { setConfirmingClear(true); setTimeout(() => setConfirmingClear(false), 3000); }
            }}
            className="w-full flex items-center gap-3 p-4 rounded-xl"
            style={{ backgroundColor: confirmingClear ? palette.shuDark : 'rgba(165,58,42,0.08)', border: `1px solid ${confirmingClear ? palette.shuDark : 'rgba(165,58,42,0.3)'}` }}
          >
            <Trash2 size={14} style={{ color: confirmingClear ? palette.washi : palette.shuDark }} />
            <p className="text-[12px]" style={{ fontFamily: '"Shippori Mincho", serif', color: confirmingClear ? palette.washi : palette.shuDark, fontWeight: 600 }}>
              {confirmingClear ? '再按一次以確認清除' : '清除所有記錄'}
            </p>
          </button>
        </div>
      )}

      <div className="px-5 text-center">
        <p className="text-[9px] tracking-widest" style={{ color: palette.sumiSoft, fontFamily: '"Cormorant Garamond", serif' }}>VERSION 1.0.0</p>
      </div>
    </div>
  );

  const AboutSubPage = () => (
    <div className="overflow-y-auto h-full pb-32" style={{ backgroundColor: palette.washi }}>
      <SubPageHeader title="關於" subtitle="About" />

      {/* App identity */}
      <div className="mx-5 mt-5 mb-5 relative rounded-2xl overflow-hidden p-6 text-center" style={{ backgroundColor: palette.sumi }}>
        <SeigaihaBG opacity={0.12} color="#F5EFE3" />
        <div className="relative">
          <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-3" style={{ backgroundColor: palette.shu }}>
            <span style={{ fontFamily: '"Shippori Mincho", serif', fontSize: 32, color: palette.washi, fontWeight: 800 }}>朱</span>
          </div>
          <h2 className="text-2xl" style={{ fontFamily: '"Shippori Mincho", serif', color: palette.washi, fontWeight: 700, letterSpacing: '0.15em' }}>御朱印帳</h2>
          <p className="text-[10px] tracking-[0.3em] mt-2" style={{ color: palette.kin, fontFamily: '"Cormorant Garamond", serif' }}>VERSION 1.0.0</p>
        </div>
      </div>

      {/* What is goshuin */}
      <div className="px-5 mb-5">
        <p className="text-[9px] tracking-[0.3em] mb-2" style={{ color: palette.shu, fontFamily: '"Cormorant Garamond", serif' }}>WHAT IS GOSHUIN</p>
        <div className="rounded-xl p-4 relative overflow-hidden" style={{ backgroundColor: palette.washiDark }}>
          <div className="flex items-baseline gap-3 mb-2">
            <p className="text-[18px]" style={{ fontFamily: '"Shippori Mincho", serif', color: palette.sumi, fontWeight: 700, letterSpacing: '0.1em' }}>御朱印</p>
            <p className="text-[10px]" style={{ color: palette.sumiSoft, fontFamily: '"Klee One", serif' }}>ごしゅいん</p>
          </div>
          <p className="text-[11px] leading-relaxed" style={{ color: palette.sumiSoft, fontFamily: '"Klee One", serif' }}>
            日本神社與佛教寺院授予參拜者的印章與墨書，以朱色印泥蓋章、毛筆書寫寺社名稱與參拜日期。最早源自佛教的納經印，後發展成參拜紀念。每一張御朱印皆為僧侶或神職人員親筆所寫，獨一無二。
          </p>
        </div>
      </div>

      {/* Five types */}
      <div className="px-5 mb-5">
        <p className="text-[9px] tracking-[0.3em] mb-2" style={{ color: palette.shu, fontFamily: '"Cormorant Garamond", serif' }}>FIVE TYPES</p>
        <div className="rounded-xl overflow-hidden" style={{ backgroundColor: palette.washiDark }}>
          {CATEGORIES.slice(1).map((c, i, arr) => (
            <div key={c.id} className="flex items-start gap-3 px-4 py-3" style={{ borderBottom: i < arr.length - 1 ? `1px solid ${palette.washiDeep}` : 'none' }}>
              <div className="w-9 h-9 rounded-md flex items-center justify-center flex-shrink-0" style={{ backgroundColor: palette.sumi }}>
                <span style={{ fontFamily: '"Shippori Mincho", serif', fontSize: 16, color: palette.kin, fontWeight: 700 }}>{c.mark}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-baseline gap-2">
                  <p className="text-[13px] leading-none" style={{ fontFamily: '"Shippori Mincho", serif', color: palette.sumi, fontWeight: 700 }}>{c.jp}</p>
                  <p className="text-[8px] tracking-widest" style={{ color: palette.sumiSoft, fontFamily: '"Cormorant Garamond", serif' }}>{c.desc.toUpperCase()}</p>
                </div>
                <p className="text-[10px] leading-relaxed mt-1.5" style={{ color: palette.sumiSoft, fontFamily: '"Klee One", serif' }}>{c.longDesc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* About this app */}
      <div className="px-5 mb-5">
        <p className="text-[9px] tracking-[0.3em] mb-2" style={{ color: palette.shu, fontFamily: '"Cormorant Garamond", serif' }}>ABOUT THIS APP</p>
        <div className="rounded-xl p-4" style={{ backgroundColor: palette.washiDark }}>
          <p className="text-[11px] leading-relaxed" style={{ color: palette.sumi, fontFamily: '"Klee One", serif' }}>
            專為收集日本各地宮、社、寺、院的御朱印而設計的個人應用程式。依地區與類別整理收藏，將每一次參拜的記憶匯成屬於您自己的一冊朱印簿。
          </p>
          <div className="mt-3 pt-3 border-t flex items-center justify-between" style={{ borderColor: palette.washiDeep }}>
            <p className="text-[9px] tracking-widest" style={{ color: palette.sumiSoft, fontFamily: '"Cormorant Garamond", serif' }}>PLACES INCLUDED</p>
            <p className="text-[12px]" style={{ fontFamily: '"Cormorant Garamond", serif', color: palette.sumi, fontWeight: 700 }}>{PLACES.length} 處</p>
          </div>
        </div>
      </div>
    </div>
  );


  const ProfileScreen = () => {
    if (profileView === 'export') return <ExportSubPage />;
    if (profileView === 'settings') return <SettingsSubPage />;
    if (profileView === 'about') return <AboutSubPage />;
    return <ProfileMain />;
  };


  // ============== MODALS ==============

  const DetailModal = () => {
    if (!selected) return null;
    const isEntry = selected.type === 'entry';
    const place = isEntry ? selected.data.place : selected.data;
    const entry = isEntry ? selected.data : null;
    const stampColor = place.category === '寺' || place.category === '院' ? palette.sumi : palette.shu;

    return (
      <div className="absolute inset-0 z-50 flex items-end" style={{ backgroundColor: 'rgba(26,20,16,0.5)', backdropFilter: 'blur(4px)' }} onClick={() => setSelected(null)}>
        <div className="w-full rounded-t-3xl p-5 pb-8 max-h-[88%] overflow-y-auto relative" style={{ backgroundColor: palette.washi }} onClick={e => e.stopPropagation()}>
          <div className="relative">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-1 rounded-full mx-auto" style={{ backgroundColor: palette.washiDeep }} />
              <button onClick={() => setSelected(null)} className="absolute right-0 top-0 w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: palette.washiDark }}>
                <X size={14} style={{ color: palette.sumi }} />
              </button>
            </div>

            {/* Goshuin / photo display */}
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-4" style={{ background: entry?.photo ? '#000' : `linear-gradient(135deg, ${palette.washi} 0%, ${palette.washiDark} 100%)`, border: `1px solid ${palette.washiDeep}` }}>
              {entry?.photo ? (
                <img src={entry.photo} alt={place.name} className="w-full h-full object-contain" />
              ) : (
                <>
                  <div className="absolute top-3 left-3 w-8 h-8 border-l-2 border-t-2" style={{ borderColor: palette.shu }} />
                  <div className="absolute top-3 right-3 w-8 h-8 border-r-2 border-t-2" style={{ borderColor: palette.shu }} />
                  <div className="absolute bottom-3 left-3 w-8 h-8 border-l-2 border-b-2" style={{ borderColor: palette.shu }} />
                  <div className="absolute bottom-3 right-3 w-8 h-8 border-r-2 border-b-2" style={{ borderColor: palette.shu }} />

                  <div className="absolute top-6 left-1/2 -translate-x-1/2 text-center">
                    <p className="text-[10px] tracking-[0.4em]" style={{ color: palette.sumiSoft, fontFamily: '"Cormorant Garamond", serif' }}>HOUNOU</p>
                    <p className="text-2xl mt-1" style={{ fontFamily: '"Shippori Mincho", serif', color: palette.sumi, fontWeight: 700, letterSpacing: '0.3em' }}>奉納</p>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <InkStamp kanji={place.kanji} color={stampColor} size={140} />
                  </div>

                  <div className="absolute right-6 top-1/2 -translate-y-1/2" style={{ writingMode: 'vertical-rl' }}>
                    <p style={{ fontFamily: '"Shippori Mincho", serif', fontSize: 18, color: palette.sumi, fontWeight: 600, letterSpacing: '0.15em' }}>{place.name}</p>
                  </div>

                  {entry && (
                    <div className="absolute left-6 top-1/2 -translate-y-1/2" style={{ writingMode: 'vertical-rl' }}>
                      <p style={{ fontFamily: '"Klee One", serif', fontSize: 11, color: palette.sumiSoft }}>參拜 · {entry.date}</p>
                    </div>
                  )}

                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
                    <p className="text-[12px]" style={{ fontFamily: '"Klee One", serif', color: palette.sumiSoft }}>尚未上傳照片</p>
                  </div>
                </>
              )}
            </div>

            {!entry?.photo && entry && (
              <button onClick={() => { setShowAddModal(true); setAddMode('list'); setAddStep(2); setDraft({ ...draft, placeId: place.id }); setSelected(null); }} className="w-full mb-4 py-2.5 rounded-full flex items-center justify-center gap-2" style={{ backgroundColor: palette.sumi, color: palette.washi }}>
                <Camera size={13} />
                <p className="text-[12px]" style={{ fontFamily: '"Shippori Mincho", serif', fontWeight: 600 }}>上傳實際御朱印照片</p>
              </button>
            )}

            <div className="space-y-3">
              <div>
                <h3 className="text-xl leading-tight" style={{ fontFamily: '"Shippori Mincho", serif', color: palette.sumi, fontWeight: 700 }}>{place.name}</h3>
                <p className="text-[11px] mt-1" style={{ color: palette.sumiSoft, fontFamily: '"Klee One", serif' }}>{place.reading}</p>
              </div>

              <div className="grid grid-cols-3 gap-2 py-3 border-y" style={{ borderColor: palette.washiDeep }}>
                <div>
                  <p className="text-[8px] tracking-widest" style={{ color: palette.shu, fontFamily: '"Cormorant Garamond", serif' }}>地區</p>
                  <p className="text-[12px] mt-0.5" style={{ fontFamily: '"Shippori Mincho", serif', color: palette.sumi, fontWeight: 600 }}>{place.region}</p>
                </div>
                <div>
                  <p className="text-[8px] tracking-widest" style={{ color: palette.shu, fontFamily: '"Cormorant Garamond", serif' }}>類別</p>
                  <p className="text-[12px] mt-0.5" style={{ fontFamily: '"Shippori Mincho", serif', color: palette.sumi, fontWeight: 600 }}>{place.category}</p>
                </div>
                <div>
                  <p className="text-[8px] tracking-widest" style={{ color: palette.shu, fontFamily: '"Cormorant Garamond", serif' }}>所在地</p>
                  <p className="text-[12px] mt-0.5" style={{ fontFamily: '"Shippori Mincho", serif', color: palette.sumi, fontWeight: 600 }}>{place.pref}</p>
                </div>
              </div>

              {place.desc && (
                <div>
                  <p className="text-[9px] tracking-widest mb-1" style={{ color: palette.shu, fontFamily: '"Cormorant Garamond", serif' }}>ABOUT</p>
                  <p className="text-[11px] leading-relaxed" style={{ color: palette.sumiSoft, fontFamily: '"Klee One", serif' }}>{place.desc}</p>
                </div>
              )}

              {place.founded && (
                <div className="flex items-center gap-2">
                  <Calendar size={12} style={{ color: palette.sumiSoft }} />
                  <p className="text-[11px]" style={{ color: palette.sumiSoft, fontFamily: '"Klee One", serif' }}>創建 · {place.founded}</p>
                </div>
              )}

              {entry?.notes && (
                <div className="p-3 rounded-lg" style={{ backgroundColor: palette.washiDark }}>
                  <p className="text-[9px] tracking-widest mb-1" style={{ color: palette.shu, fontFamily: '"Cormorant Garamond", serif' }}>MY NOTES</p>
                  <p className="text-[12px] leading-relaxed" style={{ color: palette.sumi, fontFamily: '"Klee One", serif' }}>{entry.notes}</p>
                </div>
              )}

              {!isEntry && (
                <button onClick={() => { setShowAddModal(true); setAddMode('list'); setAddStep(2); setDraft({ ...draft, placeId: place.id }); setSelected(null); }} className="w-full mt-2 py-3 rounded-full flex items-center justify-center gap-2" style={{ backgroundColor: palette.shu, color: palette.washi }}>
                  <Plus size={14} />
                  <p className="text-[13px]" style={{ fontFamily: '"Shippori Mincho", serif', fontWeight: 600 }}>新增至我的朱印簿</p>
                </button>
              )}

              {isEntry && (
                <button onClick={() => handleDeleteEntry(entry.id)} className="w-full py-2.5 rounded-full flex items-center justify-center gap-2" style={{ border: `1px solid ${palette.washiDeep}` }}>
                  <Trash2 size={12} style={{ color: palette.shuDark }} />
                  <p className="text-[12px]" style={{ fontFamily: '"Klee One", serif', color: palette.shuDark }}>刪除此記錄</p>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Category info modal
  const CategoryInfoModal = () => {
    if (!showCategoryInfo) return null;
    const c = showCategoryInfo;
    const placesInCat = PLACES.filter(p => p.category === c.id);
    return (
      <div className="absolute inset-0 z-50 flex items-end" style={{ backgroundColor: 'rgba(26,20,16,0.5)', backdropFilter: 'blur(4px)' }} onClick={() => setShowCategoryInfo(null)}>
        <div className="w-full rounded-t-3xl pb-8 max-h-[85%] overflow-y-auto relative" style={{ backgroundColor: palette.washi }} onClick={e => e.stopPropagation()}>
          <div className="relative p-5 pb-3" style={{ backgroundColor: palette.sumi, borderTopLeftRadius: 24, borderTopRightRadius: 24 }}>
            <SeigaihaBG opacity={0.12} color="#F5EFE3" />
            <div className="absolute -right-4 -top-4 opacity-10" style={{ fontFamily: '"Shippori Mincho", serif', fontSize: 160, color: palette.washi, fontWeight: 900, lineHeight: 1 }}>{c.mark}</div>
            <div className="relative flex items-center justify-between mb-3">
              <div className="w-10 h-1 rounded-full mx-auto" style={{ backgroundColor: 'rgba(245,239,227,0.3)' }} />
              <button onClick={() => setShowCategoryInfo(null)} className="absolute right-0 top-0 w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(245,239,227,0.15)' }}>
                <X size={14} style={{ color: palette.washi }} />
              </button>
            </div>
            <div className="relative pt-2">
              <p className="text-[10px] tracking-[0.3em]" style={{ color: palette.kin, fontFamily: '"Cormorant Garamond", serif' }}>{c.desc.toUpperCase()}</p>
              <h2 className="text-3xl mt-1 mb-3" style={{ fontFamily: '"Shippori Mincho", serif', color: palette.washi, fontWeight: 700, letterSpacing: '0.1em' }}>{c.jp}</h2>
              <p className="text-[12px] leading-relaxed" style={{ color: 'rgba(245,239,227,0.85)', fontFamily: '"Klee One", serif' }}>{c.longDesc}</p>
            </div>
          </div>

          <div className="p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[9px] tracking-[0.3em]" style={{ color: palette.shu, fontFamily: '"Cormorant Garamond", serif' }}>FAMOUS PLACES</p>
              <p className="text-[10px]" style={{ color: palette.sumiSoft, fontFamily: '"Klee One", serif' }}>共 {placesInCat.length} 處</p>
            </div>
            <div className="space-y-2">
              {placesInCat.map(p => (
                <button key={p.id} onClick={() => { setShowCategoryInfo(null); setTimeout(() => setSelected({ type: 'place', data: p }), 100); }} className="w-full flex items-center gap-3 p-2.5 rounded-lg text-left" style={{ backgroundColor: palette.washiDark }}>
                  <InkStamp kanji={p.kanji} color={p.category === '寺' || p.category === '院' ? palette.sumi : palette.shu} size={36} />
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] leading-tight truncate" style={{ fontFamily: '"Shippori Mincho", serif', color: palette.sumi, fontWeight: 700 }}>{p.name}</p>
                    <p className="text-[9px] mt-0.5 truncate" style={{ color: palette.sumiSoft, fontFamily: '"Klee One", serif' }}>{p.region} · {p.pref}</p>
                  </div>
                  <ChevronRight size={12} style={{ color: palette.sumiSoft }} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Add new entry modal
  const AddModal = () => {
    if (!showAddModal) return null;
    const draftPlace = draft.placeId ? PLACES.find(p => p.id === draft.placeId) : draft.customPlace;

    return (
      <div className="absolute inset-0 z-50 flex items-end" style={{ backgroundColor: 'rgba(26,20,16,0.5)', backdropFilter: 'blur(4px)' }} onClick={closeAddModal}>
        <div className="w-full rounded-t-3xl pb-8 max-h-[92%] overflow-y-auto relative" style={{ backgroundColor: palette.washi }} onClick={e => e.stopPropagation()}>
          <div className="relative">
            {/* Header */}
            <div className="sticky top-0 z-10 px-5 pt-4 pb-3 flex items-center justify-between" style={{ backgroundColor: palette.washi, borderBottom: `1px solid ${palette.washiDeep}` }}>
              <div className="flex items-center gap-2">
                {addStep === 2 && (
                  <button onClick={() => { setAddStep(1); setAddMode(null); }} className="w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: palette.washiDark }}>
                    <ChevronLeft size={14} style={{ color: palette.sumi }} />
                  </button>
                )}
                <div>
                  <p className="text-[8px] tracking-[0.3em]" style={{ color: palette.shu, fontFamily: '"Cormorant Garamond", serif' }}>STEP {addStep} / 2</p>
                  <h2 className="text-base leading-none mt-0.5" style={{ fontFamily: '"Shippori Mincho", serif', color: palette.sumi, fontWeight: 700 }}>新增御朱印</h2>
                </div>
              </div>
              <button onClick={closeAddModal} className="w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: palette.washiDark }}>
                <X size={14} style={{ color: palette.sumi }} />
              </button>
            </div>

            {addStep === 1 && (
              <div className="p-5 space-y-3">
                <p className="text-[12px] mb-2" style={{ color: palette.sumiSoft, fontFamily: '"Klee One", serif' }}>請選擇新增方式</p>
                <button onClick={() => { setAddMode('list'); setAddStep(2); }} className="w-full p-4 rounded-xl text-left flex items-start gap-3" style={{ backgroundColor: palette.washiDark, border: `1px solid ${palette.washiDeep}` }}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: palette.sumi }}>
                    <BookOpen size={16} style={{ color: palette.kin }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-[14px] leading-none" style={{ fontFamily: '"Shippori Mincho", serif', color: palette.sumi, fontWeight: 700 }}>從清單選擇</p>
                    <p className="text-[10px] mt-1.5 leading-relaxed" style={{ color: palette.sumiSoft, fontFamily: '"Klee One", serif' }}>從預先收錄的 {PLACES.length} 處主要寺社中選擇</p>
                  </div>
                  <ChevronRight size={14} style={{ color: palette.sumiSoft }} />
                </button>
                <button onClick={() => { setAddMode('custom'); setAddStep(2); setDraft({ ...draft, customPlace: { name: '', reading: '', category: '神社', region: '關東', pref: '', kanji: '', desc: '', founded: '' } }); }} className="w-full p-4 rounded-xl text-left flex items-start gap-3" style={{ backgroundColor: palette.washiDark, border: `1px solid ${palette.washiDeep}` }}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: palette.shu }}>
                    <Plus size={16} style={{ color: palette.washi }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-[14px] leading-none" style={{ fontFamily: '"Shippori Mincho", serif', color: palette.sumi, fontWeight: 700 }}>自行新增</p>
                    <p className="text-[10px] mt-1.5 leading-relaxed" style={{ color: palette.sumiSoft, fontFamily: '"Klee One", serif' }}>清單中沒有？手動輸入寺社資訊</p>
                  </div>
                  <ChevronRight size={14} style={{ color: palette.sumiSoft }} />
                </button>
              </div>
            )}

            {addStep === 2 && (
              <div className="p-5 space-y-4">
                {/* Place selector */}
                {addMode === 'list' && (
                  <div>
                    <p className="text-[9px] tracking-widest mb-2" style={{ color: palette.shu, fontFamily: '"Cormorant Garamond", serif' }}>SELECT PLACE</p>
                    {draftPlace ? (
                      <div className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: palette.washiDark, border: `1px solid ${palette.washiDeep}` }}>
                        <InkStamp kanji={draftPlace.kanji} color={draftPlace.category === '寺' || draftPlace.category === '院' ? palette.sumi : palette.shu} size={40} />
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] leading-tight" style={{ fontFamily: '"Shippori Mincho", serif', color: palette.sumi, fontWeight: 700 }}>{draftPlace.name}</p>
                          <p className="text-[10px] mt-0.5" style={{ color: palette.sumiSoft, fontFamily: '"Klee One", serif' }}>{draftPlace.category} · {draftPlace.region}</p>
                        </div>
                        <button onClick={() => setDraft({ ...draft, placeId: null })} className="text-[11px] px-2 py-1 rounded" style={{ color: palette.shuDark, fontFamily: '"Klee One", serif' }}>更換</button>
                      </div>
                    ) : (
                      <div className="space-y-2 max-h-64 overflow-y-auto rounded-xl p-1" style={{ backgroundColor: palette.washiDark }}>
                        {PLACES.map(p => (
                          <button key={p.id} onClick={() => setDraft({ ...draft, placeId: p.id })} className="w-full flex items-center gap-2 p-2 rounded-lg text-left hover:bg-white/30">
                            <span className="text-[10px] w-6 h-6 rounded flex items-center justify-center" style={{ backgroundColor: p.category === '寺' || p.category === '院' ? palette.sumi : palette.shu, color: palette.washi, fontFamily: '"Shippori Mincho", serif', fontWeight: 700 }}>{p.kanji}</span>
                            <div className="flex-1 min-w-0">
                              <p className="text-[12px] leading-tight truncate" style={{ fontFamily: '"Shippori Mincho", serif', color: palette.sumi, fontWeight: 600 }}>{p.name}</p>
                              <p className="text-[9px] truncate" style={{ color: palette.sumiSoft, fontFamily: '"Klee One", serif' }}>{p.category} · {p.pref}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Custom place form */}
                {addMode === 'custom' && draft.customPlace && (
                  <div className="space-y-3">
                    <p className="text-[9px] tracking-widest" style={{ color: palette.shu, fontFamily: '"Cormorant Garamond", serif' }}>CUSTOM PLACE</p>
                    <div>
                      <label className="text-[10px]" style={{ color: palette.sumiSoft, fontFamily: '"Klee One", serif' }}>寺社名稱</label>
                      <input value={draft.customPlace.name} onChange={e => setDraft({ ...draft, customPlace: { ...draft.customPlace, name: e.target.value, kanji: e.target.value.charAt(0) || '？' } })} placeholder="例：建長寺" className="w-full mt-1 px-3 py-2 rounded-lg text-[13px] outline-none" style={{ backgroundColor: palette.washiDark, color: palette.sumi, fontFamily: '"Shippori Mincho", serif' }} />
                    </div>
                    <div>
                      <label className="text-[10px]" style={{ color: palette.sumiSoft, fontFamily: '"Klee One", serif' }}>讀音（可選）</label>
                      <input value={draft.customPlace.reading} onChange={e => setDraft({ ...draft, customPlace: { ...draft.customPlace, reading: e.target.value } })} placeholder="例：けんちょうじ" className="w-full mt-1 px-3 py-2 rounded-lg text-[12px] outline-none" style={{ backgroundColor: palette.washiDark, color: palette.sumi, fontFamily: '"Klee One", serif' }} />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px]" style={{ color: palette.sumiSoft, fontFamily: '"Klee One", serif' }}>類別</label>
                        <select value={draft.customPlace.category} onChange={e => setDraft({ ...draft, customPlace: { ...draft.customPlace, category: e.target.value } })} className="w-full mt-1 px-3 py-2 rounded-lg text-[12px] outline-none" style={{ backgroundColor: palette.washiDark, color: palette.sumi, fontFamily: '"Shippori Mincho", serif' }}>
                          {CATEGORIES.slice(1).map(c => <option key={c.id} value={c.id}>{c.jp}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px]" style={{ color: palette.sumiSoft, fontFamily: '"Klee One", serif' }}>地區</label>
                        <select value={draft.customPlace.region} onChange={e => setDraft({ ...draft, customPlace: { ...draft.customPlace, region: e.target.value } })} className="w-full mt-1 px-3 py-2 rounded-lg text-[12px] outline-none" style={{ backgroundColor: palette.washiDark, color: palette.sumi, fontFamily: '"Shippori Mincho", serif' }}>
                          {REGIONS.slice(1).map(r => <option key={r.id} value={r.id}>{r.jp}</option>)}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px]" style={{ color: palette.sumiSoft, fontFamily: '"Klee One", serif' }}>所在地</label>
                      <input value={draft.customPlace.pref} onChange={e => setDraft({ ...draft, customPlace: { ...draft.customPlace, pref: e.target.value } })} placeholder="例：神奈川縣鎌倉市" className="w-full mt-1 px-3 py-2 rounded-lg text-[12px] outline-none" style={{ backgroundColor: palette.washiDark, color: palette.sumi, fontFamily: '"Klee One", serif' }} />
                    </div>
                  </div>
                )}

                {/* Photo upload */}
                <div>
                  <p className="text-[9px] tracking-widest mb-2" style={{ color: palette.shu, fontFamily: '"Cormorant Garamond", serif' }}>UPLOAD PHOTO</p>
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  {draft.photo ? (
                    <div className="relative rounded-xl overflow-hidden" style={{ border: `1px solid ${palette.washiDeep}` }}>
                      <img src={draft.photo} alt="goshuin" className="w-full aspect-[4/5] object-cover" />
                      <button onClick={() => setDraft({ ...draft, photo: null })} className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(26,20,16,0.7)', backdropFilter: 'blur(4px)' }}>
                        <X size={14} style={{ color: palette.washi }} />
                      </button>
                      <button onClick={() => fileInputRef.current?.click()} className="absolute bottom-2 right-2 px-3 py-1.5 rounded-full flex items-center gap-1" style={{ backgroundColor: 'rgba(26,20,16,0.7)', backdropFilter: 'blur(4px)' }}>
                        <Camera size={11} style={{ color: palette.washi }} />
                        <p className="text-[10px]" style={{ color: palette.washi, fontFamily: '"Klee One", serif' }}>更換</p>
                      </button>
                    </div>
                  ) : (
                    <button onClick={() => fileInputRef.current?.click()} className="w-full aspect-[4/5] rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-2" style={{ borderColor: palette.washiDeep, backgroundColor: 'rgba(255,255,255,0.4)' }}>
                      <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: palette.washiDark }}>
                        <Upload size={18} style={{ color: palette.shu }} strokeWidth={1.5} />
                      </div>
                      <p className="text-[12px]" style={{ fontFamily: '"Shippori Mincho", serif', color: palette.sumi, fontWeight: 600 }}>點擊上傳照片</p>
                      <p className="text-[9px]" style={{ color: palette.sumiSoft, fontFamily: '"Klee One", serif' }}>JPG · PNG · 建議直式</p>
                    </button>
                  )}
                </div>

                {/* Date */}
                <div>
                  <label className="text-[10px]" style={{ color: palette.sumiSoft, fontFamily: '"Klee One", serif' }}>參拜日期</label>
                  <input value={draft.date} onChange={e => setDraft({ ...draft, date: e.target.value })} placeholder="2025.05.06" className="w-full mt-1 px-3 py-2 rounded-lg text-[12px] outline-none" style={{ backgroundColor: palette.washiDark, color: palette.sumi, fontFamily: '"Klee One", serif' }} />
                </div>

                {/* Notes */}
                <div>
                  <label className="text-[10px]" style={{ color: palette.sumiSoft, fontFamily: '"Klee One", serif' }}>參拜筆記（可選）</label>
                  <textarea value={draft.notes} onChange={e => setDraft({ ...draft, notes: e.target.value })} placeholder="記錄當日的心情或感想…" rows={3} className="w-full mt-1 px-3 py-2 rounded-lg text-[12px] outline-none resize-none" style={{ backgroundColor: palette.washiDark, color: palette.sumi, fontFamily: '"Klee One", serif' }} />
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <button onClick={closeAddModal} className="flex-1 py-3 rounded-full" style={{ border: `1px solid ${palette.washiDeep}` }}>
                    <p className="text-[12px]" style={{ fontFamily: '"Klee One", serif', color: palette.sumiSoft }}>取消</p>
                  </button>
                  <button onClick={handleSave} disabled={!draft.placeId && !draft.customPlace?.name} className="flex-[2] py-3 rounded-full flex items-center justify-center gap-1" style={{
                    backgroundColor: (!draft.placeId && !draft.customPlace?.name) ? palette.washiDeep : palette.shu,
                    opacity: (!draft.placeId && !draft.customPlace?.name) ? 0.5 : 1
                  }}>
                    <Check size={13} style={{ color: palette.washi }} />
                    <p className="text-[12px]" style={{ fontFamily: '"Shippori Mincho", serif', color: palette.washi, fontWeight: 600 }}>儲存御朱印</p>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const tabs = [
    { id: 'home', icon: Home, jp: '首頁' },
    { id: 'collection', icon: BookOpen, jp: '朱印簿' },
    { id: 'discover', icon: Compass, jp: '探索' },
    { id: 'profile', icon: User, jp: '個人' },
  ];

  return (
    <div className="h-full w-full flex flex-col overflow-hidden relative" style={{ backgroundColor: palette.washi }}>
      {/* Main content area */}
      <div className="flex-1 relative overflow-hidden">
        {activeTab === 'home' && <HomeScreen />}
        {activeTab === 'collection' && <CollectionScreen />}
        {activeTab === 'discover' && <DiscoverScreen />}
        {activeTab === 'profile' && <ProfileScreen />}

        <DetailModal />
        <CategoryInfoModal />
        <AddModal />
      </div>

      {/* Bottom navigation */}
      <div className="relative z-40 flex-shrink-0" style={{
        backgroundColor: 'rgba(245,239,227,0.95)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: `1px solid ${palette.washiDeep}`,
        paddingTop: 6,
        paddingBottom: 'calc(env(safe-area-inset-bottom) + 6px)',
      }}>
        <div className="flex items-center justify-around px-3">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setSelected(null); setProfileView('main'); }}
                className="flex flex-col items-center gap-1 py-1 px-3 transition-all"
              >
                <div className="relative">
                  <Icon size={20} style={{ color: active ? palette.shu : palette.sumiSoft }} strokeWidth={active ? 2 : 1.5} />
                  {active && <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full" style={{ backgroundColor: palette.shu }} />}
                </div>
                <p className="text-[10px] leading-none" style={{
                  fontFamily: '"Shippori Mincho", serif',
                  color: active ? palette.sumi : palette.sumiSoft,
                  fontWeight: active ? 700 : 500
                }}>{tab.jp}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Inject Google Fonts and styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@400;500;600;700;800&family=Klee+One:wght@400;600&family=Cormorant+Garamond:wght@300;400;500;600;700&display=swap');
      `}</style>
    </div>
  );
}

// Mount the app
createRoot(document.getElementById('root')).render(<GoshuinApp />);
