(() => {
  "use strict";

  const W = 420;
  const H = 700;
  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext("2d");
  const stage = document.getElementById("stage-wrap");
  const scenery = new Image();
  scenery.src = "assets/background-independence-v2.jpg";
  const barysMascot = new Image();
  barysMascot.src = "assets/barys-snow-leopard-v2.png";
  const stateKey = "zigi-zagi-independence-v1";

  const i18n = {
    kk: {
      sound: "Әуен + дыбыс", occasion: "16 желтоқсан · Қазақстан",
      greeting: "Тәуелсіздік күні құтты болсын!",
      intro: "Арқанды қиып, банкіңді тербелт. Алтын жұлдыздарды жинап, сусынды Барысқа жеткіз!",
      play: "ОЙНАУ", levels: "Деңгейлер",
      "holiday-note": "Қазақстанның Тәуелсіздік күніне арналған мерекелік ойын",
      "game-label": "МЕРЕКЕЛІК ОЙЫН", "holiday-tag": "ТӘУЕЛСІЗДІК КҮНІ",
      "start-title": "Барысқа көмектес!", "start-copy": "Арқанды кесіп, банкіге тербелуге мүмкіндік бер. Жұлдыздарды жина, көпіршіктерді жар да сусынды Барысқа жеткіз.",
      "play-now": "БАСТАУ", gesture: "Арқанды кесу үшін үстінен сырғыт",
      wind: "Желді қосу", "cut-hint": "Арқанды кесу үшін сырғыт",
      caption: "Саусағыңмен немесе тінтуірмен ойна",
      "map-label": "ДЕҢГЕЙ КАРТАСЫ", "map-title": "Мерекелік саяхат",
      "map-foot": "Жұлдыздарың мен ашылған деңгейлер осы құрылғыда сақталады.",
      continue: "ЖАЛҒАСТЫРУ", retry: "ҚАЙТА ОЙНАУ",
      "flavor-kicker": "ZIGI-ZAGI ӘЛЕМІ", "flavor-title": "Қай дәмді таңдайсың?",
      "flavor-copy": "Үш иллюстрацияланған банка, үш әлем және 30 физикалық деңгей.",
      starter: "НЕГІЗГІ ДӘМ", chapter: "10 ДЕҢГЕЙ", mango: "Манго-ананас",
      strawberry: "Құлпынай",
      footer: "Тәуелсіздік күні құтты болсын, Қазақстан!",
      cut: "Арқан кесілді!", star: "Жұлдыз жиналды!",
      "need-cut": "Тербелісті бастау үшін арқанды кес.",
      "wind-on": "Жел қосылды!", "wind-off": "Жел тоқтады",
      "win-title": "Жарайсың!", "win-copy": "Барыс сүйікті сусынына жетті. Тәуелсіздік күні құтты болсын!",
      "win-copy-more": "Барыс сусынын алды! Келесі деңгейге дайынсың ба?",
      "lose-title": "Тағы бір рет көрейік", "lose-copy": "Барыс әлі сусынын күтіп отыр. Қайта байқап көр!",
      "locked": "Бұл деңгей әлі ашылған жоқ.", "level": "Деңгей",
      "all-stars": "Тамаша! Үш жұлдыздың бәрін жинадың!",
      "partial-stars": "Барыс сусынын алды. Тағы жұлдыз жинап көруге болады.",
      "blue-name": "Zigi Cola", "mango-name": "Манго-ананас", "strawberry-name": "Құлпынай",
      "blue-chapter": "Blue Splash · Тәуелсіздік",
      "mango-chapter": "Tropical Rush", "strawberry-chapter": "Berry Bounce",
      "first-level": "Тәуелсіздік деңгейі",
      "mechanic-blue": "Көк аспан ағыны", "mechanic-mango": "Тропикалық самал",
      "mechanic-strawberry": "Жидек серпіні"
    },
    ru: {
      sound: "Музыка + звук", occasion: "16 декабря · Казахстан",
      greeting: "С Днём независимости!",
      intro: "Перережь верёвку, раскачай банку и доставь напиток Барсу. Собирай золотые звёзды по пути!",
      play: "ИГРАТЬ", levels: "Уровни",
      "holiday-note": "Праздничная игра ко Дню независимости Казахстана",
      "game-label": "ПРАЗДНИЧНАЯ ИГРА", "holiday-tag": "ДЕНЬ НЕЗАВИСИМОСТИ",
      "start-title": "Помоги Барсу!", "start-copy": "Перережь верёвку, чтобы раскачать банку. Собирай звёзды, лопай пузыри, отталкивайся от пружин и доставь напиток Барсу.",
      "play-now": "НАЧАТЬ", gesture: "Проведи по верёвке, чтобы перерезать",
      wind: "Включить ветер", "cut-hint": "Проведи по верёвке, чтобы срезать",
      caption: "Играй пальцем или мышью",
      "map-label": "КАРТА УРОВНЕЙ", "map-title": "Праздничное путешествие",
      "map-foot": "Звёзды и открытые уровни сохраняются на этом устройстве.",
      continue: "ДАЛЬШЕ", retry: "ИГРАТЬ СНОВА",
      "flavor-kicker": "МИР ZIGI-ZAGI", "flavor-title": "Какой вкус выберешь?",
      "flavor-copy": "Три иллюстрированные банки, три мира и 30 физических уровней.",
      starter: "СТАРТОВЫЙ ВКУС", chapter: "10 УРОВНЕЙ", mango: "Манго-ананас",
      strawberry: "Клубника",
      footer: "С Днём независимости, Казахстан!",
      cut: "Верёвка перерезана!", star: "Звезда собрана!",
      "need-cut": "Перережь верёвку, чтобы запустить раскачивание.",
      "wind-on": "Ветер включён!", "wind-off": "Ветер выключен",
      "win-title": "Отлично!", "win-copy": "Барс поймал любимый напиток. С Днём независимости!",
      "win-copy-more": "Барс получил напиток! Готов перейти к следующему уровню?",
      "lose-title": "Попробуем ещё раз", "lose-copy": "Барс всё ещё ждёт свой напиток. Попробуй снова!",
      "locked": "Этот уровень пока закрыт.", "level": "Уровень",
      "all-stars": "Прекрасно! Ты собрал все три звезды!",
      "partial-stars": "Барс получил напиток. Можно пройти ещё раз и собрать больше звёзд.",
      "blue-name": "Zigi Cola", "mango-name": "Манго-ананас", "strawberry-name": "Клубника",
      "blue-chapter": "Blue Splash · Независимость",
      "mango-chapter": "Tropical Rush", "strawberry-chapter": "Berry Bounce",
      "first-level": "Уровень независимости",
      "mechanic-blue": "Потоки голубого неба", "mechanic-mango": "Тропический ветер",
      "mechanic-strawberry": "Ягодные пружины"
    }
  };

  const chapters = [
    { id: "blue", color: "#1694c8", nameKey: "blue-chapter", flavorKey: "blue-name", product: "blue", mechanicKey: "mechanic-blue", background: "#ccefff", gravity: .18 },
    { id: "mango", color: "#edae30", nameKey: "mango-chapter", flavorKey: "mango-name", product: "mango", mechanicKey: "mechanic-mango", background: "#fff0c6", gravity: .17 },
    { id: "strawberry", color: "#e46b80", nameKey: "strawberry-chapter", flavorKey: "strawberry-name", product: "strawberry", mechanicKey: "mechanic-strawberry", background: "#ffe1e8", gravity: .19 }
  ];

  const products = {
    blue: { image: "can-blue.svg", key: "blue-name", bg: "vector", chapter: 0 },
    mango: { image: "can-mango.svg", key: "mango-name", bg: "vector", chapter: 1 },
    strawberry: { image: "can-strawberry.svg", key: "strawberry-name", bg: "vector", chapter: 2 }
  };

  function makeLevel(id) {
    const chapterIndex = Math.floor((id - 1) / 10);
    const step = (id - 1) % 10;
    const chapter = chapters[chapterIndex];
    const start = { x: 163, y: 203 + (step >= 8 ? 12 : 0) };
    const anchorSets = [
      [{ x: 118, y: 95 }],
      [{ x: 112, y: 92 }, { x: 270, y: 101 }],
      [{ x: 114, y: 88 }, { x: 265, y: 93 }],
      [{ x: 119, y: 94 }],
      [{ x: 105, y: 88 }, { x: 276, y: 91 }],
      [{ x: 109, y: 82 }, { x: 264, y: 84 }, { x: 190, y: 75 }],
      [{ x: 114, y: 91 }, { x: 266, y: 92 }],
      [{ x: 108, y: 84 }, { x: 263, y: 85 }, { x: 190, y: 73 }],
      [{ x: 101, y: 80 }, { x: 277, y: 92 }],
      [{ x: 111, y: 84 }, { x: 269, y: 85 }, { x: 190, y: 72 }]
    ];
    const anchors = anchorSets[step];
    const ropes = anchors.map((a, index) => ({
      anchor: a,
      length: Math.hypot(start.x - a.x, start.y - a.y),
      alive: true,
      index: index
    }));
    const stars = [
      { x: 231 + (step % 3) * 9, y: 291 + (step % 2) * 11, collected: false },
      { x: 274 + (step % 2) * 9, y: 388 - (step % 3) * 9, collected: false },
      { x: 311 + (step % 3) * 4, y: 484 - (step % 2) * 10, collected: false }
    ];
    const platforms = [];
    if (step >= 3) {
      platforms.push({ x: 43, originX: 43, y: 470, w: 94, h: 16, spring: chapterIndex > 0, moving: false, phase: step });
    }
    if (step >= 4) {
      platforms.push({ x: 285, originX: 285, y: 432, w: 79, h: 15, spring: chapterIndex > 0, moving: step >= 7, phase: step * .8 });
    }
    if (step >= 7) platforms.push({ x: 176, originX: 176, y: 525, w: 86, h: 16, spring: true, moving: true, phase: step * 1.4 });
    const bubbles = [];
    if (step >= 5) bubbles.push({ x: 306, y: 452, homeY: 452, r: 16, active: true });
    if (step >= 8) bubbles.push({ x: 279, y: 365, homeY: 365, r: 14, active: true });
    return {
      id: id, chapterIndex: chapterIndex, step: step, start: start, ropes: ropes,
      stars: stars, platforms: platforms, bubbles: bubbles, goal: { x: 306, y: 560 },
      gravity: chapter.gravity + Math.min((step % 5) * .006, .024),
      initialVelocity: { x: 2.04 + (step % 3) * .12, y: .02 },
      floor: 650, wind: { x: 80, y: 314, w: 112, h: 177 },
      hazards: step >= 8 ? [{ x: 54, y: 560, r: 17 }] : []
    };
  }

  const levels = Array.from({ length: 30 }, (_, i) => makeLevel(i + 1));

  function loadProgress() {
    try {
      const stored = JSON.parse(localStorage.getItem(stateKey) || "{}");
      return {
        unlocked: Math.max(1, Math.min(30, Number(stored.unlocked) || 1)),
        stars: stored.stars && typeof stored.stars === "object" ? stored.stars : {},
        sound: stored.sound !== false
      };
    } catch (_) {
      return { unlocked: 1, stars: {}, sound: true };
    }
  }

  const progress = loadProgress();
  let language = localStorage.getItem("zigi-zagi-language") === "ru" ? "ru" : "kk";
  let currentLevel = levels[0];
  let selectedProduct = "blue";
  let gameMode = "ready";
  let modeBeforeMap = "ready";
  let windOn = false;
  let windPhase = 0;
  let particles = [];
  let ropeSnapEffects = [];
  let canTrail = [];
  let cameraShake = 0;
  let pointerLine = null;
  let pointerStart = null;
  let toastTimer = 0;
  let lastFrame = performance.now();
  let idleTime = 0;
  let blinkTimer = 0;
  let characterMood = "waiting";
  let winAnimationAt = 0;
  let audioContext = null;
  let scoreBus = null;
  let scoreTimer = null;
  let scoreStep = 0;
  let scoreNextTime = 0;
  const SCORE_BPM = 78;
  const SCORE_STEP = 60 / SCORE_BPM / 2;
  const SCORE_STEPS_PER_LOOP = 64;
  const SCORE_BARS = [
    { root: 50, chord: [62, 66, 69, 74], melody: [74, 78, 81, 78] },
    { root: 47, chord: [59, 62, 66, 71], melody: [71, 74, 78, 83] },
    { root: 43, chord: [55, 59, 62, 67], melody: [67, 71, 74, 79] },
    { root: 45, chord: [57, 61, 64, 69], melody: [69, 73, 76, 81] }
  ];
  let canvasScale = 1;
  let canvasOffsetX = 0;
  let canvasOffsetY = 0;
  let reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const can = { x: currentLevel.start.x, y: currentLevel.start.y, vx: 0, vy: 0, angle: 0, bounce: 0, scale: 1 };
  const assetImages = {};
  const assetCanvases = {};
  const bgSpecks = Array.from({ length: 24 }, (_, i) => ({
    x: (i * 79 + 21) % W, y: (i * 113 + 29) % 590,
    r: 1.5 + (i % 4) * .8, phase: i * .73
  }));

  function t(key) { return (i18n[language] && i18n[language][key]) || key; }
  function localizedChapter(chapter) { return t(chapter.nameKey); }
  function localizedProduct(id) {
    const p = products[id] || products.blue;
    return t(p.key);
  }
  function saveProgress() {
    try {
      localStorage.setItem(stateKey, JSON.stringify({ unlocked: progress.unlocked, stars: progress.stars, sound: progress.sound }));
    } catch (_) {}
  }

  function applyLanguage() {
    document.documentElement.lang = language;
    document.title = language === "kk" ? "Zigi-Zagi: Барысқа көмектес" : "Zigi-Zagi: Помоги Барсу";
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const value = t(el.dataset.i18n);
      if (value) el.textContent = value;
    });
    document.querySelectorAll(".language-button").forEach((button) => {
      const active = button.dataset.lang === language;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    document.getElementById("sound-icon").textContent = progress.sound ? "♫" : "×";
    document.getElementById("sound-toggle").setAttribute("aria-label", language === "kk" ? "Әуен мен дыбыс" : "Музыка и звуки");
    document.getElementById("sound-toggle").setAttribute("aria-pressed", String(progress.sound));
    document.getElementById("chapter-title").textContent = localizedChapter(chapters[currentLevel.chapterIndex]);
    document.getElementById("level-subtitle").textContent = (language === "kk" ? "Деңгей " : "Уровень ") + currentLevel.id + (currentLevel.id === 1 ? " · " + t("first-level") : " · " + t(chapters[currentLevel.chapterIndex].mechanicKey));
    document.getElementById("can-name").textContent = localizedProduct(selectedProduct);
    updateHeader();
    renderLevelMap();
    updateFlavorSelection();
    updateHudStars();
  }

  function updateHeader() {
    document.getElementById("level-index").textContent = String(currentLevel.id).padStart(2, "0");
    document.getElementById("game-progress").textContent = currentLevel.id + " / 30";
  }

  function updateHudStars() {
    const nodes = Array.from(document.querySelectorAll("#stage-stars span"));
    const count = currentLevel.stars.filter((s) => s.collected).length;
    nodes.forEach((node, i) => {
      node.textContent = i < count ? "★" : "☆";
      node.classList.toggle("collected", i < count);
    });
  }

  function setLevel(id, startImmediately) {
    currentLevel = levels[Math.max(0, Math.min(29, id - 1))];
    const chapter = chapters[currentLevel.chapterIndex];
    if (!products[selectedProduct] || products[selectedProduct].chapter !== currentLevel.chapterIndex) selectedProduct = chapter.product;
    can.x = currentLevel.start.x;
    can.y = currentLevel.start.y;
    can.vx = 0;
    can.vy = 0;
    can.angle = 0;
    can.bounce = 0;
    can.scale = 1;
    currentLevel.ropes.forEach((rope) => { rope.alive = true; });
    currentLevel.stars.forEach((star) => { star.collected = false; });
    currentLevel.bubbles.forEach((bubble) => { bubble.active = true; bubble.y = bubble.homeY; });
    currentLevel.platforms.forEach((platform) => { platform.x = platform.originX; });
    particles = [];
    ropeSnapEffects = [];
    canTrail = [];
    cameraShake = 0;
    windOn = false;
    windPhase = 0;
    characterMood = "waiting";
    winAnimationAt = 0;
    gameMode = startImmediately ? "playing" : "ready";
    if (startImmediately) {
      can.vx = currentLevel.initialVelocity.x;
      can.vy = currentLevel.initialVelocity.y;
    }
    idleTime = 0;
    document.getElementById("intro-overlay").classList.toggle("is-hidden", startImmediately);
    document.getElementById("result-modal").classList.remove("is-open");
    document.getElementById("level-modal").classList.remove("is-open");
    document.getElementById("level-modal").setAttribute("aria-hidden", "true");
    document.getElementById("wind-button").hidden = false;
    document.getElementById("wind-button").classList.remove("is-on");
    document.getElementById("chapter-title").textContent = localizedChapter(chapter);
    document.getElementById("can-name").textContent = localizedProduct(selectedProduct);
    document.getElementById("level-subtitle").textContent = (language === "kk" ? "Деңгей " : "Уровень ") + currentLevel.id + (currentLevel.id === 1 ? " · " + t("first-level") : " · " + t(chapter.mechanicKey));
    updateHeader();
    updateHudStars();
    updateFlavorSelection();
    renderLevelMap();
    if (startImmediately) toast(t("need-cut"));
  }

  function startGame() {
    can.vx = currentLevel.initialVelocity.x;
    can.vy = currentLevel.initialVelocity.y;
    gameMode = "playing";
    characterMood = "excited";
    idleTime = 0;
    startMusic();
    document.getElementById("intro-overlay").classList.add("is-hidden");
    document.getElementById("result-modal").classList.remove("is-open");
    document.getElementById("level-modal").classList.remove("is-open");
    playTone(460, .07, "sine", .05);
    setTimeout(() => { if (gameMode === "playing") characterMood = "waiting"; }, 800);
  }

  function toast(message) {
    const el = document.getElementById("toast");
    el.textContent = message;
    el.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("is-visible"), 1300);
  }

  function openMap(chapterIndex) {
    modeBeforeMap = gameMode;
    gameMode = "paused";
    const modal = document.getElementById("level-modal");
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    renderLevelMap(chapterIndex === undefined ? currentLevel.chapterIndex : chapterIndex);
  }

  function renderLevelMap(selectedChapter) {
    const legend = document.getElementById("chapter-legend");
    const grid = document.getElementById("level-grid");
    if (!legend || !grid) return;
    const current = selectedChapter === undefined ? currentLevel.chapterIndex : selectedChapter;
    legend.innerHTML = chapters.map((chapter, i) =>
      '<button class="chapter-chip ' + (i === current ? "is-current" : "") + '" data-chapter="' + i + '">' + localizedChapter(chapter) + "</button>"
    ).join("");
    legend.querySelectorAll("[data-chapter]").forEach((button) => {
      button.addEventListener("click", () => renderLevelMap(Number(button.dataset.chapter)));
    });
    grid.innerHTML = "";
    const first = current * 10 + 1;
    for (let id = first; id < first + 10; id++) {
      const isOpen = id <= progress.unlocked;
      const isCurrent = id === currentLevel.id;
      const storedStars = Number(progress.stars[id]) || 0;
      const cell = document.createElement("button");
      cell.className = "level-cell" + (isOpen ? " is-open" : " is-locked") + (isCurrent ? " is-current" : "");
      cell.innerHTML = isOpen ? String(id) + (storedStars ? "<small>" + "★".repeat(storedStars) + "</small>" : "") : "•";
      cell.setAttribute("aria-label", isOpen ? t("level") + " " + id : t("locked"));
      if (isOpen) cell.addEventListener("click", () => setLevel(id, true));
      else cell.addEventListener("click", () => toast(t("locked")));
      grid.appendChild(cell);
    }
  }

  function updateFlavorSelection() {
    document.querySelectorAll(".flavor-card").forEach((card) => {
      const isSelected = card.dataset.product === selectedProduct;
      card.classList.toggle("is-selected", isSelected);
      card.setAttribute("aria-pressed", String(isSelected));
    });
  }

  function chooseProduct(id) {
    const product = products[id];
    if (!product) return;
    const firstLevel = product.chapter * 10 + 1;
    if (firstLevel > progress.unlocked) {
      toast(t("locked"));
      return;
    }
    selectedProduct = id;
    setLevel(firstLevel, true);
    document.getElementById("stage-wrap").scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function openAudio() {
    if (!progress.sound) return null;
    const AudioCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtor) return null;
    if (!audioContext) audioContext = new AudioCtor();
    if (audioContext.state === "suspended") audioContext.resume();
    return audioContext;
  }

  function playTone(frequency, duration, type, volume) {
    const audio = openAudio();
    if (!audio) return;
    try {
      const oscillator = audio.createOscillator();
      const gain = audio.createGain();
      oscillator.type = type || "sine";
      oscillator.frequency.setValueAtTime(frequency, audio.currentTime);
      gain.gain.setValueAtTime(volume || .035, audio.currentTime);
      gain.gain.exponentialRampToValueAtTime(.001, audio.currentTime + duration);
      oscillator.connect(gain);
      gain.connect(audio.destination);
      oscillator.start();
      oscillator.stop(audio.currentTime + duration);
    } catch (_) {}
  }

  function midiFrequency(note) {
    return 440 * Math.pow(2, (note - 69) / 12);
  }

  function prepareScoreBus(audio) {
    if (scoreBus) return;
    scoreBus = audio.createGain();
    scoreBus.gain.value = 0;
    const dry = audio.createGain();
    dry.gain.value = .72;
    scoreBus.connect(dry);
    dry.connect(audio.destination);

    const convolver = audio.createConvolver();
    const impulseLength = Math.floor(audio.sampleRate * 1.25);
    const impulse = audio.createBuffer(2, impulseLength, audio.sampleRate);
    for (let channel = 0; channel < impulse.numberOfChannels; channel++) {
      const samples = impulse.getChannelData(channel);
      for (let i = 0; i < impulseLength; i++) {
        const fade = Math.pow(1 - i / impulseLength, 3.1);
        samples[i] = (Math.random() * 2 - 1) * fade * .48;
      }
    }
    convolver.buffer = impulse;
    const wet = audio.createGain();
    wet.gain.value = .2;
    scoreBus.connect(convolver);
    convolver.connect(wet);
    wet.connect(audio.destination);
  }

  function playScoreVoice(audio, frequency, time, duration, volume, style) {
    const filter = audio.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(style === "brass" ? 2100 : style === "bass" ? 480 : 1650, time);
    filter.Q.setValueAtTime(.42, time);
    const envelope = audio.createGain();
    const attack = style === "pad" ? .32 : style === "brass" ? .075 : .025;
    const release = Math.min(style === "pad" ? .4 : .14, duration * .45);
    envelope.gain.setValueAtTime(.0001, time);
    envelope.gain.linearRampToValueAtTime(volume, time + attack);
    envelope.gain.setValueAtTime(volume * .86, time + duration - release);
    envelope.gain.exponentialRampToValueAtTime(.0001, time + duration);
    filter.connect(envelope);
    envelope.connect(scoreBus);

    const first = audio.createOscillator();
    const second = audio.createOscillator();
    first.type = style === "brass" ? "sawtooth" : "triangle";
    second.type = style === "bass" ? "sine" : "sawtooth";
    first.frequency.setValueAtTime(frequency, time);
    second.frequency.setValueAtTime(frequency, time);
    first.detune.setValueAtTime(-5, time);
    second.detune.setValueAtTime(style === "brass" ? 5 : 7, time);
    first.connect(filter);
    second.connect(filter);
    first.start(time);
    second.start(time);
    first.stop(time + duration + .03);
    second.stop(time + duration + .03);
  }

  function playScoreDrum(audio, time, strength) {
    const oscillator = audio.createOscillator();
    const envelope = audio.createGain();
    const filter = audio.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(360, time);
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(112, time);
    oscillator.frequency.exponentialRampToValueAtTime(43, time + .52);
    envelope.gain.setValueAtTime(.0001, time);
    envelope.gain.linearRampToValueAtTime(strength, time + .018);
    envelope.gain.exponentialRampToValueAtTime(.0001, time + .72);
    oscillator.connect(filter);
    filter.connect(envelope);
    envelope.connect(scoreBus);
    oscillator.start(time);
    oscillator.stop(time + .74);

    const noiseLength = Math.floor(audio.sampleRate * .16);
    const noiseBuffer = audio.createBuffer(1, noiseLength, audio.sampleRate);
    const noiseSamples = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseLength; i++) noiseSamples[i] = Math.random() * 2 - 1;
    const noise = audio.createBufferSource();
    const noiseFilter = audio.createBiquadFilter();
    const noiseGain = audio.createGain();
    noise.buffer = noiseBuffer;
    noiseFilter.type = "lowpass";
    noiseFilter.frequency.setValueAtTime(950, time);
    noiseGain.gain.setValueAtTime(.0001, time);
    noiseGain.gain.linearRampToValueAtTime(strength * .26, time + .008);
    noiseGain.gain.exponentialRampToValueAtTime(.0001, time + .17);
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(scoreBus);
    noise.start(time);
    noise.stop(time + .18);
  }

  function scheduleScoreStep(audio, step, time) {
    const barIndex = Math.floor(step / 8) % 8;
    const subdivision = step % 8;
    const phrase = SCORE_BARS[barIndex % SCORE_BARS.length];
    const beatLength = 60 / SCORE_BPM;
    const arpeggio = [0, 2, 1, 3, 2, 1, 0, 2];

    if (subdivision === 0) {
      phrase.chord.slice(0, 3).forEach((note, index) => {
        playScoreVoice(audio, midiFrequency(note + 12), time, beatLength * 3.85, .009 - index * .0006, "pad");
      });
      playScoreVoice(audio, midiFrequency(phrase.root - 12), time, beatLength * 1.75, .018, "bass");
      playScoreDrum(audio, time, barIndex % 4 === 0 ? .105 : .078);
    } else if (subdivision === 4) {
      playScoreVoice(audio, midiFrequency(phrase.chord[2] - 12), time, beatLength * 1.45, .014, "bass");
    }

    const pluckNote = phrase.chord[arpeggio[subdivision]];
    playScoreVoice(audio, midiFrequency(pluckNote), time, .24, .0068, "strings");
    if (subdivision % 2 === 1) {
      const melodyNote = phrase.melody[(subdivision - 1) / 2] + (barIndex >= 6 ? 12 : 0);
      playScoreVoice(audio, midiFrequency(melodyNote), time, beatLength * .92, barIndex >= 4 ? .013 : .0105, "brass");
    }
  }

  function startMusic() {
    const audio = openAudio();
    if (!audio || scoreTimer !== null) return;
    prepareScoreBus(audio);
    const begin = () => {
      if (!progress.sound || scoreTimer !== null) return;
      const now = audio.currentTime;
      scoreBus.gain.cancelScheduledValues(now);
      scoreBus.gain.setValueAtTime(Math.max(.0001, scoreBus.gain.value), now);
      scoreBus.gain.linearRampToValueAtTime(.68, now + 1.5);
      scoreStep = 0;
      scoreNextTime = now + .08;
      const scheduler = () => {
        if (!progress.sound) return stopMusic();
        if (audio.currentTime - scoreNextTime > .8) {
          const skipped = Math.floor((audio.currentTime - scoreNextTime) / SCORE_STEP);
          scoreStep = (scoreStep + skipped) % SCORE_STEPS_PER_LOOP;
          scoreNextTime += skipped * SCORE_STEP;
        }
        while (scoreNextTime < audio.currentTime + .18) {
          scheduleScoreStep(audio, scoreStep, scoreNextTime);
          scoreStep = (scoreStep + 1) % SCORE_STEPS_PER_LOOP;
          scoreNextTime += SCORE_STEP;
        }
      };
      scoreTimer = window.setInterval(scheduler, 80);
      scheduler();
    };
    if (audio.state === "suspended") audio.resume().then(begin).catch(() => {});
    else begin();
  }

  function stopMusic() {
    if (scoreTimer !== null) window.clearInterval(scoreTimer);
    scoreTimer = null;
    if (scoreBus && audioContext) {
      const now = audioContext.currentTime;
      scoreBus.gain.cancelScheduledValues(now);
      scoreBus.gain.setValueAtTime(scoreBus.gain.value, now);
      scoreBus.gain.linearRampToValueAtTime(0, now + .18);
    }
  }

  function playRopeCut() {
    playTone(980, .065, "triangle", .04);
    setTimeout(() => playTone(660, .11, "sine", .03), 35);
  }

  function playSparkle() {
    playTone(1047, .16, "sine", .034);
    setTimeout(() => playTone(1319, .19, "sine", .029), 42);
    setTimeout(() => playTone(1760, .22, "sine", .024), 86);
  }

  function playWin() {
    [587, 740, 880].forEach((frequency) => playTone(frequency, .42, "triangle", .024));
    setTimeout(() => playTone(1175, .3, "sine", .03), 170);
    setTimeout(() => playTone(1480, .48, "sine", .025), 310);
  }

  function burst(x, y, color, count) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1 + Math.random() * 3.3;
      particles.push({
        x: x, y: y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed - 1.4,
        life: 28 + Math.random() * 30, maxLife: 58, size: 2.5 + Math.random() * 4,
        color: color || "#f1bf43", type: Math.random() > .72 ? "star" : "dot"
      });
    }
  }

  function onCut(rope) {
    if (!rope.alive || gameMode !== "playing") return;
    rope.alive = false;
    const dx = can.x - rope.anchor.x;
    const dy = can.y - rope.anchor.y;
    const len = Math.max(1, Math.hypot(dx, dy));
    ropeSnapEffects.push({ x: rope.anchor.x + dx * .52, y: rope.anchor.y + dy * .52, angle: Math.atan2(dy, dx), life: 20, maxLife: 20 });
    const tangent = { x: dy / len, y: -dx / len };
    can.vx += tangent.x * 1.05;
    can.vy += tangent.y * 1.05;
    cameraShake = Math.max(cameraShake, 3.5);
    characterMood = "worried";
    burst((can.x + rope.anchor.x) / 2, (can.y + rope.anchor.y) / 2, "#f1bd43", 7);
    playRopeCut();
    toast(t("cut"));
  }

  function pointSegmentDistance(p, a, b) {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const lengthSq = dx * dx + dy * dy;
    if (!lengthSq) return Math.hypot(p.x - a.x, p.y - a.y);
    const u = Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / lengthSq));
    return Math.hypot(p.x - (a.x + u * dx), p.y - (a.y + u * dy));
  }

  function orientation(a, b, c) {
    return (b.y - a.y) * (c.x - b.x) - (b.x - a.x) * (c.y - b.y);
  }
  function segmentsIntersect(a, b, c, d) {
    const o1 = orientation(a, b, c);
    const o2 = orientation(a, b, d);
    const o3 = orientation(c, d, a);
    const o4 = orientation(c, d, b);
    return (o1 === 0 || o2 === 0 || Math.sign(o1) !== Math.sign(o2)) &&
      (o3 === 0 || o4 === 0 || Math.sign(o3) !== Math.sign(o4));
  }
  function segmentDistance(a, b, c, d) {
    if (segmentsIntersect(a, b, c, d)) return 0;
    return Math.min(pointSegmentDistance(a, c, d), pointSegmentDistance(b, c, d), pointSegmentDistance(c, a, b), pointSegmentDistance(d, a, b));
  }

  function canvasPoint(event) {
    const rect = canvas.getBoundingClientRect();
    return { x: (event.clientX - rect.left) * W / rect.width, y: (event.clientY - rect.top) * H / rect.height };
  }

  canvas.addEventListener("pointerdown", (event) => {
    if (gameMode !== "playing") return;
    pointerStart = canvasPoint(event);
    pointerLine = { from: pointerStart, to: pointerStart };
    canvas.setPointerCapture(event.pointerId);
    event.preventDefault();
  });
  canvas.addEventListener("pointermove", (event) => {
    if (!pointerStart) return;
    pointerLine = { from: pointerStart, to: canvasPoint(event) };
    event.preventDefault();
  });
  function endPointer(event) {
    if (!pointerStart) return;
    const end = canvasPoint(event);
    const stroke = { from: pointerStart, to: end };
    const length = Math.hypot(end.x - pointerStart.x, end.y - pointerStart.y);
    let chosen = null;
    let bestDistance = 18;
    currentLevel.ropes.forEach((rope) => {
      if (!rope.alive) return;
      const distance = segmentDistance(stroke.from, stroke.to, rope.anchor, { x: can.x, y: can.y });
      if (distance < bestDistance) {
        bestDistance = distance;
        chosen = rope;
      }
    });
    if (chosen) onCut(chosen);
    else if (length < 9) toast(t("need-cut"));
    pointerStart = null;
    pointerLine = null;
  }
  canvas.addEventListener("pointerup", endPointer);
  canvas.addEventListener("pointercancel", endPointer);

  document.querySelectorAll(".language-button").forEach((button) => button.addEventListener("click", () => {
    language = button.dataset.lang === "ru" ? "ru" : "kk";
    localStorage.setItem("zigi-zagi-language", language);
    applyLanguage();
  }));
  document.getElementById("sound-toggle").addEventListener("click", () => {
    progress.sound = !progress.sound;
    saveProgress();
    applyLanguage();
    if (progress.sound) {
      startMusic();
      playTone(620, .08, "sine", .045);
    } else {
      stopMusic();
    }
  });
  document.getElementById("start-game").addEventListener("click", startGame);
  document.getElementById("hero-play").addEventListener("click", () => {
    document.getElementById("stage-wrap").scrollIntoView({ behavior: "smooth", block: "center" });
    startGame();
  });
  document.getElementById("restart-level").addEventListener("click", () => setLevel(currentLevel.id, true));
  document.getElementById("open-levels").addEventListener("click", () => {
    document.getElementById("stage-wrap").scrollIntoView({ behavior: "smooth", block: "center" });
    openMap();
  });
  document.getElementById("cabinet-levels").addEventListener("click", () => openMap());
  document.getElementById("close-levels").addEventListener("click", () => {
    const modal = document.getElementById("level-modal");
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    if (gameMode === "paused") gameMode = modeBeforeMap;
  });
  document.getElementById("retry-level").addEventListener("click", () => setLevel(currentLevel.id, true));
  document.getElementById("next-level").addEventListener("click", () => {
    if (currentLevel.id < 30) setLevel(Math.min(currentLevel.id + 1, progress.unlocked), true);
    else setLevel(1, true);
  });
  document.getElementById("wind-button").addEventListener("click", () => {
    windOn = !windOn;
    document.getElementById("wind-button").classList.toggle("is-on", windOn);
    toast(windOn ? t("wind-on") : t("wind-off"));
    if (windOn) playTone(400, .11, "sine", .025);
  });
  document.querySelectorAll(".flavor-card").forEach((card) => card.addEventListener("click", () => chooseProduct(card.dataset.product)));

  function showResult(won) {
    gameMode = won ? "won" : "lost";
    characterMood = won ? "happy" : "sad";
    const modal = document.getElementById("result-modal");
    const title = document.getElementById("result-title");
    const copy = document.getElementById("result-copy");
    title.textContent = t(won ? "win-title" : "lose-title");
    copy.textContent = won ? (currentLevel.id === 1 ? t("win-copy") : (currentLevel.stars.filter((s) => s.collected).length === 3 ? t("all-stars") : t("win-copy-more"))) : t("lose-copy");
    document.getElementById("next-level").style.display = won ? "flex" : "none";
    document.getElementById("retry-level").textContent = won ? (language === "kk" ? "ҚАЙТА ОЙНАУ" : "ИГРАТЬ СНОВА") : t("retry");
    if (won) {
      winAnimationAt = performance.now();
      const animationId = winAnimationAt;
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      window.setTimeout(() => {
        if (gameMode !== "won" || winAnimationAt !== animationId) return;
        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");
      }, 1250);
      const stars = Math.max(1, currentLevel.stars.filter((s) => s.collected).length);
      progress.stars[currentLevel.id] = Math.max(Number(progress.stars[currentLevel.id]) || 0, stars);
      progress.unlocked = Math.max(progress.unlocked, Math.min(30, currentLevel.id + 1));
      saveProgress();
      burst(306, 545, chapters[currentLevel.chapterIndex].color, 30);
      burst(270, 536, "#f4c344", 18);
      playWin();
      renderLevelMap();
    } else {
      winAnimationAt = 0;
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      playTone(180, .22, "sawtooth", .02);
    }
    updateHudStars();
  }

  function update(dt) {
    const safeDt = Math.min(2, dt / 16.667);
    idleTime += dt;
    blinkTimer += dt;
    windPhase += dt * .0024;
    currentLevel.platforms.forEach((platform) => {
      if (platform.moving) platform.x = platform.originX + Math.sin(idleTime * .0013 + platform.phase) * 34;
    });
    currentLevel.bubbles.forEach((bubble) => {
      if (bubble.homeY === undefined) bubble.homeY = bubble.y;
      if (bubble.active) bubble.y = bubble.homeY + Math.sin(idleTime * .0021 + bubble.x) * 7;
    });
    if (gameMode === "playing") {
      can.vy += currentLevel.gravity * safeDt;
      if (windOn) {
        const zone = currentLevel.wind;
        if (can.x > zone.x - 20 && can.x < zone.x + zone.w + 20 && can.y > zone.y - 20 && can.y < zone.y + zone.h) {
          can.vx += (.22 + Math.sin(windPhase * 1.7) * .1) * safeDt;
          can.vy -= .12 * safeDt;
        }
      }
      can.x += can.vx * safeDt;
      can.y += can.vy * safeDt;

      currentLevel.ropes.forEach((rope) => {
        if (!rope.alive) return;
        const dx = can.x - rope.anchor.x;
        const dy = can.y - rope.anchor.y;
        const dist = Math.hypot(dx, dy);
        if (dist > rope.length) {
          const nx = dx / Math.max(1, dist);
          const ny = dy / Math.max(1, dist);
          can.x = rope.anchor.x + nx * rope.length;
          can.y = rope.anchor.y + ny * rope.length;
          const radial = can.vx * nx + can.vy * ny;
          if (radial > 0) {
            can.vx -= radial * nx;
            can.vy -= radial * ny;
          }
        }
      });

      currentLevel.platforms.forEach((platform) => {
        const radius = 25;
        const prevY = can.y - can.vy * safeDt;
        if (can.vy > 0 && prevY + radius <= platform.y && can.y + radius >= platform.y &&
            can.x > platform.x - radius && can.x < platform.x + platform.w + radius) {
          can.y = platform.y - radius;
          can.vy = -Math.max(platform.spring ? 2.15 : .7, Math.abs(can.vy) * (platform.spring ? 1.08 : .58));
          can.vx *= .82;
          can.bounce++;
          if (platform.spring) {
            burst(can.x, platform.y, chapters[currentLevel.chapterIndex].color, 7);
            cameraShake = Math.max(cameraShake, 2.1);
            playTone(520, .06, "sine", .025);
          }
        }
      });

      currentLevel.bubbles.forEach((bubble) => {
        if (!bubble.active || Math.hypot(can.x - bubble.x, can.y - bubble.y) > bubble.r + 25) return;
        bubble.active = false;
        can.vy = -3.4;
        can.vx += Math.sign(currentLevel.goal.x - can.x) * .72;
        can.bounce++;
        burst(bubble.x, bubble.y, "#8be4ed", 17);
        cameraShake = Math.max(cameraShake, 2.6);
        playTone(1040, .09, "sine", .035);
      });

      currentLevel.stars.forEach((star) => {
        if (star.collected) return;
        if (Math.hypot(can.x - star.x, can.y - star.y) < 40) {
          star.collected = true;
          burst(star.x, star.y, "#f4bd38", 12);
          cameraShake = Math.max(cameraShake, 1.25);
          playSparkle();
          toast(t("star"));
          updateHudStars();
        }
      });

      if (Math.hypot(can.x - currentLevel.goal.x, can.y - currentLevel.goal.y) < 58) {
        can.x = currentLevel.goal.x;
        can.y = currentLevel.goal.y - 17;
        can.vx = 0;
        can.vy = 0;
        showResult(true);
        return;
      }

      currentLevel.hazards.forEach((hazard) => {
        if (Math.hypot(can.x - hazard.x, can.y - hazard.y) < hazard.r + 19) showResult(false);
      });

      can.vx *= Math.pow(.997, safeDt);
      can.angle += can.vx * .003 * safeDt;
      if (canTrail.length === 0 || Math.hypot(can.x - canTrail[canTrail.length - 1].x, can.y - canTrail[canTrail.length - 1].y) > 5) {
        canTrail.push({ x: can.x, y: can.y, life: 1 });
        if (canTrail.length > 15) canTrail.shift();
      }
      if (can.x < -35 || can.x > W + 35 || can.y > H + 30) showResult(false);
      else if (can.y + 26 > currentLevel.floor && can.vy > 0) {
        can.y = currentLevel.floor - 26;
        can.vy = -can.vy * .38;
        can.vx *= .7;
        can.bounce++;
        if (can.bounce >= 4) showResult(false);
      }
    } else if (gameMode === "ready") {
      can.x = currentLevel.start.x + Math.sin(idleTime * .0012) * 5;
      can.y = currentLevel.start.y + Math.sin(idleTime * .002) * 3;
      can.angle = Math.sin(idleTime * .0012) * .04;
    } else if (gameMode === "won") {
      const elapsed = Math.max(0, (performance.now() - winAnimationAt) / 1000);
      const catchProgress = Math.max(0, Math.min(1, (elapsed - .22) / .62));
      const easedCatch = catchProgress * catchProgress * (3 - 2 * catchProgress);
      can.x = currentLevel.goal.x;
      can.y = currentLevel.goal.y - 17 + easedCatch * 39 + Math.sin(idleTime * .006) * (1 - easedCatch) * 1.8;
      can.scale = 1 - easedCatch * .48;
      can.angle = Math.sin(idleTime * .006) * (1 - easedCatch) * .08;
    }
    particles = particles.filter((p) => p.life > 0);
    particles.forEach((p) => {
      p.x += p.vx * safeDt;
      p.y += p.vy * safeDt;
      p.vy += .035 * safeDt;
      p.life -= safeDt;
    });
    ropeSnapEffects = ropeSnapEffects.filter((effect) => effect.life > 0);
    ropeSnapEffects.forEach((effect) => { effect.life -= safeDt; });
    cameraShake *= Math.pow(.74, safeDt);
  }

  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const width = Math.max(1, Math.round(rect.width * dpr));
    const height = Math.max(1, Math.round(rect.height * dpr));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
    canvasScale = Math.min(width / W, height / H);
    canvasOffsetX = (width - W * canvasScale) / 2;
    canvasOffsetY = (height - H * canvasScale) / 2;
  }

  function drawBackground(time) {
    const chapter = chapters[currentLevel.chapterIndex];
    if (scenery.complete && scenery.naturalWidth) {
      const sourceWidth = Math.min(scenery.naturalWidth, scenery.naturalHeight * W / H);
      const sourceX = (scenery.naturalWidth - sourceWidth) / 2;
      ctx.drawImage(scenery, sourceX, 0, sourceWidth, scenery.naturalHeight, 0, 0, W, H);
    } else {
      const fallback = ctx.createLinearGradient(0, 0, 0, H);
      fallback.addColorStop(0, "#8bd4ec");
      fallback.addColorStop(.72, "#e6f7e8");
      fallback.addColorStop(1, "#8fc98e");
      ctx.fillStyle = fallback;
      ctx.fillRect(0, 0, W, H);
    }

    ctx.save();
    ctx.globalAlpha = .1;
    ctx.fillStyle = chapter.background;
    ctx.fillRect(0, 0, W, H);
    ctx.restore();

    ctx.save();
    ctx.globalAlpha = .32;
    bgSpecks.forEach((dot) => {
      const y = (dot.y + Math.sin(time * .00035 + dot.phase) * 8 + H) % H;
      ctx.beginPath();
      ctx.fillStyle = dot.phase % 2 > 1 ? "#ffffff" : "#f9e4ad";
      ctx.arc(dot.x, y, dot.r, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();

    ctx.strokeStyle = "rgba(255,255,255,.25)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 650);
    ctx.quadraticCurveTo(W / 2, 646, W, 650);
    ctx.stroke();
  }

  function drawPlatform(platform) {
    ctx.save();
    ctx.fillStyle = "rgba(37,112,142,.13)";
    roundRect(ctx, platform.x, platform.y + 5, platform.w, platform.h, 8);
    ctx.fill();
    const gradient = ctx.createLinearGradient(platform.x, platform.y, platform.x, platform.y + platform.h);
    gradient.addColorStop(0, platform.spring ? "#f2c64c" : "#fffdf6");
    gradient.addColorStop(1, platform.spring ? "#e8a52c" : "#cfebf3");
    ctx.fillStyle = gradient;
    roundRect(ctx, platform.x, platform.y, platform.w, platform.h, 8);
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,.84)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(platform.x + 8, platform.y + 3);
    ctx.lineTo(platform.x + platform.w - 8, platform.y + 3);
    ctx.stroke();
    if (platform.spring) {
      ctx.strokeStyle = "rgba(255,255,255,.8)";
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      const mid = platform.x + platform.w / 2;
      ctx.moveTo(mid - 15, platform.y + 8);
      ctx.lineTo(mid - 7, platform.y + 4);
      ctx.lineTo(mid + 1, platform.y + 10);
      ctx.lineTo(mid + 9, platform.y + 4);
      ctx.lineTo(mid + 17, platform.y + 8);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawStar(x, y, size, time, collected) {
    ctx.save();
    const pulse = collected ? .83 : 1 + Math.sin(time * .004 + x) * .09;
    ctx.translate(x, y);
    ctx.rotate(time * .0007 + x * .01);
    ctx.scale(pulse, pulse);
    ctx.beginPath();
    for (let i = 0; i < 10; i++) {
      const radius = i % 2 ? size * .43 : size;
      const angle = -Math.PI / 2 + i * Math.PI / 5;
      const px = Math.cos(angle) * radius;
      const py = Math.sin(angle) * radius;
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fillStyle = collected ? "rgba(241,187,53,.23)" : "#ffd055";
    ctx.fill();
    if (!collected) {
      ctx.strokeStyle = "rgba(255,255,255,.9)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawGoal() {
    const goal = currentLevel.goal;
    ctx.save();
    ctx.globalAlpha = .35;
    ctx.fillStyle = "#f7c448";
    ctx.beginPath();
    ctx.arc(goal.x, goal.y - 5, 39 + Math.sin(lastFrame * .004) * 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    ctx.beginPath();
    ctx.strokeStyle = "rgba(241,190,66,.82)";
    ctx.lineWidth = 2;
    ctx.setLineDash([3, 4]);
    ctx.arc(goal.x, goal.y - 5, 36, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  function drawRopes() {
    currentLevel.ropes.forEach((rope) => {
      if (!rope.alive) return;
      const a = rope.anchor;
      const midx = (a.x + can.x) / 2;
      const midy = (a.y + can.y) / 2;
      ctx.save();
      ctx.strokeStyle = "rgba(90,122,135,.46)";
      ctx.lineWidth = 3.1;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.quadraticCurveTo(midx - 3, midy + 4, can.x, can.y - 26);
      ctx.stroke();
      ctx.strokeStyle = "rgba(255,255,255,.84)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.quadraticCurveTo(midx - 3, midy + 4, can.x, can.y - 26);
      ctx.stroke();
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(a.x, a.y, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(76,123,146,.45)";
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.restore();
    });
  }

  function drawWind() {
    if (!windOn) return;
    const z = currentLevel.wind;
    ctx.save();
    ctx.fillStyle = "rgba(255,255,255,.11)";
    roundRect(ctx, z.x, z.y, z.w, z.h, 22);
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,.72)";
    ctx.setLineDash([4, 6]);
    ctx.lineWidth = 1.3;
    ctx.stroke();
    ctx.setLineDash([]);
    for (let i = 0; i < 4; i++) {
      const y = z.y + 20 + i * 37 + (windPhase * 25 % 26);
      const x = z.x + 22 + (i % 2) * 28;
      ctx.strokeStyle = "rgba(255,255,255,.86)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x, y + 16);
      ctx.quadraticCurveTo(x - 7, y + 7, x, y);
      ctx.lineTo(x - 5, y + 5);
      ctx.moveTo(x, y);
      ctx.lineTo(x + 5, y + 5);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawBubbles(time) {
    currentLevel.bubbles.forEach((bubble) => {
      if (!bubble.active) return;
      const pulse = 1 + Math.sin(time * .004 + bubble.x) * .08;
      ctx.save();
      ctx.translate(bubble.x, bubble.y);
      ctx.scale(pulse, pulse);
      const fill = ctx.createRadialGradient(-6, -8, 2, 0, 0, bubble.r + 5);
      fill.addColorStop(0, "rgba(255,255,255,.9)");
      fill.addColorStop(.38, "rgba(198,249,255,.72)");
      fill.addColorStop(1, "rgba(82,192,221,.18)");
      ctx.fillStyle = fill;
      ctx.strokeStyle = "rgba(255,255,255,.88)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, bubble.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "rgba(255,255,255,.86)";
      ctx.beginPath();
      ctx.ellipse(-bubble.r * .35, -bubble.r * .38, bubble.r * .23, bubble.r * .12, -.6, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(bubble.r * .39, bubble.r * .35, 2.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  }

  function drawCanTrail() {
    canTrail.forEach((point, index) => {
      const intensity = (index + 1) / canTrail.length;
      ctx.save();
      ctx.globalAlpha = intensity * .22;
      ctx.fillStyle = chapters[currentLevel.chapterIndex].color;
      ctx.beginPath();
      ctx.ellipse(point.x, point.y, 5 + intensity * 5, 9 + intensity * 9, can.angle, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  }

  function drawRopeSnaps(time) {
    ropeSnapEffects.forEach((effect) => {
      const amount = effect.life / effect.maxLife;
      ctx.save();
      ctx.translate(effect.x, effect.y);
      ctx.rotate(effect.angle);
      ctx.globalAlpha = amount;
      ctx.strokeStyle = "#f3b438";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(-17 - (1 - amount) * 7, 0);
      ctx.lineTo(-4, 0);
      ctx.moveTo(4, 0);
      ctx.lineTo(17 + (1 - amount) * 7, 0);
      ctx.stroke();
      ctx.strokeStyle = "rgba(255,255,255,.95)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(-2, -7);
      ctx.lineTo(2, -1);
      ctx.lineTo(-2, 4);
      ctx.lineTo(2, 9);
      ctx.stroke();
      ctx.restore();
    });
    if (pointerLine && Math.hypot(pointerLine.to.x - pointerLine.from.x, pointerLine.to.y - pointerLine.from.y) > 6) {
      ctx.save();
      ctx.globalAlpha = .52;
      ctx.strokeStyle = "rgba(255,255,255,.95)";
      ctx.lineWidth = 1.1;
      ctx.beginPath();
      ctx.moveTo(pointerLine.from.x, pointerLine.from.y - 2);
      ctx.lineTo(pointerLine.to.x, pointerLine.to.y - 2);
      ctx.stroke();
      ctx.restore();
    }
  }

  function drawHazards() {
    currentLevel.hazards.forEach((hazard) => {
      ctx.save();
      ctx.translate(hazard.x, hazard.y);
      ctx.fillStyle = "rgba(230,102,84,.18)";
      ctx.beginPath();
      ctx.arc(0, 0, hazard.r + 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#df7164";
      ctx.beginPath();
      ctx.moveTo(-hazard.r, hazard.r * .7);
      ctx.lineTo(0, -hazard.r);
      ctx.lineTo(hazard.r, hazard.r * .7);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,.72)";
      ctx.beginPath();
      ctx.arc(0, 3, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  }

  function drawZigi(time) {
    const x = 306;
    const baseY = 612;
    let bob = Math.sin(time * .0032) * 2;
    let scaleX = 1;
    let scaleY = 1;
    let rotation = 0;
    if (characterMood === "happy") {
      const elapsed = Math.max(0, (time - winAnimationAt) / 1000);
      if (reducedMotion) {
        bob = -Math.abs(Math.sin(elapsed * 3)) * 3;
      } else if (elapsed < .22) {
        const crouch = elapsed / .22;
        bob = crouch * 8;
        scaleX = 1 + crouch * .12;
        scaleY = 1 - crouch * .14;
      } else if (elapsed < .9) {
        const leap = (elapsed - .22) / .68;
        const arc = Math.sin(leap * Math.PI);
        bob = 8 - arc * 52;
        scaleX = 1 + arc * .035;
        scaleY = 1 + arc * .07;
        rotation = Math.sin(leap * Math.PI * 2) * .045;
      } else if (elapsed < 1.18) {
        const landing = (elapsed - .9) / .28;
        bob = 8 * (1 - landing);
        scaleX = 1.03 - landing * .08;
        scaleY = .93 + landing * .07;
        rotation = Math.sin(elapsed * 15) * .02;
      } else {
        const cheer = elapsed - 1.18;
        bob = -Math.abs(Math.sin(cheer * 8)) * 6;
        scaleY = 1 + Math.sin(cheer * 8) * .025;
      }
    } else if (characterMood === "worried") {
      bob = Math.sin(time * .016) * 4;
    }
    if (barysMascot.complete && barysMascot.naturalWidth) {
      ctx.save();
      ctx.translate(x, 649 + bob);
      ctx.rotate(reducedMotion ? 0 : rotation + (characterMood === "happy" ? Math.sin(time * .006) * .02 : Math.sin(time * .002) * .012));
      ctx.scale(scaleX, scaleY);
      ctx.fillStyle = "rgba(44,109,126,.2)";
      ctx.beginPath();
      ctx.ellipse(0, -3, 43, 8, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.drawImage(barysMascot, -59, -132, 118, 132);
      ctx.restore();
      return;
    }
    ctx.save();
    ctx.translate(x, baseY + bob);
    ctx.scale(1, scaleY);
    ctx.fillStyle = "rgba(44,109,126,.15)";
    ctx.beginPath();
    ctx.ellipse(0, 34, 47, 10, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#e5ad32";
    roundRect(ctx, -26, 19, 16, 22, 7);
    ctx.fill();
    roundRect(ctx, 11, 19, 16, 22, 7);
    ctx.fill();
    ctx.fillStyle = "#f3c34a";
    ctx.beginPath();
    ctx.ellipse(-18, 39, 13, 6, -.1, 0, Math.PI * 2);
    ctx.ellipse(19, 39, 13, 6, .1, 0, Math.PI * 2);
    ctx.fill();

    const body = ctx.createLinearGradient(-35, -35, 32, 40);
    body.addColorStop(0, "#4eb9ad");
    body.addColorStop(.55, "#168fa2");
    body.addColorStop(1, "#087087");
    ctx.fillStyle = body;
    ctx.beginPath();
    ctx.ellipse(0, 0, 41, 46, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,.32)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(-8, -8, 30, 35, -.12, Math.PI * 1.1, Math.PI * 1.65);
    ctx.stroke();

    ctx.fillStyle = "#168fa2";
    ctx.beginPath();
    ctx.ellipse(-39, 0, 10, 17, -.32, 0, Math.PI * 2);
    ctx.ellipse(39, 0, 10, 17, .32, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#f6c450";
    ctx.beginPath();
    ctx.ellipse(-40, 6, 4, 8, -.3, 0, Math.PI * 2);
    ctx.ellipse(40, 6, 4, 8, .3, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#076c82";
    ctx.beginPath();
    ctx.moveTo(-30, -27);
    ctx.lineTo(-34, -47);
    ctx.lineTo(-18, -40);
    ctx.lineTo(-10, -60);
    ctx.lineTo(2, -42);
    ctx.lineTo(15, -53);
    ctx.lineTo(19, -34);
    ctx.lineTo(32, -36);
    ctx.lineTo(29, -17);
    ctx.quadraticCurveTo(0, -28, -30, -17);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#f5c448";
    ctx.beginPath();
    ctx.moveTo(-23, -27);
    ctx.lineTo(-26, -38);
    ctx.lineTo(-16, -33);
    ctx.lineTo(-9, -47);
    ctx.lineTo(0, -34);
    ctx.lineTo(12, -43);
    ctx.lineTo(14, -27);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#fff";
    const blink = blinkTimer % 4200 > 4010 && blinkTimer % 4200 < 4070;
    if (blink) {
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(-20, -5);
      ctx.lineTo(-8, -5);
      ctx.moveTo(8, -5);
      ctx.lineTo(20, -5);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.ellipse(-14, -6, 9, 12, -.08, 0, Math.PI * 2);
      ctx.ellipse(14, -6, 9, 12, .08, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#173c56";
      const eyeShift = characterMood === "worried" ? 1 : 2;
      ctx.beginPath();
      ctx.arc(-12 + eyeShift, -4, 4.4, 0, Math.PI * 2);
      ctx.arc(16 + eyeShift, -4, 4.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(-13 + eyeShift, -6, 1.5, 0, Math.PI * 2);
      ctx.arc(15 + eyeShift, -6, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = "rgba(247,135,119,.6)";
    ctx.beginPath();
    ctx.ellipse(-27, 8, 6, 3.5, 0, 0, Math.PI * 2);
    ctx.ellipse(28, 8, 6, 3.5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#063f56";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.beginPath();
    if (characterMood === "sad") {
      ctx.arc(0, 17, 8, Math.PI * 1.12, Math.PI * 1.88);
    } else if (characterMood === "worried") {
      ctx.ellipse(1, 15, 4, 6, 0, 0, Math.PI * 2);
    } else {
      ctx.arc(0, 7, 9, .18, Math.PI - .18);
    }
    ctx.stroke();

    ctx.strokeStyle = "#087287";
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    ctx.beginPath();
    const armLift = characterMood === "happy" ? -25 : characterMood === "excited" ? -13 : 0;
    ctx.moveTo(-32, 5);
    ctx.quadraticCurveTo(-48, -2 + armLift, -45, -17 + armLift);
    ctx.moveTo(32, 5);
    ctx.quadraticCurveTo(48, -2 + armLift, 45, -17 + armLift);
    ctx.stroke();
    ctx.fillStyle = "#50b9ad";
    ctx.beginPath();
    ctx.arc(-45, -17 + armLift, 7, 0, Math.PI * 2);
    ctx.arc(45, -17 + armLift, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawCan() {
    const image = assetCanvases[selectedProduct] || assetCanvases[chapters[currentLevel.chapterIndex].product];
    ctx.save();
    ctx.translate(can.x, can.y);
    ctx.rotate(can.angle);
    ctx.scale(can.scale || 1, can.scale || 1);
    ctx.shadowColor = "rgba(28,75,97,.24)";
    ctx.shadowBlur = 14;
    ctx.shadowOffsetY = 7;
    if (image) {
      const ratio = image.width / image.height;
      const height = 118;
      const width = Math.min(68, Math.max(42, height * ratio));
      ctx.drawImage(image, -width / 2, -height / 2, width, height);
    } else {
      const grad = ctx.createLinearGradient(-28, 0, 28, 0);
      const colors = selectedProduct === "mango"
        ? ["#c98627", "#ffd059", "#e66b34"]
        : selectedProduct === "strawberry" ? ["#a8203d", "#ee5265", "#ff92a0"] : ["#0876a9", "#28a8ce", "#0876a9"];
      grad.addColorStop(0, colors[0]);
      grad.addColorStop(.4, colors[1]);
      grad.addColorStop(1, colors[2]);
      ctx.fillStyle = grad;
      roundRect(ctx, -25, -55, 50, 110, 11);
      ctx.fill();
      ctx.fillStyle = "#d8e2e5";
      ctx.fillRect(-21, -57, 42, 5);
      ctx.fillStyle = "rgba(255,255,255,.9)";
      ctx.textAlign = "center";
      ctx.font = "900 9px Nunito";
      ctx.fillText(t(products[selectedProduct].key).toUpperCase(), 0, -6);
      ctx.font = "700 7px Manrope";
      ctx.fillText("ZIGI-ZAGI", 0, 10);
    }
    ctx.restore();
  }

  function drawParticles() {
    particles.forEach((p) => {
      const alpha = Math.max(0, p.life / p.maxLife);
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = p.color;
      if (p.type === "star") drawStar(p.x, p.y, p.size, lastFrame, false);
      else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    });
  }

  function drawPointer() {
    if (!pointerLine) return;
    ctx.save();
    ctx.strokeStyle = "rgba(248,185,48,.88)";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(pointerLine.from.x, pointerLine.from.y);
    ctx.lineTo(pointerLine.to.x, pointerLine.to.y);
    ctx.stroke();
    ctx.restore();
  }

  function draw(time) {
    resizeCanvas();
    ctx.setTransform(canvasScale, 0, 0, canvasScale, canvasOffsetX, canvasOffsetY);
    ctx.clearRect(0, 0, W, H);
    ctx.save();
    if (cameraShake > .15) ctx.translate((Math.random() - .5) * cameraShake, (Math.random() - .5) * cameraShake);
    drawBackground(time);
    drawGoal();
    currentLevel.platforms.forEach(drawPlatform);
    drawWind();
    drawBubbles(time);
    drawHazards();
    currentLevel.stars.forEach((star) => drawStar(star.x, star.y, 13, time, star.collected));
    drawRopes();
    drawCanTrail();
    if (gameMode === "won") {
      drawZigi(time);
      drawCan();
    } else {
      drawCan();
      drawZigi(time);
    }
    drawParticles();
    drawPointer();
    drawRopeSnaps(time);
    ctx.restore();
  }

  function frame(now) {
    const dt = Math.min(40, now - lastFrame);
    update(dt || 16);
    draw(now);
    lastFrame = now;
    requestAnimationFrame(frame);
  }

  function roundRect(context, x, y, width, height, radius) {
    const r = Math.min(radius, width / 2, height / 2);
    context.beginPath();
    context.moveTo(x + r, y);
    context.arcTo(x + width, y, x + width, y + height, r);
    context.arcTo(x + width, y + height, x, y + height, r);
    context.arcTo(x, y + height, x, y, r);
    context.arcTo(x, y, x + width, y, r);
    context.closePath();
  }

  function makeCutout(sourceCanvas, backgroundMode) {
    const width = sourceCanvas.width;
    const height = sourceCanvas.height;
    const sourceContext = sourceCanvas.getContext("2d", { willReadFrequently: true });
    const imageData = sourceContext.getImageData(0, 0, width, height);
    const data = imageData.data;
    const total = width * height;
    const visited = new Uint8Array(total);
    const queue = new Int32Array(total);
    let head = 0;
    let tail = 0;
    function isBackground(index) {
      const pos = index * 4;
      const r = data[pos], g = data[pos + 1], b = data[pos + 2];
      if (backgroundMode === "dark") return Math.max(r, g, b) < 47;
      return Math.min(r, g, b) > 239 && Math.max(r, g, b) - Math.min(r, g, b) < 35;
    }
    function enqueue(index) {
      if (index < 0 || index >= total || visited[index] || !isBackground(index)) return;
      visited[index] = 1;
      queue[tail++] = index;
    }
    for (let x = 0; x < width; x++) {
      enqueue(x);
      enqueue((height - 1) * width + x);
    }
    for (let y = 0; y < height; y++) {
      enqueue(y * width);
      enqueue(y * width + width - 1);
    }
    while (head < tail) {
      const index = queue[head++];
      data[index * 4 + 3] = 0;
      const x = index % width;
      if (x > 0) enqueue(index - 1);
      if (x + 1 < width) enqueue(index + 1);
      if (index >= width) enqueue(index - width);
      if (index + width < total) enqueue(index + width);
    }
    sourceContext.putImageData(imageData, 0, 0);
    let minX = width, minY = height, maxX = 0, maxY = 0;
    const scan = sourceContext.getImageData(0, 0, width, height).data;
    for (let y = 0; y < height; y += 2) {
      for (let x = 0; x < width; x += 2) {
        if (scan[(y * width + x) * 4 + 3] > 12) {
          minX = Math.min(minX, x); minY = Math.min(minY, y);
          maxX = Math.max(maxX, x); maxY = Math.max(maxY, y);
        }
      }
    }
    const pad = 4;
    minX = Math.max(0, minX - pad); minY = Math.max(0, minY - pad);
    maxX = Math.min(width - 1, maxX + pad); maxY = Math.min(height - 1, maxY + pad);
    const cropped = document.createElement("canvas");
    cropped.width = Math.max(1, maxX - minX + 1);
    cropped.height = Math.max(1, maxY - minY + 1);
    cropped.getContext("2d").drawImage(sourceCanvas, minX, minY, cropped.width, cropped.height, 0, 0, cropped.width, cropped.height);
    return cropped;
  }

  function loadAssets() {
    Object.keys(products).forEach((id) => {
      const product = products[id];
      if (!product.image) return;
      const image = new Image();
      image.onload = () => {
        const offscreen = document.createElement("canvas");
        offscreen.width = image.naturalWidth;
        offscreen.height = image.naturalHeight;
        const offCtx = offscreen.getContext("2d");
        offCtx.drawImage(image, 0, 0);
        try {
          assetCanvases[id] = makeCutout(offscreen, product.bg);
          const cardImage = document.querySelector('.flavor-card[data-product="' + id + '"] img');
          if (cardImage) cardImage.src = assetCanvases[id].toDataURL("image/png");
        } catch (_) {
          assetCanvases[id] = offscreen;
        }
      };
      image.onerror = () => {
        const card = document.querySelector('.flavor-card[data-product="' + id + '"] .flavor-image-frame');
        if (card) card.classList.add("image-unavailable");
      };
      image.src = "assets/" + product.image;
      assetImages[id] = image;
    });
  }

  window.addEventListener("resize", resizeCanvas, { passive: true });
  window.addEventListener("orientationchange", () => setTimeout(resizeCanvas, 100), { passive: true });

  applyLanguage();
  loadAssets();
  resizeCanvas();
  requestAnimationFrame(frame);
})();
