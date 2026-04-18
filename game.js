const boardElement = document.getElementById("board");
const trayElement = document.getElementById("tray");
const remainingCountElement = document.getElementById("remainingCount");
const comboCountElement = document.getElementById("comboCount");
const trayCountElement = document.getElementById("trayCount");
const messageBoxElement = document.getElementById("messageBox");
const restartButton = document.getElementById("restartButton");
const hintButton = document.getElementById("hintButton");
const overlayElement = document.getElementById("overlay");
const overlayKickerElement = document.getElementById("overlayKicker");
const overlayTitleElement = document.getElementById("overlayTitle");
const overlayTextElement = document.getElementById("overlayText");
const overlayButton = document.getElementById("overlayButton");

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
  hintTileId: null
};

function shuffle(array) {
  const copy = [...array];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function overlaps(tileA, tileB) {
  return Math.abs(tileA.x - tileB.x) < 58 && Math.abs(tileA.y - tileB.y) < 58;
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
  const button = document.createElement("button");
  button.className = "tile";
  button.type = "button";
  button.style.left = `${tile.x}px`;
  button.style.top = `${tile.y}px`;
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
  messageBoxElement.textContent = text;
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
  setMessage(`成功消除了 3 张${matchedTypeName}，继续保持节奏。`);
  return true;
}

function checkGameState() {
  const remaining = getActiveTiles().length;
  if (remaining === 0 && state.tray.length === 0) {
    openOverlay({
      kicker: "完美过关",
      title: "草地清空啦",
      text: `你完成了这一局，累计连消 ${state.combo} 次。`,
      buttonText: "再玩一局"
    });
    return;
  }

  if (state.tray.length >= trayLimit) {
    openOverlay({
      kicker: "差一点",
      title: "收纳槽装满了",
      text: "这一局没有接上三连，重新整理牌阵再来一次。",
      buttonText: "重新开局"
    });
  }
}

function handleTileClick(tileId) {
  if (!isTileClickable(tileId) || !overlayElement.classList.contains("hidden")) {
    return;
  }

  const tile = state.tiles.find(item => item.id === tileId);
  if (!tile) {
    return;
  }

  tile.removed = true;
  state.tray.push({ id: tile.id, type: tile.type });
  state.hintTileId = null;
  setMessage(`已收下 ${tile.type.name}，留意收纳槽里的配对机会。`);

  while (removeTriplesIfNeeded()) {
    // 连续清理所有已凑齐的三连。
  }

  updateStatus();
  renderTray();
  renderBoard();
  checkGameState();
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
overlayElement.addEventListener("click", event => {
  if (event.target === overlayElement) {
    closeOverlay();
  }
});

startGame();