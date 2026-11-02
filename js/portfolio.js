const body = document.body;
const languageButton = document.querySelector(".language-toggle");
const themeButton = document.querySelector(".theme-toggle");
const themeIcon = document.querySelector(".theme-icon");
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".primary-nav");
const navCloseButton = document.querySelector(".nav-close");
const welcomeModal = document.querySelector("#welcome-modal");
const modalCloseButton = document.querySelector(".modal-close");
const modalAcceptButton = document.querySelector(".modal-accept");
let language = "vn";
let focusBeforeModal;

function setLanguage(nextLanguage) {
  language = nextLanguage;
  document.documentElement.lang = language === "vn" ? "vi" : "en";
  document.querySelectorAll("[data-vn][data-en]").forEach((element) => {
    if (element.hasAttribute("data-translation-markup")) {
      element.innerHTML = element.dataset[language];
    } else {
      element.textContent = element.dataset[language];
    }
  });
  document.querySelectorAll("[data-placeholder-vn][data-placeholder-en]").forEach((element) => {
    element.placeholder = element.dataset[language === "vn" ? "placeholderVn" : "placeholderEn"];
  });
  languageButton.textContent = language === "vn" ? "EN" : "VI";
  languageButton.setAttribute("aria-label", language === "vn" ? "Switch to English" : "Chuyển sang Tiếng Việt");
  updateGameStatus();
}

languageButton.addEventListener("click", () => {
  setLanguage(language === "vn" ? "en" : "vn");
});

themeButton.addEventListener("click", () => {
  const isDark = body.classList.toggle("dark-mode");
  themeButton.setAttribute("aria-label", isDark ? "Bật chế độ sáng" : "Bật chế độ tối");
  themeIcon.textContent = isDark ? "☀" : "☾";
});

function closeMenu() {
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Mở menu");
  navigation.classList.remove("open");
  body.classList.remove("menu-open");
}

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") !== "true";
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Đóng menu" : "Mở menu");
  navigation.classList.toggle("open", isOpen);
  body.classList.toggle("menu-open", isOpen);
});

navigation.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
navCloseButton.addEventListener("click", closeMenu);
window.addEventListener("resize", () => {
  if (window.innerWidth > 650) closeMenu();
});

function closeWelcomeModal() {
  welcomeModal.hidden = true;
  sessionStorage.setItem("gia-an-portfolio-welcomed", "true");
  if (focusBeforeModal instanceof HTMLElement) focusBeforeModal.focus();
}

function openWelcomeModal() {
  focusBeforeModal = document.activeElement;
  welcomeModal.hidden = false;
  modalCloseButton.focus();
}

modalCloseButton.addEventListener("click", closeWelcomeModal);
modalAcceptButton.addEventListener("click", closeWelcomeModal);
welcomeModal.addEventListener("click", (event) => {
  if (event.target === welcomeModal) closeWelcomeModal();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !welcomeModal.hidden) closeWelcomeModal();
  if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") closeMenu();
});
if (!sessionStorage.getItem("gia-an-portfolio-welcomed")) openWelcomeModal();

document.querySelectorAll("img").forEach((image) => {
  const setImageLoadedState = () => {
    image.closest(".portrait-frame, .medal-image-wrap, .project-visual")?.classList.add("has-image");
  };
  image.addEventListener("load", setImageLoadedState, { once: true });
  image.addEventListener("error", () => {
    image.hidden = true;
  }, { once: true });
  if (image.complete && image.naturalWidth > 0) setImageLoadedState();
});

const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });
  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}

const matrixCanvas = document.querySelector("#matrix-rain");
const matrixContext = matrixCanvas.getContext("2d");
const matrixReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const gameSection = document.querySelector(".game-section");
let matrixStreams = [];
let matrixWidth = 0;
let matrixHeight = 0;
let matrixFrame = 0;
let matrixLastFrame = 0;
let matrixIsVisible = false;

function createMatrixStreams() {
  const fontSize = Math.max(11, Math.min(14, window.innerWidth * 0.011));
  const spacing = fontSize * 0.68;
  const columnCount = Math.ceil(matrixWidth / spacing);
  matrixStreams = [];

  for (let column = 0; column < columnCount; column += 1) {
    const trailLength = 18 + Math.floor(Math.random() * 23);
    matrixStreams.push({
      x: column * spacing + spacing / 2,
      y: Math.random() * matrixHeight,
      speed: 105 + Math.random() * 205,
      fontSize,
      trailLength,
      digits: Array.from({ length: trailLength }, () => Math.random() < 0.5 ? "0" : "1")
    });
  }
}

function resizeMatrixCanvas() {
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
  matrixWidth = gameSection.clientWidth;
  matrixHeight = gameSection.clientHeight;
  matrixCanvas.width = Math.round(matrixWidth * pixelRatio);
  matrixCanvas.height = Math.round(matrixHeight * pixelRatio);
  matrixCanvas.style.width = `${matrixWidth}px`;
  matrixCanvas.style.height = `${matrixHeight}px`;
  matrixContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  createMatrixStreams();
}

function drawMatrixRain(timestamp) {
  matrixFrame = 0;
  const matrixProgress = Number.parseFloat(getComputedStyle(body).getPropertyValue("--matrix-progress")) || 0;
  if (document.hidden || matrixProgress <= 0.005) {
    if (matrixIsVisible) matrixContext.clearRect(0, 0, matrixWidth, matrixHeight);
    matrixIsVisible = false;
    matrixLastFrame = 0;
    return;
  }

  matrixIsVisible = true;
  const elapsed = matrixLastFrame ? Math.min((timestamp - matrixLastFrame) / 1000, 0.05) : 0;
  matrixLastFrame = timestamp;
  matrixContext.clearRect(0, 0, matrixWidth, matrixHeight);

  matrixContext.save();
  for (const stream of matrixStreams) {
    stream.y += stream.speed * elapsed;
    if (stream.y - stream.trailLength * stream.fontSize > matrixHeight) {
      stream.y = -Math.random() * matrixHeight * 0.6;
      stream.speed = 105 + Math.random() * 205;
      stream.trailLength = 18 + Math.floor(Math.random() * 23);
      stream.digits = Array.from({ length: stream.trailLength }, () => Math.random() < 0.5 ? "0" : "1");
    }

    matrixContext.font = `600 ${stream.fontSize}px "DM Mono", monospace`;
    matrixContext.textAlign = "center";
    for (let index = 0; index < stream.trailLength; index += 1) {
      const y = stream.y - index * stream.fontSize;
      if (y < -stream.fontSize || y > matrixHeight + stream.fontSize) continue;
      if (Math.random() < (index === 0 ? 0.28 : 0.045)) {
        stream.digits[index] = stream.digits[index] === "0" ? "1" : "0";
      }

      const strength = 1 - index / stream.trailLength;
      matrixContext.globalAlpha = Math.max(0.1, strength * 0.78);
      matrixContext.fillStyle = index === 0 ? "#efffd7" : "#62f58a";
      matrixContext.shadowColor = index === 0 ? "#caffb8" : "#37e76d";
      matrixContext.shadowBlur = index === 0 ? 12 : 4;
      matrixContext.fillText(stream.digits[index], stream.x, y);
    }
  }

  matrixContext.globalAlpha = 1;
  matrixContext.shadowBlur = 0;
  matrixContext.restore();
  if (!matrixReducedMotion.matches) matrixFrame = window.requestAnimationFrame(drawMatrixRain);
}

function startMatrixRain() {
  if (!matrixFrame && !document.hidden) matrixFrame = window.requestAnimationFrame(drawMatrixRain);
}

resizeMatrixCanvas();
window.addEventListener("resize", resizeMatrixCanvas);
window.addEventListener("scroll", startMatrixRain, { passive: true });
document.addEventListener("visibilitychange", startMatrixRain);

let scrollFrame = 0;
const heroSurface = document.querySelector(".hero");
const musicEdgeScene = document.querySelector("#music-edge-scene");
let musicDirectionReversed = false;
const musicSymbols = ["♪", "♫", "♬", "♩", "𝄞", "𝄢", "♭", "♯"];
const musicColors = ["#806bb1", "#b46a79", "#a8843e", "#688c54"];
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function spawnMusicNote(stream, stagger = false) {
  const note = document.createElement("span");
  note.className = `music-note${musicDirectionReversed ? " fall-down" : ""}`;
  note.textContent = musicSymbols[Math.floor(Math.random() * musicSymbols.length)];
  const isMobile = window.innerWidth <= 650;
  note.style.setProperty("--note-left", `${isMobile ? 4 + Math.random() * 24 : 8 + Math.random() * 72}%`);
  const duration = 12 + Math.random() * 6;
  note.style.setProperty("--note-duration", `${duration}s`);
  if (stagger) note.style.animationDelay = `${-Math.random() * duration}s`;
  note.style.setProperty("--note-drift", `${Math.round(Math.random() * 48 - 24)}px`);
  note.style.setProperty("--note-color", musicColors[Math.floor(Math.random() * musicColors.length)]);
  const noteSize = isMobile ? 0.8 + Math.random() * 0.2 : 1.6 + Math.random() * 1.2;
  note.style.setProperty("--note-size", `${noteSize}rem`);
  note.addEventListener("animationend", () => note.remove(), { once: true });
  stream.append(note);
}

const musicStreams = [...musicEdgeScene.querySelectorAll(".music-note-stream")];
if (!prefersReducedMotion.matches) {
  musicStreams.forEach((stream) => {
    for (let index = 0; index < 10; index += 1) spawnMusicNote(stream, true);
  });
  window.setInterval(() => {
    musicStreams.forEach(spawnMusicNote);
  }, 900);
}

window.setInterval(() => {
  musicDirectionReversed = !musicDirectionReversed;
}, 10000);

function updateJourneyProgress() {
  if (scrollFrame) return;
  scrollFrame = window.requestAnimationFrame(() => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
    const heroProgress = Math.min(1, Math.max(0, window.scrollY / Math.max(heroSurface.offsetHeight * 0.8, 1)));
    const brushDraw = Math.min(1, 0.45 + window.scrollY / 180);
    const musicProgress = Math.max(0, Math.min(1, (progress - 0.14) / 0.18, (0.84 - progress) / 0.18));
    const gameBounds = gameSection.getBoundingClientRect();
    const musicClipBottom = Math.max(0, Math.min(window.innerHeight, window.innerHeight - gameBounds.top));
    const matrixProgress = gameBounds.bottom > 0 && gameBounds.top < window.innerHeight ? 1 : 0;
    body.style.setProperty("--journey", progress.toFixed(3));
    body.style.setProperty("--art-progress", Math.max(0, 1 - progress / 0.24).toFixed(3));
    body.style.setProperty("--music-progress", musicProgress.toFixed(3));
    musicEdgeScene.style.setProperty("--music-clip-bottom", `${musicClipBottom.toFixed(1)}px`);
    body.style.setProperty("--matrix-progress", matrixProgress.toFixed(3));
    body.style.setProperty("--hero-progress", heroProgress.toFixed(3));
    body.style.setProperty("--brush-draw", brushDraw.toFixed(3));
    body.style.setProperty("--brush-travel", `${(heroProgress * 55).toFixed(1)}px`);
    startMatrixRain();
    scrollFrame = 0;
  });
}
window.addEventListener("scroll", updateJourneyProgress, { passive: true });
window.addEventListener("resize", updateJourneyProgress);
updateJourneyProgress();

const boardElement = document.querySelector("#checkers-board");
const statusElement = document.querySelector("#game-status");
const redScoreElement = document.querySelector("#red-score");
const blackScoreElement = document.querySelector("#black-score");
const resetButton = document.querySelector("#reset-game");
let board;
let currentPlayer;
let selectedSquare;
let availableMoves;
let chainedPiece;
let gameOver;
let botTimer;

function createStartingBoard() {
  const nextBoard = Array.from({ length: 8 }, () => Array(8).fill(null));
  for (let row = 0; row < 3; row += 1) {
    for (let col = 0; col < 8; col += 1) {
      if ((row + col) % 2 === 1) nextBoard[row][col] = { player: "black", king: false };
    }
  }
  for (let row = 5; row < 8; row += 1) {
    for (let col = 0; col < 8; col += 1) {
      if ((row + col) % 2 === 1) nextBoard[row][col] = { player: "red", king: false };
    }
  }
  return nextBoard;
}

function moveDirections(piece) {
  if (piece.king) return [-1, 1];
  return [piece.player === "red" ? -1 : 1];
}

function movesForPiece(position, capturesOnly = false) {
  const piece = board[position.row][position.col];
  if (!piece) return [];
  const moves = [];
  for (const rowDirection of moveDirections(piece)) {
    for (const colDirection of [-1, 1]) {
      const nextRow = position.row + rowDirection;
      const nextCol = position.col + colDirection;
      if (nextRow < 0 || nextRow > 7 || nextCol < 0 || nextCol > 7) continue;
      const target = board[nextRow][nextCol];
      if (!target && !capturesOnly) {
        moves.push({ from: position, to: { row: nextRow, col: nextCol }, capture: null });
        continue;
      }
      if (target && target.player !== piece.player) {
        const landingRow = nextRow + rowDirection;
        const landingCol = nextCol + colDirection;
        if (landingRow >= 0 && landingRow < 8 && landingCol >= 0 && landingCol < 8 && !board[landingRow][landingCol]) {
          moves.push({
            from: position,
            to: { row: landingRow, col: landingCol },
            capture: { row: nextRow, col: nextCol }
          });
        }
      }
    }
  }
  return moves;
}

function legalMoves(player, forcedPosition = null) {
  const positions = forcedPosition ? [forcedPosition] : [];
  if (!forcedPosition) {
    for (let row = 0; row < 8; row += 1) {
      for (let col = 0; col < 8; col += 1) {
        if (board[row][col]?.player === player) positions.push({ row, col });
      }
    }
  }
  const captures = positions.flatMap((position) => movesForPiece(position, true));
  if (forcedPosition) return captures;
  if (captures.length) return captures;
  return positions.flatMap((position) => movesForPiece(position));
}

function updateGameStatus(message) {
  if (!statusElement) return;
  if (message) {
    statusElement.textContent = message;
  } else if (gameOver) {
    const winner = currentPlayer === "red"
      ? (language === "vn" ? "Bot thắng · Đen" : "Bot wins · Black")
      : (language === "vn" ? "Bạn thắng · Đỏ" : "You win · Red");
    statusElement.textContent = winner;
  } else {
    statusElement.textContent = currentPlayer === "red"
      ? (language === "vn" ? "Lượt của bạn · Đỏ" : "Your turn · Red")
      : (language === "vn" ? "Bot đang suy nghĩ · Đen" : "Bot thinking · Black");
  }
}

function updateScores() {
  let redCount = 0;
  let blackCount = 0;
  board.flat().forEach((piece) => {
    if (piece?.player === "red") redCount += 1;
    if (piece?.player === "black") blackCount += 1;
  });
  redScoreElement.textContent = String(redCount);
  blackScoreElement.textContent = String(blackCount);
}

function renderBoard() {
  boardElement.replaceChildren();
  const selectedMoves = selectedSquare ? availableMoves.filter((move) => (
    move.from.row === selectedSquare.row && move.from.col === selectedSquare.col
  )) : [];
  for (let row = 0; row < 8; row += 1) {
    for (let col = 0; col < 8; col += 1) {
      const square = document.createElement("button");
      square.type = "button";
      square.className = `square ${(row + col) % 2 === 0 ? "light" : "dark"}`;
      square.setAttribute("role", "gridcell");
      square.setAttribute("aria-label", `${String.fromCharCode(65 + col)}${8 - row}`);
      if (selectedSquare?.row === row && selectedSquare.col === col) square.classList.add("selected");
      const destinationMove = selectedMoves.find((move) => move.to.row === row && move.to.col === col);
      if (destinationMove) square.classList.add(destinationMove.capture ? "capture" : "legal");
      const piece = board[row][col];
      if (piece) {
        const pieceElement = document.createElement("span");
        pieceElement.className = `piece ${piece.player}${piece.king ? " king" : ""}`;
        square.append(pieceElement);
      }
      square.addEventListener("click", () => handleSquareClick(row, col));
      boardElement.append(square);
    }
  }
  updateScores();
}

function endTurn() {
  currentPlayer = currentPlayer === "red" ? "black" : "red";
  selectedSquare = null;
  chainedPiece = null;
  availableMoves = legalMoves(currentPlayer);
  if (!availableMoves.length) {
    gameOver = true;
    updateGameStatus();
    renderBoard();
    return;
  }
  updateGameStatus();
  renderBoard();
  if (currentPlayer === "black") botTimer = window.setTimeout(makeBotMove, 650);
}

function applyMove(move) {
  const piece = board[move.from.row][move.from.col];
  const wasKing = piece.king;
  board[move.from.row][move.from.col] = null;
  board[move.to.row][move.to.col] = piece;
  if (move.capture) board[move.capture.row][move.capture.col] = null;
  if ((piece.player === "red" && move.to.row === 0) || (piece.player === "black" && move.to.row === 7)) piece.king = true;
  const wasPromoted = !wasKing && piece.king;
  if (move.capture && !wasPromoted) {
    const furtherCaptures = movesForPiece(move.to, true);
    if (furtherCaptures.length) {
      chainedPiece = move.to;
      selectedSquare = move.to;
      availableMoves = furtherCaptures;
      updateGameStatus(language === "vn" ? "Ăn tiếp bằng quân này!" : "Continue capturing with this piece!");
      renderBoard();
      if (currentPlayer === "black") botTimer = window.setTimeout(makeBotMove, 650);
      return;
    }
  }
  endTurn();
}

function handleSquareClick(row, col) {
  if (gameOver || currentPlayer !== "red") return;
  const matchingMove = availableMoves.find((move) => (
    move.from.row === selectedSquare?.row && move.from.col === selectedSquare?.col
    && move.to.row === row && move.to.col === col
  ));
  if (matchingMove) {
    applyMove(matchingMove);
    return;
  }
  const clickedPiece = board[row][col];
  if (clickedPiece?.player === "red" && (!chainedPiece || (chainedPiece.row === row && chainedPiece.col === col))) {
    const pieceMoves = availableMoves.filter((move) => move.from.row === row && move.from.col === col);
    if (pieceMoves.length) {
      selectedSquare = { row, col };
      renderBoard();
      return;
    }
  }
  if (!chainedPiece) {
    selectedSquare = null;
    renderBoard();
  }
}

function makeBotMove() {
  if (gameOver || currentPlayer !== "black") return;
  const moves = legalMoves("black", chainedPiece);
  if (!moves.length) {
    gameOver = true;
    updateGameStatus();
    renderBoard();
    return;
  }
  applyMove(moves[Math.floor(Math.random() * moves.length)]);
}

function resetGame() {
  window.clearTimeout(botTimer);
  board = createStartingBoard();
  currentPlayer = "red";
  selectedSquare = null;
  availableMoves = legalMoves("red");
  chainedPiece = null;
  gameOver = false;
  updateGameStatus();
  renderBoard();
}

resetButton.addEventListener("click", resetGame);
resetGame();

const contactForm = document.querySelector("#contact-form");
const formFeedback = document.querySelector("#form-feedback");
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const nameInput = contactForm.elements.namedItem("name");
  const emailInput = contactForm.elements.namedItem("email");
  const messageInput = contactForm.elements.namedItem("message");
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();
  let error = "";

  if (name.length < 2) {
    error = language === "vn" ? "Tên cần có ít nhất 2 ký tự." : "Name must be at least 2 characters.";
    nameInput.focus();
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    error = language === "vn" ? "Vui lòng nhập địa chỉ email hợp lệ." : "Please enter a valid email address.";
    emailInput.focus();
  } else if (message.length < 10) {
    error = language === "vn" ? "Lời nhắn cần có ít nhất 10 ký tự." : "Message must be at least 10 characters.";
    messageInput.focus();
  }

  formFeedback.classList.toggle("success", !error);
  if (error) {
    formFeedback.textContent = error;
    return;
  }
  formFeedback.textContent = language === "vn"
    ? `Cảm ơn ${name}! Thông tin hợp lệ. Biểu mẫu này chưa kết nối máy chủ gửi email.`
    : `Thanks, ${name}! Your details are valid. This demo form is not connected to an email server.`;
  contactForm.reset();
});
