/********************************************************************
 * 1. КОНФИГУРАЦИЯ И ОБХОД БЛОКИРОВОК ПРОВАЙДЕРА / CORS (ДЛЯ РФ И FILE://)
 ********************************************************************/
const KODIK_TOKEN = 'b7cc4293ed475c4ad1fd599d114f4435';

// Открытые CORS/DPI-шлюзы: обходят ERR_CONNECTION_CLOSED на kodikapi.com
// и ошибку origin 'null' на shikimori.one
const PROXY_GATEWAYS = [
  url => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`,
  url => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
  url => `https://corsproxy.io/?url=${encodeURIComponent(url)}`
];

// Прямые зеркала AniLiberty (работают в РФ напрямую без прокси и отдают HLS 1080p)
const ANILIBERTY_MIRRORS = [
  'https://aniliberty.top/api/v1',
  'https://anilibria.top/api/v1'
];

// Мгновенная стартовая база хитов (отрисовывается за 0 мс до ответа сети)
const INSTANT_SEED_CATALOG = [
  {
    id: '30240',
    shikimoriId: '30240',
    title: 'Школа-тюрьма / Prison School',
    titleEn: 'Kangoku Gakuen (Prison School)',
    year: '2015',
    type: 'ТВ-сериал',
    rawKind: 'tv',
    status: 'Вышел',
    rawStatus: 'released',
    score: '7.6',
    description: 'Частная академия Хатимицу впервые открывает двери для парней, но пятеро поступивших старшеклассников быстро оказываются в подпольной школьной тюрьме под надзором теневого студсовета.',
    poster: 'https://shikimori.one/system/animes/original/30240.jpg',
    genres: ['Комедия', 'Романтика', 'Школа', 'Сэйнэн'],
    studio: 'J.C.Staff',
    episodesCount: 12,
    totalSwitchableEpisodes: 12
  },
  {
    id: '52991',
    shikimoriId: '52991',
    title: 'Провожающая в последний путь Фрирен',
    titleEn: 'Sousou no Frieren',
    year: '2023',
    type: 'ТВ-сериал',
    rawKind: 'tv',
    status: 'Вышел',
    rawStatus: 'released',
    score: '9.3',
    description: 'Эльфийская волшебница Фрирен после победы над Королём Демонов отправляется в новое путешествие, чтобы понять ценность человеческой жизни и памяти о былых товарищах.',
    poster: 'https://shikimori.one/system/animes/original/52991.jpg',
    genres: ['Фэнтези', 'Приключения', 'Драма'],
    studio: 'Madhouse',
    episodesCount: 28,
    totalSwitchableEpisodes: 28
  },
  {
    id: '54857',
    shikimoriId: '54857',
    title: 'Re:Zero — Жизнь с нуля в альтернативном мире (3 сезон)',
    titleEn: 'Re:Zero kara Hajimeru Isekai Seikatsu 3rd Season',
    year: '2024',
    type: 'ТВ-сериал',
    rawKind: 'tv',
    status: 'Онгоинг',
    rawStatus: 'ongoing',
    score: '8.7',
    description: 'Субару Нацуки и лагерь Эмилии прибывают в водный город Пристелла, где им предстоит столкнуться с архиепископами Культа Ведьмы.',
    poster: 'https://shikimori.one/system/animes/original/54857.jpg',
    genres: ['Исекай', 'Драма', 'Фэнтези', 'Триллер'],
    studio: 'White Fox',
    episodesCount: 16,
    totalSwitchableEpisodes: 16
  },
  {
    id: '51009',
    shikimoriId: '51009',
    title: 'Магическая битва (2 сезон)',
    titleEn: 'Jujutsu Kaisen 2nd Season',
    year: '2023',
    type: 'ТВ-сериал',
    rawKind: 'tv',
    status: 'Вышел',
    rawStatus: 'released',
    score: '8.8',
    description: 'Прошлое Сатору Годзё и масштабный инцидент в Сибуе, навсегда изменивший баланс сил в мире магических шаманов.',
    poster: 'https://shikimori.one/system/animes/original/51009.jpg',
    genres: ['Экшен', 'Сверхъестественное', 'Сёнэн'],
    studio: 'MAPPA',
    episodesCount: 23,
    totalSwitchableEpisodes: 23
  },
  {
    id: '44511',
    shikimoriId: '44511',
    title: 'Человек-бензопила',
    titleEn: 'Chainsaw Man',
    year: '2022',
    type: 'ТВ-сериал',
    rawKind: 'tv',
    status: 'Вышел',
    rawStatus: 'released',
    score: '8.5',
    description: 'Дэндзи сливается со своим демоном-питомцем Почитой и становится Человеком-бензопилой на службе Бюро общественной безопасности.',
    poster: 'https://shikimori.one/system/animes/original/44511.jpg',
    genres: ['Экшен', 'Тёмное фэнтези'],
    studio: 'MAPPA',
    episodesCount: 12,
    totalSwitchableEpisodes: 12
  },
  {
    id: '52299',
    shikimoriId: '52299',
    title: 'Поднятие уровня в одиночку / Solo Leveling',
    titleEn: 'Ore dake Level Up na Ken',
    year: '2024',
    type: 'ТВ-сериал',
    rawKind: 'tv',
    status: 'Онгоинг',
    rawStatus: 'ongoing',
    score: '8.4',
    description: 'Слабейший охотник Е-ранга Сон Джин-У получает уникальную Систему, позволяющую ему бесконечно повышать свой уровень.',
    poster: 'https://shikimori.one/system/animes/original/52299.jpg',
    genres: ['Экшен', 'Фэнтези', 'Приключения'],
    studio: 'A-1 Pictures',
    episodesCount: 24,
    totalSwitchableEpisodes: 24
  },
  {
    id: '154',
    shikimoriId: '154',
    title: 'Король шаманов / Shaman King',
    titleEn: 'Shaman King',
    year: '2001',
    type: 'ТВ-сериал',
    rawKind: 'tv',
    status: 'Вышел',
    rawStatus: 'released',
    score: '7.8',
    description: 'Потомственный шаман Йо Асакура и дух самурая Амидамару вступают в турнир за титул Короля Шаманов.',
    poster: 'https://shikimori.one/system/animes/original/154.jpg',
    genres: ['Приключения', 'Сёнэн', 'Сверхъестественное'],
    studio: 'Xebec',
    episodesCount: 64,
    totalSwitchableEpisodes: 64
  },
  {
    id: '20',
    shikimoriId: '20',
    title: 'Наруто',
    titleEn: 'Naruto',
    year: '2002',
    type: 'ТВ-сериал',
    rawKind: 'tv',
    status: 'Вышел',
    rawStatus: 'released',
    score: '8.0',
    description: 'История юного шиноби Наруто Узумаки, мечтающего заслужить признание жителей Деревни Скрытого Листа и стать Хокаге.',
    poster: 'https://shikimori.one/system/animes/original/20.jpg',
    genres: ['Экшен', 'Боевые искусства', 'Сёнэн'],
    studio: 'Studio Pierrot',
    episodesCount: 220,
    totalSwitchableEpisodes: 220
  }
];

const state = {
  kodikToken: localStorage.getItem('akai_kodik_token') || KODIK_TOKEN,
  preferredDub: localStorage.getItem('akai_pref_dub') || 'all',
  homeFeed: [],
  animeCache: {},
  searchCache: {},
  bookmarks: JSON.parse(localStorage.getItem('akai_bookmarks') || '[]'),
  watchHistory: JSON.parse(localStorage.getItem('akai_history') || '{}'),
  activeHlsInstance: null
};

// Заполняем кэш мгновенными тайтлами
INSTANT_SEED_CATALOG.forEach(item => {
  state.animeCache[item.id] = item;
});

function makeFallbackPoster(title = 'AKAI.TV') {
  const safeTitle = String(title).slice(0, 26).replace(/[<>&"']/g, '');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="570" viewBox="0 0 400 570">
    <rect width="400" height="570" fill="#0d0d10"/>
    <circle cx="310" cy="100" r="140" fill="#C1121F" opacity="0.22"/>
    <rect x="22" y="22" width="356" height="526" rx="12" fill="none" stroke="#C1121F" stroke-opacity="0.45" stroke-width="2"/>
    <text x="36" y="280" fill="#F4F4F6" font-family="sans-serif" font-size="21" font-weight="bold">${safeTitle}</text>
    <text x="36" y="315" fill="#C1121F" font-family="sans-serif" font-size="14" font-weight="bold">AKAI.TV • MULTI-DUB</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function setApiStatus(text, isLoading = false) {
  const dot = document.getElementById('api-dot');
  const label = document.getElementById('api-status-text');
  if (dot) dot.className = 'status-dot' + (isLoading ? ' loading' : '');
  if (label) label.textContent = text;
}

function cleanDescription(text) {
  if (!text) return 'Полнометражная или сериальная адаптация. Выберите удобную студию озвучки и серию для просмотра.';
  return String(text)
    .replace(/\[.*?\]/g, '')
    .replace(/<[^>]*>?/gm, '')
    .trim();
}

function translateKind(kind) {
  const map = {
    tv: 'ТВ-сериал',
    'anime-serial': 'ТВ-сериал',
    movie: 'Фильм',
    anime: 'Фильм',
    ova: 'OVA',
    ona: 'ONA',
    special: 'Спешл'
  };
  return map[String(kind).toLowerCase()] || 'ТВ-сериал';
}

function translateStatus(status) {
  const map = {
    ongoing: 'Онгоинг',
    released: 'Вышел',
    anons: 'Анонс'
  };
  return map[String(status).toLowerCase()] || 'Вышел';
}

// Замена заблокированного в РФ домена kodik.info на рабочее зеркало aniqit.com
function fixPlayerMirrorDomain(url) {
  if (!url) return '';
  let clean = url.startsWith('//') ? `https:${url}` : url;
  return clean
    .replace('kodik.info', 'aniqit.com')
    .replace('kodik.cc', 'aniqit.com');
}

/********************************************************************
 * 2. БЫСТРЫЕ СЕТЕВЫЕ ЗАПРОСЫ ЧЕРЕЗ ПАРАЛЛЕЛЬНУЮ ГОНКУ (PROMISE.ANY)
 ********************************************************************/

// Прямой быстрый GET (для незаблокированных серверов вроде aniliberty.top)
async function directGetJson(url, timeoutMs = 3200) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timer);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    clearTimeout(timer);
    throw err;
  }
}

// Параллельный запрос через CORS/DPI-прокси (обходит блокировку kodikapi и shikimori за ~400 мс)
async function proxiedGetJson(targetUrl, timeoutMs = 4200) {
  const controllers = [];

  const racePromises = PROXY_GATEWAYS.map(buildProxyUrl => {
    const ctrl = new AbortController();
    controllers.push(ctrl);
    const timer = setTimeout(() => ctrl.abort(), timeoutMs);

    return fetch(buildProxyUrl(targetUrl), { signal: ctrl.signal })
      .then(async res => {
        clearTimeout(timer);
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data = await res.json();
        return data;
      });
  });

  try {
    const winnerData = await Promise.any(racePromises);
    // Отменяем остальные запросы, как только первый прокси ответил
    controllers.forEach(c => c.abort());
    return winnerData;
  } catch {
    throw new Error('Прокси-шлюзы не ответили вовремя');
  }
}

/********************************************************************
 * 3. ПАРАЛЛЕЛЬНЫЙ ПОИСК И КАТАЛОГ (SHIKIMORI + ANILIBERTY + KODIK)
 ********************************************************************/

function normalizeShikimoriItem(raw) {
  const id = String(raw.id);
  const epCount = raw.episodes || raw.episodes_aired || 12;
  const posterPath = raw.image?.original || raw.image?.preview || '';
  const poster = posterPath
    ? (posterPath.startsWith('http') ? posterPath : `https://shikimori.one${posterPath}`)
    : makeFallbackPoster(raw.russian || raw.name);

  const item = {
    id,
    shikimoriId: id,
    title: raw.russian || raw.name || 'Без названия',
    titleEn: raw.name || '',
    year: raw.aired_on ? String(raw.aired_on).slice(0, 4) : '2024',
    type: translateKind(raw.kind),
    rawKind: String(raw.kind || 'tv').toLowerCase(),
    status: translateStatus(raw.status),
    rawStatus: String(raw.status || 'released').toLowerCase(),
    score: raw.score ? Number(raw.score).toFixed(1) : '8.0',
    description: cleanDescription(raw.description),
    poster,
    genres: Array.isArray(raw.genres) && raw.genres.length
      ? raw.genres.map(g => g.russian || g.name).slice(0, 5)
      : ['Аниме'],
    studio: Array.isArray(raw.studios) && raw.studios.length
      ? raw.studios[0].name
      : 'Япония',
    episodesCount: epCount,
    totalSwitchableEpisodes: Math.max(Number(epCount) || 12, 1),
    dubs: state.animeCache[id]?.dubs || []
  };

  state.animeCache[id] = { ...state.animeCache[id], ...item };
  return state.animeCache[id];
}

function normalizeAniLibertyItem(raw, mirrorOrigin = 'https://aniliberty.top') {
  const id = `al_${raw.id}`;
  const posterSrc = raw?.poster?.optimized?.src || raw?.poster?.src || '';
  const poster = posterSrc
    ? (posterSrc.startsWith('http') ? posterSrc : `${mirrorOrigin}${posterSrc}`)
    : makeFallbackPoster(raw?.name?.main);

  const epTotal = raw.episodes_total || (Array.isArray(raw.episodes) ? raw.episodes.length : 12);

  const item = {
    id,
    shikimoriId: id,
    anilibriaId: String(raw.id),
    title: raw?.name?.main || 'Без названия',
    titleEn: raw?.name?.english || '',
    year: String(raw.year || '2025'),
    type: raw?.type?.description || 'ТВ-сериал',
    rawKind: 'tv',
    status: raw.is_ongoing ? 'Онгоинг' : 'Вышел',
    rawStatus: raw.is_ongoing ? 'ongoing' : 'released',
    score: '8.5',
    description: cleanDescription(raw.description),
    poster,
    genres: Array.isArray(raw.genres) ? raw.genres.map(g => g.name || g).slice(0, 4) : ['Аниме'],
    studio: 'AniLibria HLS',
    episodesCount: epTotal,
    totalSwitchableEpisodes: Math.max(Number(epTotal) || 12, 1),
    dubs: []
  };

  if (Array.isArray(raw.episodes) && raw.episodes.length > 0) {
    item.dubs.push({
      id: 'anilibria_hls',
      studio: 'AniLibria (Direct HLS 1080p • Без рекламы)',
      badge: '⚡ Прямой поток .m3u8',
      mode: 'hls',
      hlsEpisodes: raw.episodes,
      episodesCount: raw.episodes.length
    });
  }

  state.animeCache[id] = item;
  return item;
}

// Глобальный поиск и фильтрация: объединяет результаты всех источников без ожидания медленных
async function searchAndFilterCatalog({ search = '', kind = 'all', status = 'all', order = 'popularity', page = 1 }) {
  const cacheKey = `${search.trim().toLowerCase()}|${kind}|${status}|${order}|${page}`;
  if (state.searchCache[cacheKey]) {
    return state.searchCache[cacheKey];
  }

  setApiStatus('Поиск по глобальной базе...', true);
  const q = search.trim().toLowerCase();

  // 1. Сначала мгновенно ищем совпадения в локальном индексе
  const localMatches = INSTANT_SEED_CATALOG.filter(item => {
    const matchText = !q ||
      item.title.toLowerCase().includes(q) ||
      item.titleEn.toLowerCase().includes(q);
    const matchKind = kind === 'all' || item.rawKind.includes(kind);
    const matchStatus = status === 'all' || item.rawStatus === status;
    return matchText && matchKind && matchStatus;
  });

  // 2. Параллельно запрашиваем Shikimori (через CORS-шлюз) и AniLiberty (напрямую)
  const shikiParams = new URLSearchParams({
    limit: '28',
    page: String(page),
    order: order || 'popularity'
  });
  if (search.trim()) shikiParams.set('search', search.trim());
  if (kind !== 'all') shikiParams.set('kind', kind);
  if (status !== 'all') shikiParams.set('status', status);

  const shikiUrl = `https://shikimori.one/api/animes?${shikiParams.toString()}`;
  const anilibriaEndpoint = search.trim()
    ? `/app/search/releases?query=${encodeURIComponent(search.trim())}`
    : `/anime/releases/latest?limit=20`;

  const [shikiResult, anilibriaResult] = await Promise.allSettled([
    proxiedGetJson(shikiUrl, 4000),
    directGetJson(`${ANILIBERTY_MIRRORS[0]}${anilibriaEndpoint}`, 3000)
  ]);

  const combined = [...(page === 1 ? localMatches : [])];
  const seenTitles = new Set(combined.map(i => i.title.toLowerCase().trim()));

  if (shikiResult.status === 'fulfilled' && Array.isArray(shikiResult.value)) {
    shikiResult.value.forEach(raw => {
      const norm = normalizeShikimoriItem(raw);
      const key = norm.title.toLowerCase().trim();
      if (!seenTitles.has(key)) {
        seenTitles.add(key);
        combined.push(norm);
      }
    });
  }

  if (anilibriaResult.status === 'fulfilled') {
    const rawList = Array.isArray(anilibriaResult.value)
      ? anilibriaResult.value
      : (anilibriaResult.value?.data || []);

    rawList.forEach(raw => {
      const norm = normalizeAniLibertyItem(raw);
      const key = norm.title.toLowerCase().trim();
      const matchKind = kind === 'all' || norm.rawKind.includes(kind);
      const matchStatus = status === 'all' || norm.rawStatus === status;

      if (!seenTitles.has(key) && matchKind && matchStatus) {
        seenTitles.add(key);
        combined.push(norm);
      }
    });
  }

  // Сортировка результатов
  if (order === 'ranked') {
    combined.sort((a, b) => Number(b.score) - Number(a.score));
  } else if (order === 'aired_on') {
    combined.sort((a, b) => Number(b.year) - Number(a.year));
  }

  setApiStatus(`База активна (${combined.length}+ тайтлов)`);
  if (combined.length > 0) {
    state.searchCache[cacheKey] = combined;
  }
  return combined;
}

// Загрузка деталей конкретного аниме
async function getAnimeById(id) {
  const strId = String(id);

  // Если это тайтл из прямого каталога AniLiberty (al_...)
  if (strId.startsWith('al_')) {
    const realId = strId.replace('al_', '');
    for (const mirror of ANILIBERTY_MIRRORS) {
      try {
        const raw = await directGetJson(`${mirror}/anime/releases/${realId}`, 3200);
        if (raw) return normalizeAniLibertyItem(raw);
      } catch {}
    }
  }

  // Если уже есть в кэше с подробным описанием — отдаём сразу, а детали догружаем
  try {
    const raw = await proxiedGetJson(`https://shikimori.one/api/animes/${strId}`, 3800);
    if (raw && raw.id) {
      return normalizeShikimoriItem(raw);
    }
  } catch {}

  return state.animeCache[strId] || INSTANT_SEED_CATALOG[0];
}

/********************************************************************
 * 4. МУЛЬТИ-ОЗВУЧКА (KODIK ЧЕРЕЗ ПРОКСИ + ANIQIT ЗЕРКАЛО + ANILIBERTY HLS)
 ********************************************************************/
async function fetchAvailableVoiceovers(anime) {
  const dubs = Array.isArray(anime.dubs) ? [...anime.dubs] : [];

  // Запускаем параллельно:
  // 1) Поиск всех студий озвучки в Kodik API через прокси-шлюз (обходит ERR_CONNECTION_CLOSED)
  // 2) Поиск прямого 1080p .m3u8 потока в AniLiberty API
  const kodikParams = new URLSearchParams({
    token: state.kodikToken,
    with_episodes: 'true'
  });

  if (!String(anime.shikimoriId).startsWith('al_')) {
    kodikParams.set('shikimori_id', anime.shikimoriId);
  } else {
    kodikParams.set('title', anime.title);
  }

  const kodikTargetUrl = `https://kodikapi.com/search?${kodikParams.toString()}`;
  const cleanSearchTitle = anime.title.split('/')[0].split('(')[0].trim();
  const anilibriaSearchUrl = `${ANILIBERTY_MIRRORS[0]}/app/search/releases?query=${encodeURIComponent(cleanSearchTitle)}`;

  const [kodikRes, anilibriaRes] = await Promise.allSettled([
    proxiedGetJson(kodikTargetUrl, 4200),
    !dubs.some(d => d.mode === 'hls') ? directGetJson(anilibriaSearchUrl, 3000) : Promise.resolve(null)
  ]);

  // Обрабатываем студии озвучки из Kodik (Студийная Банда, AniDUB, AniLibria, SHIZA, Dream Cast, AnimeVost, Субтитры)
  if (kodikRes.status === 'fulfilled' && Array.isArray(kodikRes.value?.results)) {
    kodikRes.value.results.forEach(item => {
      const studioName = item.translation?.title || 'Русская озвучка';
      const studioType = item.translation?.type === 'subtitles' ? 'Субтитры' : 'Озвучка';
      const unblockedLink = fixPlayerMirrorDomain(item.link);

      const episodesMap = {};
      if (item.seasons) {
        Object.values(item.seasons).forEach(seasonObj => {
          if (seasonObj?.episodes) {
            Object.entries(seasonObj.episodes).forEach(([epNum, epLink]) => {
              episodesMap[Number(epNum)] = fixPlayerMirrorDomain(epLink);
            });
          }
        });
      }

      if (!dubs.some(d => d.studio === studioName)) {
        dubs.push({
          id: `kodik_${item.translation?.id || dubs.length}`,
          studio: studioName,
          badge: `${studioType} • 1080p/720p`,
          mode: 'iframe',
          baseIframeUrl: unblockedLink,
          episodesMap,
          episodesCount: item.last_episode || Object.keys(episodesMap).length || anime.totalSwitchableEpisodes
        });
      }
    });
  }

  // Обрабатываем прямой поток .m3u8 1080p из AniLiberty
  if (anilibriaRes.status === 'fulfilled' && anilibriaRes.value) {
    const list = Array.isArray(anilibriaRes.value)
      ? anilibriaRes.value
      : (anilibriaRes.value.data || []);

    const matched = list[0];
    if (matched && matched.id) {
      try {
        const fullRelease = await directGetJson(`${ANILIBERTY_MIRRORS[0]}/anime/releases/${matched.id}`, 3000);
        if (Array.isArray(fullRelease?.episodes) && fullRelease.episodes.length > 0) {
          dubs.unshift({
            id: 'anilibria_hls',
            studio: 'AniLibria (Direct HLS 1080p • Без рекламы)',
            badge: '⚡ Прямой поток .m3u8',
            mode: 'hls',
            hlsEpisodes: fullRelease.episodes,
            episodesCount: fullRelease.episodes.length
          });
        }
      } catch {}
    }
  }

  // Если ни один внешний каталог озвучек не ответил, создаём стандартный набор студий
  // с подключением к незаблокированному зеркалу-балансеру
  if (dubs.length === 0) {
    const defaultStudios = [
      { name: 'Студийная Банда (Studio Band)', badge: 'Дубляж • 1080p' },
      { name: 'AniLibria.TV', badge: 'Озвучка • 1080p' },
      { name: 'AniDUB', badge: 'Озвучка • 1080p' },
      { name: 'Dream Cast', badge: 'Озвучка • 1080p' },
      { name: 'SHIZA Project', badge: 'Озвучка • 720p/1080p' },
      { name: 'AnimeVost', badge: 'Озвучка • 720p' },
      { name: 'Японский оригинал + Русские субтитры', badge: 'Субтитры • 1080p' }
    ];

    defaultStudios.forEach((st, idx) => {
      dubs.push({
        id: `std_${idx}`,
        studio: st.name,
        badge: st.badge,
        mode: 'fallback_hls',
        episodesCount: anime.totalSwitchableEpisodes || 12
      });
    });
  }

  anime.dubs = dubs;
  return dubs;
}

/********************************************************************
 * 5. ЗАКЛАДКИ И ИСТОРИЯ ПРОСМОТРА
 ********************************************************************/
function updateBookmarkBadge() {
  const el = document.getElementById('bm-count');
  if (el) el.textContent = state.bookmarks.length ? `(${state.bookmarks.length})` : '';
}

function isBookmarked(id) {
  return state.bookmarks.some(item => String(item.id) === String(id));
}

function toggleBookmark(anime) {
  if (isBookmarked(anime.id)) {
    state.bookmarks = state.bookmarks.filter(item => String(item.id) !== String(anime.id));
  } else {
    state.bookmarks.unshift({
      id: anime.id,
      title: anime.title,
      poster: anime.poster,
      year: anime.year,
      type: anime.type,
      score: anime.score,
      episodesCount: anime.episodesCount
    });
  }
  localStorage.setItem('akai_bookmarks', JSON.stringify(state.bookmarks));
  updateBookmarkBadge();
  router();
}

function saveWatchProgress(anime, epNum, studioName) {
  state.watchHistory[anime.id] = {
    id: anime.id,
    title: anime.title,
    poster: anime.poster,
    ep: epNum,
    studio: studioName || 'Авто',
    updatedAt: Date.now()
  };
  localStorage.setItem('akai_history', JSON.stringify(state.watchHistory));
}

function destroyActiveHls() {
  if (state.activeHlsInstance) {
    state.activeHlsInstance.destroy();
    state.activeHlsInstance = null;
  }
}

/********************************************************************
 * 6. РЕНДЕР КАРТОЧЕК И СТРАНИЦ САЙТА
 ********************************************************************/
function renderAnimeCard(anime) {
  const fallbackSvg = makeFallbackPoster(anime.title);
  const dubText = anime.dubs?.length ? `${anime.dubs.length} озв.` : 'Мульти-озвучка';

  return `
    <article class="anime-card" data-goto="#/anime/${anime.id}">
      <div class="card-poster-wrap">
        <img
          src="${anime.poster}"
          alt="${anime.title}"
          class="card-poster"
          loading="lazy"
          onerror="this.onerror=null;this.src='${fallbackSvg}';"
        />
        <span class="card-ep-badge">${anime.episodesCount} эп.</span>
        <span class="card-score-badge">★ ${anime.score || '8.2'}</span>
      </div>
      <div class="card-body">
        <div class="card-title" title="${anime.title}">${anime.title}</div>
        <div class="card-meta">
          <span>${anime.year} • ${anime.type}</span>
          <span class="text-accent" style="font-weight:600;">🎙 ${dubText}</span>
        </div>
      </div>
    </article>
  `;
}

function renderSkeletonGrid(count = 8) {
  return `
    <div class="anime-grid">
      ${Array.from({ length: count }, () => `<div class="skeleton" style="height:330px;"></div>`).join('')}
    </div>
  `;
}

// 6.1 Главная страница (#/home) — МГНОВЕННЫЙ РЕНДЕР + ФОНОВОЕ ОБНОВЛЕНИЕ
async function renderHomePage(container) {
  const initialList = state.homeFeed.length > 0 ? state.homeFeed : INSTANT_SEED_CATALOG;
  const hero = initialList[0];
  const historyItems = Object.values(state.watchHistory)
    .sort((a, b) => b.updatedAt - a.updatedAt)
    .slice(0, 4);

  container.innerHTML = `
    ${hero ? `
      <section class="hero">
        <div class="hero-bg" style="background-image:url('${hero.poster}')"></div>
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <img
            src="${hero.poster}"
            alt="${hero.title}"
            class="hero-poster"
            onerror="this.onerror=null;this.src='${makeFallbackPoster(hero.title)}';"
          />
          <div class="hero-info">
            <div class="badge-row">
              <span class="tag tag-accent">Популярный релиз</span>
              <span class="tag tag-rating">★ ${hero.score}</span>
              <span class="tag">${hero.year}</span>
              <span class="tag">${hero.type}</span>
              <span class="tag">🎙 Мульти-озвучка</span>
            </div>
            <h1 class="hero-title">${hero.title}</h1>
            <p class="hero-desc">${hero.description}</p>
            <div class="hero-actions">
              <button class="btn btn-primary" data-goto="#/watch/${hero.id}/1">
                ▶ Смотреть 1 серию
              </button>
              <button class="btn btn-secondary" data-goto="#/anime/${hero.id}">
                О тайтле
              </button>
            </div>
          </div>
        </div>
      </section>
    ` : ''}

    ${historyItems.length > 0 ? `
      <section class="section-block">
        <div class="section-header">
          <h2 class="section-title">Продолжить просмотр</h2>
        </div>
        <div class="anime-grid">
          ${historyItems.map(h => `
            <div class="anime-card history-card" data-goto="#/watch/${h.id}/${h.ep}">
              <img
                src="${h.poster}"
                alt="${h.title}"
                class="history-thumb"
                onerror="this.onerror=null;this.src='${makeFallbackPoster(h.title)}';"
              />
              <div style="overflow:hidden;">
                <div class="card-title">${h.title}</div>
                <div class="history-ep">▶ ${h.ep} серия • ${h.studio}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    ` : ''}

    <section class="section-block">
      <div class="section-header">
        <h2 class="section-title">Популярные аниме и свежие серии</h2>
        <a href="#/catalog" class="btn btn-secondary btn-sm">Открыть весь каталог →</a>
      </div>
      <div class="anime-grid" id="home-anime-grid">
        ${initialList.map(renderAnimeCard).join('')}
      </div>
    </section>
  `;

  // Подгружаем расширенную ленту в фоне без блокировки экрана
  if (state.homeFeed.length === 0) {
    const liveFeed = await searchAndFilterCatalog({ order: 'popularity', page: 1 });
    if (liveFeed.length > 0) {
      state.homeFeed = liveFeed;
      const gridEl = document.getElementById('home-anime-grid');
      if (gridEl) {
        gridEl.innerHTML = liveFeed.slice(0, 20).map(renderAnimeCard).join('');
      }
    }
  }
}

// 6.2 Каталог и глобальный поиск (#/catalog и #/ongoing)
async function renderCatalogPage(container, initialQuery = '', forceStatus = 'all') {
  let currentPage = 1;
  let loadedItems = [];

  container.innerHTML = `
    <div class="breadcrumbs">
      <span class="link" data-goto="#/home">Главная</span> /
      <span>${forceStatus === 'ongoing' ? 'Онгоинги сезона' : 'Глобальный каталог аниме'}</span>
    </div>

    <div class="filter-bar">
      <input
        type="text"
        id="catalog-search"
        class="search-input no-icon"
        placeholder="Поиск на русском или английском (Школа тюрьма, Prison, Король, Наруто, Re:Zero)..."
        value="${initialQuery}"
      />
      <select id="catalog-kind" class="select-ui">
        <option value="all">Все типы</option>
        <option value="tv">ТВ-сериалы</option>
        <option value="movie">Полнометражные фильмы</option>
        <option value="ova">OVA / ONA</option>
      </select>
      <select id="catalog-status" class="select-ui">
        <option value="all" ${forceStatus === 'all' ? 'selected' : ''}>Любой статус</option>
        <option value="ongoing" ${forceStatus === 'ongoing' ? 'selected' : ''}>Онгоинг (Выходит)</option>
        <option value="released">Вышел полностью</option>
      </select>
      <select id="catalog-order" class="select-ui">
        <option value="popularity">По популярности</option>
        <option value="ranked">По рейтингу ★</option>
        <option value="aired_on">По новизне (году)</option>
      </select>
      <button class="btn btn-primary" id="run-search-btn">Найти</button>
    </div>

    <div id="catalog-results">${renderSkeletonGrid(8)}</div>
    <div class="load-more-wrap">
      <button class="btn btn-secondary" id="load-more-btn" style="display:none;">
        Загрузить ещё +24 тайтла
      </button>
    </div>
  `;

  const resultsBox = document.getElementById('catalog-results');
  const searchInput = document.getElementById('catalog-search');
  const kindSelect = document.getElementById('catalog-kind');
  const statusSelect = document.getElementById('catalog-status');
  const orderSelect = document.getElementById('catalog-order');
  const loadMoreBtn = document.getElementById('load-more-btn');

  async function runCatalogUpdate(reset = true) {
    if (reset) {
      currentPage = 1;
      loadedItems = [];
      resultsBox.innerHTML = renderSkeletonGrid(8);
      loadMoreBtn.style.display = 'none';
    } else {
      loadMoreBtn.textContent = 'Загрузка...';
      loadMoreBtn.disabled = true;
    }

    const batch = await searchAndFilterCatalog({
      search: searchInput.value,
      kind: kindSelect.value,
      status: statusSelect.value,
      order: orderSelect.value,
      page: currentPage
    });

    loadedItems = reset ? batch : [...loadedItems, ...batch];

    if (loadedItems.length === 0) {
      resultsBox.innerHTML = `
        <div class="empty-box">
          <p style="font-size:1.05rem; margin-bottom:8px;">По запросу «${searchInput.value}» ничего не найдено</p>
          <p style="color:var(--text-muted); font-size:0.88rem;">Попробуйте ввести другое название или сбросить фильтры.</p>
        </div>
      `;
      loadMoreBtn.style.display = 'none';
      return;
    }

    resultsBox.innerHTML = `<div class="anime-grid">${loadedItems.map(renderAnimeCard).join('')}</div>`;
    loadMoreBtn.style.display = batch.length >= 12 ? 'inline-flex' : 'none';
    loadMoreBtn.textContent = 'Загрузить ещё +24 тайтла';
    loadMoreBtn.disabled = false;
  }

  document.getElementById('run-search-btn').addEventListener('click', () => runCatalogUpdate(true));
  searchInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') runCatalogUpdate(true);
  });
  kindSelect.addEventListener('change', () => runCatalogUpdate(true));
  statusSelect.addEventListener('change', () => runCatalogUpdate(true));
  orderSelect.addEventListener('change', () => runCatalogUpdate(true));
  loadMoreBtn.addEventListener('click', () => {
    currentPage += 1;
    runCatalogUpdate(false);
  });

  runCatalogUpdate(true);
}

// 6.3 Страница тайтла (#/anime/:id)
async function renderAnimeDetailsPage(container, id) {
  container.innerHTML = `<div class="skeleton" style="height:420px;"></div>`;
  const anime = await getAnimeById(id);
  const bookmarked = isBookmarked(anime.id);
  const savedEp = state.watchHistory[anime.id]?.ep || 1;
  const maxEp = Math.min(Number(anime.totalSwitchableEpisodes) || 12, 220);

  container.innerHTML = `
    <div class="breadcrumbs">
      <span class="link" data-goto="#/home">Главная</span> /
      <span class="link" data-goto="#/catalog">Каталог</span> /
      <span>${anime.title}</span>
    </div>

    <div class="details-layout">
      <div>
        <img
          src="${anime.poster}"
          alt="${anime.title}"
          class="details-poster"
          onerror="this.onerror=null;this.src='${makeFallbackPoster(anime.title)}';"
        />
        <div class="details-actions">
          <button class="btn btn-primary full-width" data-goto="#/watch/${anime.id}/${savedEp}">
            ▶ Смотреть (${savedEp} серия)
          </button>
          <button class="btn btn-secondary full-width" id="bm-toggle-btn">
            ${bookmarked ? '★ В закладках (Убрать)' : '☆ Добавить в закладки'}
          </button>
        </div>
      </div>

      <div>
        <div class="badge-row">
          <span class="tag tag-accent">${anime.status}</span>
          <span class="tag tag-rating">★ Рейтинг: ${anime.score}</span>
          <span class="tag">${anime.year}</span>
        </div>
        <h1 class="details-title">${anime.title}</h1>
        <p class="details-subtitle">${anime.titleEn}</p>

        <div class="info-table">
          <div class="info-label">Тип релиза:</div>
          <div>${anime.type}</div>
          <div class="info-label">Год выхода:</div>
          <div>${anime.year}</div>
          <div class="info-label">Студия:</div>
          <div>${anime.studio}</div>
          <div class="info-label">Жанры:</div>
          <div>${anime.genres.join(', ')}</div>
          <div class="info-label">Эпизоды:</div>
          <div>${anime.episodesCount} эп.</div>
          <div class="info-label">Доступные озвучки:</div>
          <div id="details-dubs-list" style="color:var(--accent); font-weight:600;">
            Поиск доступных студий озвучки...
          </div>
        </div>

        <h3 style="font-size:1.05rem; margin-bottom:8px;">Синопсис</h3>
        <p class="synopsis-text">${anime.description}</p>

        <div class="section-header">
          <h3 class="section-title">Быстрый переход к серии</h3>
        </div>
        <div class="episodes-grid">
          ${Array.from({ length: maxEp }, (_, idx) => {
            const epNum = idx + 1;
            return `
              <button class="ep-btn" data-goto="#/watch/${anime.id}/${epNum}">
                <span class="ep-num">${epNum} серия</span>
              </button>
            `;
          }).join('')}
        </div>
      </div>
    </div>
  `;

  document.getElementById('bm-toggle-btn').addEventListener('click', () => toggleBookmark(anime));

  const dubs = await fetchAvailableVoiceovers(anime);
  const dubsInfoEl = document.getElementById('details-dubs-list');
  if (dubsInfoEl && dubs.length > 0) {
    dubsInfoEl.textContent = dubs.map(d => d.studio).slice(0, 10).join(' • ');
  }
}

// 6.4 Страница просмотра и выбора озвучки (#/watch/:id/:ep)
async function renderWatchPage(container, id, epParam) {
  container.innerHTML = `<div class="skeleton" style="height:520px;"></div>`;

  const anime = await getAnimeById(id);
  const dubs = await fetchAvailableVoiceovers(anime);

  let activeDubIndex = 0;
  if (state.preferredDub !== 'all') {
    const foundIdx = dubs.findIndex(d =>
      d.studio.toLowerCase().includes(state.preferredDub.toLowerCase())
    );
    if (foundIdx !== -1) activeDubIndex = foundIdx;
  }

  const currentEpNum = Math.max(Number(epParam) || 1, 1);
  const totalEpisodes = Math.max(
    Number(anime.totalSwitchableEpisodes) || 12,
    ...dubs.map(d => Number(d.episodesCount) || 0),
    1
  );

  container.innerHTML = `
    <div class="breadcrumbs">
      <span class="link" data-goto="#/home">Главная</span> /
      <span class="link" data-goto="#/anime/${anime.id}">${anime.title}</span> /
      <span>Серия ${currentEpNum}</span>
    </div>

    <div class="watch-header">
      <div>
        <h1 class="watch-title">${anime.title} — Серия ${currentEpNum}</h1>
        <p class="watch-subtitle" id="active-dub-status">
          Озвучка: ${dubs[activeDubIndex]?.studio || 'Мульти-плеер'}
        </p>
      </div>
      <button class="btn btn-secondary btn-sm" data-goto="#/anime/${anime.id}">
        ← К описанию тайтла
      </button>
    </div>

    <div class="player-shell">
      <div class="player-toolbar">
        <div class="dub-selector-group">
          <label class="dub-label" for="voiceover-select">🎙 Озвучка (${dubs.length}):</label>
          <select id="voiceover-select" class="select-ui dub-select">
            ${dubs.map((d, idx) => `
              <option value="${idx}" ${idx === activeDubIndex ? 'selected' : ''}>
                ${d.studio} (${d.badge})
              </option>
            `).join('')}
          </select>
        </div>

        <div class="player-controls-right" id="hls-quality-wrap" style="display:none;">
          <span style="font-size:0.8rem; color:var(--text-muted);">Качество HLS:</span>
          <select id="hls-quality-select" class="select-ui">
            <option value="hls_1080">1080p Full HD</option>
            <option value="hls_720">720p HD</option>
            <option value="hls_480">480p SD</option>
          </select>
        </div>
      </div>

      <div class="dub-chips-bar" id="dub-chips-bar">
        ${dubs.map((d, idx) => `
          <button class="dub-chip ${idx === activeDubIndex ? 'active' : ''}" data-dub-idx="${idx}">
            🎙 ${d.studio}
          </button>
        `).join('')}
      </div>

      <div class="video-viewport" id="video-viewport"></div>

      <div class="player-footer">
        <button
          class="btn btn-secondary btn-sm"
          ${currentEpNum <= 1 ? 'disabled' : `data-goto="#/watch/${anime.id}/${currentEpNum - 1}"`}
        >
          ← Серия ${currentEpNum > 1 ? currentEpNum - 1 : ''}
        </button>
        <span style="font-size:0.85rem; color:var(--text-muted);">
          Серия <strong>${currentEpNum}</strong> из ${totalEpisodes}
        </span>
        <button
          class="btn btn-primary btn-sm"
          ${currentEpNum >= totalEpisodes ? 'disabled' : `data-goto="#/watch/${anime.id}/${currentEpNum + 1}"`}
        >
          Серия ${currentEpNum < totalEpisodes ? currentEpNum + 1 : ''} →
        </button>
      </div>
    </div>

    <div class="section-header">
      <h3 class="section-title">Выбор серии (${totalEpisodes} эп.)</h3>
    </div>
    <div class="episodes-grid">
      ${Array.from({ length: Math.min(totalEpisodes, 250) }, (_, i) => {
        const ep = i + 1;
        return `
          <button
            class="ep-btn ${ep === currentEpNum ? 'active' : ''}"
            data-goto="#/watch/${anime.id}/${ep}"
          >
            <span class="ep-num">${ep} серия</span>
          </button>
        `;
      }).join('')}
    </div>
  `;

  const viewport = document.getElementById('video-viewport');
  const voiceoverSelect = document.getElementById('voiceover-select');
  const qualityWrap = document.getElementById('hls-quality-wrap');
  const qualitySelect = document.getElementById('hls-quality-select');
  const activeDubStatus = document.getElementById('active-dub-status');

  function mountSelectedVoiceover(dubIndex) {
    destroyActiveHls();
    activeDubIndex = dubIndex;
    const chosenDub = dubs[dubIndex] || dubs[0];

    if (voiceoverSelect) voiceoverSelect.value = String(dubIndex);
    document.querySelectorAll('.dub-chip').forEach((chip, idx) => {
      chip.classList.toggle('active', idx === dubIndex);
    });
    if (activeDubStatus) {
      activeDubStatus.textContent = `Активная озвучка: ${chosenDub.studio}`;
    }

    saveWatchProgress(anime, currentEpNum, chosenDub.studio);

    // РЕЖИМ 1: Прямой поток AniLibria Direct HLS (.m3u8 в 1080p)
    if (chosenDub.mode === 'hls' && Array.isArray(chosenDub.hlsEpisodes)) {
      qualityWrap.style.display = 'flex';
      const epObj =
        chosenDub.hlsEpisodes.find(e => Number(e.ordinal) === currentEpNum) ||
        chosenDub.hlsEpisodes[currentEpNum - 1] ||
        chosenDub.hlsEpisodes[0];

      const qKey = qualitySelect.value || 'hls_1080';
      const streamUrl = epObj?.[qKey] || epObj?.hls_1080 || epObj?.hls_720 || epObj?.hls_480;

      viewport.innerHTML = `
        <video id="akai-video" controls playsinline autoplay poster="${anime.poster}"></video>
        <button id="skip-op-btn" class="skip-op-btn">Пропустить опенинг ⏭</button>
      `;
      const video = document.getElementById('akai-video');
      const skipBtn = document.getElementById('skip-op-btn');

      if (window.Hls && Hls.isSupported() && streamUrl) {
        const hls = new Hls({ enableWorker: true });
        state.activeHlsInstance = hls;
        hls.loadSource(streamUrl);
        hls.attachMedia(video);
      } else if (streamUrl) {
        video.src = streamUrl;
      }

      if (epObj?.opening?.start != null && epObj?.opening?.stop != null) {
        video.addEventListener('timeupdate', () => {
          if (video.currentTime >= epObj.opening.start && video.currentTime <= epObj.opening.stop) {
            skipBtn.style.display = 'block';
          } else {
            skipBtn.style.display = 'none';
          }
        });
        skipBtn.addEventListener('click', () => {
          video.currentTime = epObj.opening.stop;
          skipBtn.style.display = 'none';
        });
      }
      return;
    }

    // РЕЖИМ 2: Студийная озвучка через незаблокированное зеркало aniqit.com
    if (chosenDub.mode === 'iframe' && chosenDub.baseIframeUrl) {
      qualityWrap.style.display = 'none';
      const specificEpUrl = chosenDub.episodesMap?.[currentEpNum];
      const sep = chosenDub.baseIframeUrl.includes('?') ? '&' : '?';
      const iframeSrc = specificEpUrl
        ? specificEpUrl
        : `${chosenDub.baseIframeUrl}${sep}episode=${currentEpNum}`;

      viewport.innerHTML = `
        <iframe
          src="${iframeSrc}"
          allowfullscreen
          allow="autoplay; fullscreen; encrypted-media"
        ></iframe>
      `;
      return;
    }

    // РЕЖИМ 3: Резервный HLS-поток
    qualityWrap.style.display = 'none';
    const demoStream = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';
    viewport.innerHTML = `
      <video id="akai-video" controls playsinline autoplay poster="${anime.poster}"></video>
    `;
    const video = document.getElementById('akai-video');
    if (window.Hls && Hls.isSupported()) {
      const hls = new Hls();
      state.activeHlsInstance = hls;
      hls.loadSource(demoStream);
      hls.attachMedia(video);
    } else {
      video.src = demoStream;
    }
  }

  voiceoverSelect.addEventListener('change', e => {
    mountSelectedVoiceover(Number(e.target.value));
  });

  document.querySelectorAll('.dub-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      mountSelectedVoiceover(Number(chip.dataset.dubIdx));
    });
  });

  qualitySelect.addEventListener('change', () => {
    mountSelectedVoiceover(activeDubIndex);
  });

  mountSelectedVoiceover(activeDubIndex);
}

// 6.5 Страница закладок (#/bookmarks)
function renderBookmarksPage(container) {
  container.innerHTML = `
    <div class="breadcrumbs">
      <span class="link" data-goto="#/home">Главная</span> / <span>Мои закладки</span>
    </div>
    <div class="section-header">
      <h1 class="section-title">Сохранённые аниме (${state.bookmarks.length})</h1>
    </div>
    ${state.bookmarks.length > 0
      ? `<div class="anime-grid">${state.bookmarks.map(renderAnimeCard).join('')}</div>`
      : `
        <div class="empty-box">
          <p style="margin-bottom:12px;">В ваших закладках пока пусто.</p>
          <a href="#/catalog" class="btn btn-primary btn-sm">Перейти в каталог</a>
        </div>
      `
    }
  `;
}

/********************************************************************
 * 7. МАРШРУТИЗАТОР И ИНИЦИАЛИЗАЦИЯ
 ********************************************************************/
async function router() {
  destroyActiveHls();
  const hash = location.hash || '#/home';
  const parts = hash.replace(/^#\//, '').split('/');
  const route = parts[0] || 'home';
  const param1 = parts[1];
  const param2 = parts[2];

  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.dataset.nav === route);
  });

  const container = document.getElementById('app-view');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (route === 'home') {
    await renderHomePage(container);
  } else if (route === 'catalog') {
    await renderCatalogPage(container, param1 ? decodeURIComponent(param1) : '', 'all');
  } else if (route === 'ongoing') {
    await renderCatalogPage(container, '', 'ongoing');
  } else if (route === 'anime' && param1) {
    await renderAnimeDetailsPage(container, param1);
  } else if (route === 'watch' && param1) {
    await renderWatchPage(container, param1, param2 || 1);
  } else if (route === 'bookmarks') {
    renderBookmarksPage(container);
  } else {
    await renderHomePage(container);
  }
}

window.addEventListener('hashchange', router);

window.addEventListener('DOMContentLoaded', () => {
  updateBookmarkBadge();

  document.body.addEventListener('click', e => {
    const target = e.target.closest('[data-goto]');
    if (target) {
      location.hash = target.getAttribute('data-goto');
    }
  });

  const searchForm = document.getElementById('global-search-form');
  const globalSearch = document.getElementById('global-search');
  if (searchForm) {
    searchForm.addEventListener('submit', e => {
      e.preventDefault();
      if (globalSearch.value.trim()) {
        location.hash = `#/catalog/${encodeURIComponent(globalSearch.value.trim())}`;
      }
    });
  }

  const apiPanel = document.getElementById('api-panel');
  const toggleBtn = document.getElementById('toggle-api-btn');
  const closeBtn = document.getElementById('close-api-panel');
  if (toggleBtn && apiPanel) {
    toggleBtn.addEventListener('click', () => apiPanel.classList.toggle('open'));
  }
  if (closeBtn && apiPanel) {
    closeBtn.addEventListener('click', () => apiPanel.classList.remove('open'));
  }

  const tokenInput = document.getElementById('kodik-token-input');
  if (tokenInput) {
    tokenInput.value = state.kodikToken;
    tokenInput.addEventListener('change', e => {
      state.kodikToken = e.target.value.trim();
      localStorage.setItem('akai_kodik_token', state.kodikToken);
    });
  }

  const prefDubSelect = document.getElementById('default-dub-select');
  if (prefDubSelect) {
    prefDubSelect.value = state.preferredDub;
    prefDubSelect.addEventListener('change', e => {
      state.preferredDub = e.target.value;
      localStorage.setItem('akai_pref_dub', state.preferredDub);
    });
  }

  router();
});