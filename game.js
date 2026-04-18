const boardElement = document.getElementById("board");
const trayElement = document.getElementById("tray");
const remainingCountElement = document.getElementById("remainingCount");
const comboCountElement = document.getElementById("comboCount");
const trayCountElement = document.getElementById("trayCount");
const messageBoxElement = document.getElementById("messageBox");
const restartButton = document.getElementById("restartButton");
const hintButton = document.getElementById("hintButton");
const audioToggleButton = document.getElementById("audioToggleButton");
const volumeRange = document.getElementById("volumeRange");
const overlayElement = document.getElementById("overlay");
const overlayKickerElement = document.getElementById("overlayKicker");
const overlayTitleElement = document.getElementById("overlayTitle");
const overlayTextElement = document.getElementById("overlayText");
const overlayButton = document.getElementById("overlayButton");
const playfieldStageElement = document.querySelector(".playfield-stage");
const trayPanelElement = document.getElementById("trayPanel");
const confettiLayerElement = document.getElementById("confettiLayer");

const boardBaseWidth = 720;
const boardBaseHeight = 520;
const audioSettingsKey = "meadow-match-audio-settings";
const bgmNotePattern = [261.63, 329.63, 392, 329.63, 293.66, 349.23, 440, 349.23, 261.63, 329.63, 392, 523.25];
const typeSoundProfiles = {
  "青草": { base: 520, wave: "sine", accent: 660 },
  "苹果": { base: 560, wave: "triangle", accent: 740 },
  "胡萝卜": { base: 500, wave: "square", accent: 670 },
  "花朵": { base: 610, wave: "triangle", accent: 820 },
  "草莓": { base: 575, wave: "triangle", accent: 760 },
  "葡萄": { base: 545, wave: "sine", accent: 710 },
  "柠檬": { base: 640, wave: "square", accent: 860 },
  "蘑菇": { base: 470, wave: "sine", accent: 620 },
  "铃铛": { base: 700, wave: "triangle", accent: 920 },
  "叶片": { base: 530, wave: "sine", accent: 690 },
  "四叶草": { base: 600, wave: "triangle", accent: 800 },
  "玉米": { base: 510, wave: "square", accent: 680 }
};
const layerVisualOffsets = {
  0: { x: 0, y: 0 },
  1: { x: 9, y: -7 },
  2: { x: -8, y: 8 },
  3: { x: 10, y: 10 },
  4: { x: -10, y: -9 }
};
let resizeRafId = null;
let stageResizeObserver = null;
let audioContext = null;
let audioUnlocked = false;
let bgmTimerId = null;
let bgmStep = 0;

const trayLimit = 7;
const tileTypes = [
  { name: "青草", icon: "🌿" },
  { name: "苹果", icon: "🍎" },
  { name: "胡萝卜", icon: "🥕" },
  { name: "花朵", icon: "🌼" },
  { name: "草莓", icon: "🍓" },
  { name: "葡萄", icon: "🍇" },
  { name: "柠檬", icon: "🍋" },
  { name: "蘑菇", icon: "🍄" },
  { name: "铃铛", icon: "🔔" },
  { name: "叶片", icon: "🍃" },
  { name: "四叶草", icon: "☘️" },
  { name: "玉米", icon: "🌽" }
];

const layout = [
  { x: 34, y: 220, layer: 0 },
  { x: 112, y: 220, layer: 0 },
  { x: 190, y: 220, layer: 0 },
  { x: 268, y: 220, layer: 0 },
  { x: 346, y: 220, layer: 0 },
  { x: 424, y: 220, layer: 0 },
  { x: 502, y: 220, layer: 0 },
  { x: 580, y: 220, layer: 0 },
  { x: 73, y: 144, layer: 0 },
  { x: 151, y: 144, layer: 0 },
  { x: 229, y: 144, layer: 0 },
  { x: 307, y: 144, layer: 0 },
  { x: 385, y: 144, layer: 0 },
  { x: 463, y: 144, layer: 0 },
  { x: 541, y: 144, layer: 0 },
  { x: 73, y: 296, layer: 0 },
  { x: 151, y: 296, layer: 0 },
  { x: 229, y: 296, layer: 0 },
  { x: 307, y: 296, layer: 0 },
  { x: 385, y: 296, layer: 0 },
  { x: 463, y: 296, layer: 0 },
  { x: 541, y: 296, layer: 0 },
  { x: 112, y: 68, layer: 0 },
  { x: 190, y: 68, layer: 0 },
  { x: 268, y: 68, layer: 0 },
  { x: 346, y: 68, layer: 0 },
  { x: 424, y: 68, layer: 0 },
  { x: 502, y: 68, layer: 0 },
  { x: 112, y: 372, layer: 0 },
  { x: 190, y: 372, layer: 0 },
  { x: 268, y: 372, layer: 0 },
  { x: 346, y: 372, layer: 0 },
  { x: 424, y: 372, layer: 0 },
  { x: 502, y: 372, layer: 0 },
  { x: 112, y: 220, layer: 1 },
  { x: 190, y: 220, layer: 1 },
  { x: 268, y: 220, layer: 1 },
  { x: 346, y: 220, layer: 1 },
  { x: 424, y: 220, layer: 1 },
  { x: 502, y: 220, layer: 1 },
  { x: 151, y: 144, layer: 1 },
  { x: 229, y: 144, layer: 1 },
  { x: 307, y: 144, layer: 1 },
  { x: 385, y: 144, layer: 1 },
  { x: 463, y: 144, layer: 1 },
  { x: 151, y: 296, layer: 1 },
  { x: 229, y: 296, layer: 1 },
  { x: 307, y: 296, layer: 1 },
  { x: 385, y: 296, layer: 1 },
  { x: 463, y: 296, layer: 1 },
  { x: 190, y: 106, layer: 2 },
  { x: 268, y: 106, layer: 2 },
  { x: 346, y: 106, layer: 2 },
  { x: 424, y: 106, layer: 2 },
  { x: 190, y: 258, layer: 2 },
  { x: 268, y: 258, layer: 2 },
  { x: 346, y: 258, layer: 2 },
  { x: 424, y: 258, layer: 2 },
  { x: 307, y: 334, layer: 2 },
  { x: 229, y: 182, layer: 2 },
  { x: 307, y: 182, layer: 2 },
  { x: 385, y: 182, layer: 2 },
  { x: 229, y: 144, layer: 3 },
  { x: 307, y: 144, layer: 3 },
  { x: 385, y: 144, layer: 3 },
  { x: 229, y: 220, layer: 3 },
  { x: 307, y: 220, layer: 3 },
  { x: 385, y: 220, layer: 3 },
  { x: 268, y: 182, layer: 4 },
  { x: 346, y: 182, layer: 4 },
  { x: 307, y: 258, layer: 4 },
  { x: 307, y: 106, layer: 4 }
];

const state = {
  tiles: [],
  tray: [],
  combo: 0,
  hintTileId: null,
  isResolvingMove: false
};

const audioSettings = {
  muted: false,
  volume: 0.6
};

function loadAudioSettings() {
  try {
    const raw = window.localStorage.getItem(audioSettingsKey);
    if (!raw) {
      return;
    }

    const parsed = JSON.parse(raw);
    if (typeof parsed.muted === "boolean") {
      audioSettings.muted = parsed.muted;
    }
    if (typeof parsed.volume === "number") {
      audioSettings.volume = Math.min(1, Math.max(0, parsed.volume));
    }
  } catch {
    // Ignore invalid persisted settings.
  }
}

function saveAudioSettings() {
  window.localStorage.setItem(audioSettingsKey, JSON.stringify(audioSettings));
}

function syncAudioControls() {
  if (audioToggleButton) {
    audioToggleButton.textContent = audioSettings.muted ? "声音：关" : "声音：开";
    audioToggleButton.setAttribute("aria-pressed", String(audioSettings.muted));
  }

  if (volumeRange) {
    volumeRange.value = String(Math.round(audioSettings.volume * 100));
  }
}

function getAudioContext() {
  if (!window.AudioContext && !window.webkitAudioContext) {
    return null;
  }

  if (!audioContext) {
    const ContextConstructor = window.AudioContext || window.webkitAudioContext;
    audioContext = new ContextConstructor();
  }

  return audioContext;
}

function unlockAudio() {
  const context = getAudioContext();
  if (!context) {
    return;
  }

  if (context.state === "suspended") {
    context.resume();
  }
  audioUnlocked = true;
  startBackgroundMusic();
}

function playTone({ frequency, duration, type = "sine", volume = 0.05, detune = 0, delay = 0 }) {
  const context = getAudioContext();
  if (!context || audioSettings.muted || (!audioUnlocked && context.state !== "running")) {
    return;
  }

  const now = context.currentTime + delay;
  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, now);
  oscillator.detune.setValueAtTime(detune, now);
  const actualVolume = Math.max(0.0001, volume * audioSettings.volume);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(actualVolume, now + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(now);
  oscillator.stop(now + duration + 0.02);
}

function getTypeSoundProfile(typeName) {
  return typeSoundProfiles[typeName] || { base: 560, wave: "sine", accent: 730 };
}

function playCollectSound(tileType) {
  const profile = getTypeSoundProfile(tileType.name);
  playTone({ frequency: profile.base, duration: 0.09, type: profile.wave, volume: 0.024 });
  playTone({ frequency: profile.accent, duration: 0.08, type: "sine", volume: 0.016, delay: 0.03 });
}

function playMatchSound(comboLevel = 1, typeName = "") {
  const profile = getTypeSoundProfile(typeName);
  const comboBoost = Math.min(0.028, Math.max(0, comboLevel - 1) * 0.006);
  playTone({ frequency: profile.accent * 1.1, duration: 0.18, type: "square", volume: 0.07 + comboBoost });
  playTone({ frequency: profile.accent * 1.42, duration: 0.16, type: "triangle", volume: 0.06 + comboBoost, delay: 0.08 });
  playTone({ frequency: profile.accent * 1.86, duration: 0.18, type: "triangle", volume: 0.05 + comboBoost, delay: 0.15 });
  if (comboLevel >= 4) {
    playTone({ frequency: profile.accent * 2.08, duration: 0.2, type: "triangle", volume: 0.045 + comboBoost, delay: 0.22 });
  }
}

function playWinSound() {
  const notes = [523, 659, 784, 1047];
  notes.forEach((frequency, index) => {
    playTone({ frequency, duration: 0.18, type: "triangle", volume: 0.045, delay: index * 0.09 });
  });
}

function playLoseSound() {
  playTone({ frequency: 392, duration: 0.16, type: "sawtooth", volume: 0.03 });
  playTone({ frequency: 311, duration: 0.24, type: "sawtooth", volume: 0.028, delay: 0.1 });
}

function stopBackgroundMusic() {
  if (!bgmTimerId) {
    return;
  }

  window.clearInterval(bgmTimerId);
  bgmTimerId = null;
}

function startBackgroundMusic() {
  const context = getAudioContext();
  if (!context || audioSettings.muted || (!audioUnlocked && context.state !== "running") || bgmTimerId) {
    return;
  }

  const beatMs = 460;
  bgmTimerId = window.setInterval(() => {
    const note = bgmNotePattern[bgmStep % bgmNotePattern.length];
    const accent = bgmStep % 4 === 0;
    playTone({ frequency: note, duration: 0.34, type: "triangle", volume: accent ? 0.03 : 0.022 });
    playTone({ frequency: note / 2, duration: 0.3, type: "sine", volume: accent ? 0.018 : 0.014, delay: 0.03 });
    bgmStep += 1;
  }, beatMs);
}

function launchConfettiBurst(intensity = 1) {
  if (!confettiLayerElement) {
    return;
  }

  const pieceCount = Math.round(70 + Math.min(90, 45 * intensity));
  for (let index = 0; index < pieceCount; index += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    const startX = `${Math.random() * 100}%`;
    const driftX = `${(Math.random() - 0.5) * (220 + intensity * 70)}px`;
    const spin = `${(Math.random() - 0.5) * 840}deg`;
    const fallTime = `${Math.max(1.3, 2.2 - intensity * 0.18) + Math.random() * 1.1}s`;
    const hue = Math.floor(Math.random() * 360);
    piece.style.setProperty("--start-x", startX);
    piece.style.setProperty("--drift-x", driftX);
    piece.style.setProperty("--spin", spin);
    piece.style.setProperty("--fall-time", fallTime);
    piece.style.setProperty("--hue", String(hue));
    confettiLayerElement.appendChild(piece);
    piece.addEventListener("animationend", () => piece.remove(), { once: true });
  }
}

function animateTileToTray(tileId, tileType, trayIndex) {
  const sourceElement = boardElement.querySelector(`.tile[data-id="${tileId}"]`);
  if (!sourceElement || !trayElement) {
    return;
  }

  const sourceRect = sourceElement.getBoundingClientRect();
  const trayRect = trayElement.getBoundingClientRect();
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  sourceElement.classList.add("tile-collecting");
  if (prefersReducedMotion) {
    return;
  }

  const trayStyle = window.getComputedStyle(trayElement);
  const columns = Math.max(1, trayStyle.gridTemplateColumns.split(" ").length);
  const rows = Math.ceil(trayLimit / columns);
  const column = trayIndex % columns;
  const row = Math.floor(trayIndex / columns);

  const cellWidth = trayRect.width / columns;
  const cellHeight = trayRect.height / Math.max(rows, 1);
  const targetX = trayRect.left + cellWidth * column + cellWidth / 2 - sourceRect.width / 2;
  const targetY = trayRect.top + cellHeight * row + cellHeight / 2 - sourceRect.height / 2;

  const ghost = document.createElement("div");
  ghost.className = "tile tile-fly-ghost";
  ghost.style.width = `${sourceRect.width}px`;
  ghost.style.height = `${sourceRect.height}px`;
  ghost.style.left = `${sourceRect.left}px`;
  ghost.style.top = `${sourceRect.top}px`;
  ghost.innerHTML = `<div class="tile-inner"><span>${tileType.icon}</span><span class="tile-label">${tileType.name}</span></div>`;
  document.body.appendChild(ghost);

  const deltaX = targetX - sourceRect.left;
  const deltaY = targetY - sourceRect.top;
  ghost.animate(
    [
      { transform: "translate3d(0,0,0) scale(1)", opacity: 1 },
      { transform: `translate3d(${deltaX}px, ${deltaY}px, 0) scale(0.58) rotate(8deg)`, opacity: 0.72 }
    ],
    {
      duration: 360,
      easing: "cubic-bezier(0.2, 0.75, 0.25, 1)",
      fill: "forwards"
    }
  ).addEventListener("finish", () => {
    ghost.remove();
    trayElement.classList.remove("tray-pop");
    void trayElement.offsetWidth;
    trayElement.classList.add("tray-pop");
  }, { once: true });
}

function updateBoardScale() {
  if (!playfieldStageElement) {
    return;
  }

  const stageStyle = window.getComputedStyle(playfieldStageElement);
  const horizontalPadding = parseFloat(stageStyle.paddingLeft) + parseFloat(stageStyle.paddingRight);
  const availableWidth = Math.max(playfieldStageElement.clientWidth - horizontalPadding, 280);
  const scale = Math.min(1, availableWidth / boardBaseWidth);

  playfieldStageElement.style.setProperty("--board-scale", String(scale));
  playfieldStageElement.style.setProperty("--board-shell-height", `${Math.round(boardBaseHeight * scale)}px`);
}

function scheduleBoardScale() {
  if (resizeRafId !== null) {
    return;
  }

  resizeRafId = window.requestAnimationFrame(() => {
    resizeRafId = null;
    updateBoardScale();
  });
}

function setupResponsiveBoardScale() {
  if (!playfieldStageElement) {
    return;
  }

  if (window.ResizeObserver) {
    stageResizeObserver = new ResizeObserver(() => {
      scheduleBoardScale();
    });
    stageResizeObserver.observe(playfieldStageElement);
  }

  window.addEventListener("resize", scheduleBoardScale);
  window.addEventListener("orientationchange", scheduleBoardScale);
}

function shuffle(array) {
  const copy = [...array];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function getEffectiveTilePosition(tile) {
  const offset = layerVisualOffsets[tile.layer] || layerVisualOffsets[0];
  return {
    x: tile.x + offset.x,
    y: tile.y + offset.y
  };
}

function overlaps(tileA, tileB) {
  const first = getEffectiveTilePosition(tileA);
  const second = getEffectiveTilePosition(tileB);
  return Math.abs(first.x - second.x) < 58 && Math.abs(first.y - second.y) < 58;
}

function getExposedTileIds(activeTiles) {
  const exposedIds = new Set();

  activeTiles.forEach(candidate => {
    const blocked = activeTiles.some(other => other.id !== candidate.id && other.layer > candidate.layer && overlaps(candidate, other));
    if (!blocked) {
      exposedIds.add(candidate.id);
    }
  });

  return exposedIds;
}

function generateSolvableTiles() {
  const activePositions = layout.map((position, index) => ({ id: index, ...position }));
  const removalOrder = [];

  while (activePositions.length > 0) {
    const exposedIds = getExposedTileIds(activePositions);
    const exposedTiles = activePositions.filter(tile => exposedIds.has(tile.id));
    const pick = exposedTiles[Math.floor(Math.random() * exposedTiles.length)];
    removalOrder.push(pick.id);
    const removeIndex = activePositions.findIndex(tile => tile.id === pick.id);
    activePositions.splice(removeIndex, 1);
  }

  const groupCount = removalOrder.length / 3;
  const typeIndexes = [];
  for (let groupIndex = 0; groupIndex < groupCount; groupIndex += 1) {
    typeIndexes.push(groupIndex % tileTypes.length);
  }

  const shuffledTypeIndexes = shuffle(typeIndexes);
  const assignedTypeById = new Map();

  shuffledTypeIndexes.forEach((typeIndex, groupIndex) => {
    const orderStart = groupIndex * 3;
    for (let offset = 0; offset < 3; offset += 1) {
      assignedTypeById.set(removalOrder[orderStart + offset], typeIndex);
    }
  });

  return layout.map((position, index) => ({
    id: index,
    x: position.x,
    y: position.y,
    layer: position.layer,
    type: tileTypes[assignedTypeById.get(index)],
    removed: false
  }));
}

function getActiveTiles() {
  return state.tiles.filter(tile => !tile.removed);
}

function isTileClickable(tileId) {
  const tile = state.tiles.find(item => item.id === tileId);
  if (!tile || tile.removed) {
    return false;
  }

  return !getActiveTiles().some(other => other.id !== tile.id && other.layer > tile.layer && overlaps(tile, other));
}

function createTileElement(tile) {
  const position = getEffectiveTilePosition(tile);
  const button = document.createElement("button");
  button.className = "tile";
  button.type = "button";
  button.style.left = `${position.x}px`;
  button.style.top = `${position.y}px`;
  button.style.zIndex = String(tile.layer * 20 + tile.id + 1);
  button.dataset.id = String(tile.id);
  button.setAttribute("aria-label", `${tile.type.name} 卡牌`);

  const inner = document.createElement("div");
  inner.className = "tile-inner";
  inner.innerHTML = `<span>${tile.type.icon}</span><span class="tile-label">${tile.type.name}</span>`;
  button.appendChild(inner);
  button.addEventListener("click", () => handleTileClick(tile.id));
  return button;
}

function renderBoard() {
  boardElement.innerHTML = "";
  const activeTiles = getActiveTiles().sort((first, second) => first.layer - second.layer || first.id - second.id);

  activeTiles.forEach(tile => {
    const tileElement = createTileElement(tile);
    if (!isTileClickable(tile.id)) {
      tileElement.classList.add("tile-blocked");
      tileElement.disabled = true;
    }

    if (state.hintTileId === tile.id) {
      tileElement.classList.add("tile-hint");
    }

    boardElement.appendChild(tileElement);
  });
}

function renderTray() {
  trayElement.innerHTML = "";

  state.tray.forEach(tile => {
    const tileElement = document.createElement("div");
    tileElement.className = "tray-tile";
    tileElement.innerHTML = `<span>${tile.type.icon}</span><span>${tile.type.name}</span>`;
    trayElement.appendChild(tileElement);
  });

  for (let count = state.tray.length; count < trayLimit; count += 1) {
    const slot = document.createElement("div");
    slot.className = "tray-slot";
    trayElement.appendChild(slot);
  }
}

function setMessage(text) {
  if (messageBoxElement) {
    messageBoxElement.textContent = text;
  }
}

function updateStatus() {
  remainingCountElement.textContent = String(getActiveTiles().length);
  comboCountElement.textContent = String(state.combo);
  trayCountElement.textContent = String(state.tray.length);
}

function closeOverlay() {
  overlayElement.classList.add("hidden");
}

function openOverlay({ kicker, title, text, buttonText }) {
  overlayKickerElement.textContent = kicker;
  overlayTitleElement.textContent = title;
  overlayTextElement.textContent = text;
  overlayButton.textContent = buttonText;
  overlayElement.classList.remove("hidden");
}

function removeTriplesIfNeeded() {
  const countByTypeName = state.tray.reduce((result, tile) => {
    result[tile.type.name] = (result[tile.type.name] || 0) + 1;
    return result;
  }, {});

  const matchedTypeName = Object.entries(countByTypeName).find(([, count]) => count >= 3)?.[0];
  if (!matchedTypeName) {
    return false;
  }

  let removed = 0;
  state.tray = state.tray.filter(tile => {
    if (tile.type.name === matchedTypeName && removed < 3) {
      removed += 1;
      return false;
    }
    return true;
  });

  state.combo += 1;
  playMatchSound(state.combo, matchedTypeName);
  if (trayPanelElement) {
    trayPanelElement.classList.remove("tray-card-match");
    void trayPanelElement.offsetWidth;
    trayPanelElement.classList.add("tray-card-match");
  }
  setMessage(`成功消除了 3 张${matchedTypeName}，继续保持节奏。`);
  return true;
}

function checkGameState() {
  const remaining = getActiveTiles().length;
  if (remaining === 0 && state.tray.length === 0) {
    playWinSound();
    const confettiIntensity = 1 + Math.min(4, state.combo / 3);
    launchConfettiBurst(confettiIntensity);
    openOverlay({
      kicker: "完美过关",
      title: "草地清空啦",
      text: `你完成了这一局，累计连消 ${state.combo} 次。`,
      buttonText: "再玩一局"
    });
    return;
  }

  if (state.tray.length >= trayLimit) {
    playLoseSound();
    openOverlay({
      kicker: "差一点",
      title: "收纳槽装满了",
      text: "这一局没有接上三连，重新整理牌阵再来一次。",
      buttonText: "重新开局"
    });
  }
}

function handleTileClick(tileId) {
  if (!isTileClickable(tileId) || !overlayElement.classList.contains("hidden") || state.isResolvingMove) {
    return;
  }

  const tile = state.tiles.find(item => item.id === tileId);
  if (!tile) {
    return;
  }

  state.isResolvingMove = true;
  playCollectSound(tile.type);
  const trayIndex = state.tray.length;
  animateTileToTray(tile.id, tile.type, trayIndex);
  tile.removed = true;
  state.tray.push({ id: tile.id, type: tile.type });
  state.hintTileId = null;
  setMessage(`已收下 ${tile.type.name}，留意收纳槽里的配对机会。`);

  updateStatus();
  renderTray();
  renderBoard();

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const settleDelay = prefersReducedMotion ? 0 : 370;
  window.setTimeout(() => {
    while (removeTriplesIfNeeded()) {
      // 卡片进入收纳槽后，再连锁清理凑齐的三连。
    }

    updateStatus();
    renderTray();
    renderBoard();
    checkGameState();
    state.isResolvingMove = false;
  }, settleDelay);
}

function showHint() {
  if (!overlayElement.classList.contains("hidden")) {
    return;
  }

  const clickableTiles = getActiveTiles().filter(tile => isTileClickable(tile.id));
  if (clickableTiles.length === 0) {
    setMessage("当前没有可点击的卡牌，请重新开局。");
    return;
  }

  const trayCounts = state.tray.reduce((result, tile) => {
    result[tile.type.name] = (result[tile.type.name] || 0) + 1;
    return result;
  }, {});

  clickableTiles.sort((first, second) => {
    const firstCount = trayCounts[first.type.name] || 0;
    const secondCount = trayCounts[second.type.name] || 0;
    return secondCount - firstCount;
  });

  state.hintTileId = clickableTiles[0].id;
  renderBoard();
  setMessage(`试试先点 ${clickableTiles[0].type.name}，更容易接上三连。`);
}

function startGame() {
  updateBoardScale();
  state.tiles = generateSolvableTiles();
  state.tray = [];
  state.combo = 0;
  state.hintTileId = null;
  closeOverlay();
  setMessage("新的一局已经准备好，优先寻找能凑成三张的图案。");
  updateStatus();
  renderTray();
  renderBoard();
}

restartButton.addEventListener("click", startGame);
hintButton.addEventListener("click", showHint);
overlayButton.addEventListener("click", startGame);

if (audioToggleButton) {
  audioToggleButton.addEventListener("click", () => {
    unlockAudio();
    audioSettings.muted = !audioSettings.muted;
    if (audioSettings.muted) {
      stopBackgroundMusic();
    } else {
      startBackgroundMusic();
    }
    syncAudioControls();
    saveAudioSettings();
  });
}

if (volumeRange) {
  volumeRange.addEventListener("input", event => {
    const value = Number(event.target.value);
    audioSettings.volume = Math.min(1, Math.max(0, value / 100));
    if (!audioSettings.muted) {
      startBackgroundMusic();
    }
    syncAudioControls();
    saveAudioSettings();
  });
}

overlayElement.addEventListener("click", event => {
  if (event.target === overlayElement) {
    closeOverlay();
  }
});

document.addEventListener("pointerdown", unlockAudio, { once: true });

loadAudioSettings();
syncAudioControls();
if (!audioSettings.muted) {
  startBackgroundMusic();
}

setupResponsiveBoardScale();

startGame();