const copy = {
    vi: {
        eyebrow: "MINI GAME · CARO 15×15", title: "Bạn đấu với bot.",
        intro: "Mỗi ván sẽ ngẫu nhiên chọn người đi trước. Nối 5 quân liên tiếp để giành chiến thắng!",
        turnLabel: "LƯỢT ĐANG ĐI", youTurn: "Lượt của bạn", botTurn: "Lượt của bot",
        winsLabel: "Thắng", lossesLabel: "Thua", drawsLabel: "Hòa", restart: "Ván mới",
        soundOn: "Âm thanh: bật", soundOff: "Âm thanh: tắt", soundOnAria: "Tắt âm thanh", soundOffAria: "Bật âm thanh",
        recordsAria: "Thống kê thắng thua",
        ruleTitle: "Luật chơi", ruleCopy: "Nối liền 5 quân ngang, dọc hoặc chéo để thắng. Quân X/O và lượt đi trước được chọn ngẫu nhiên mỗi ván.",
        footerLeft: "Mỗi nước đi đều quan trọng — chặn bot trước khi quá muộn!",
        footerRight: "YOUR MOVE", statusStart: "Đến lượt bạn — đánh quân {mark} nhé.",
        statusThink: "Bot đang tính nước đi...", statusPlayerWin: "Bạn thắng rồi! Nước đi quá đỉnh! ✨",
        statusBotWin: "Bot thắng ván này. Chơi lại để phục thù nhé!",
        statusDraw: "Hòa rồi! Hai bên đều kín kẽ. Đánh ván nữa nhé?",
        ariaBoard: "Bàn cờ caro 15 nhân 15", emptyCell: "Hàng {row}, cột {column}, ô trống",
        playerCell: "Hàng {row}, cột {column}, quân {mark} của bạn",
        botCell: "Hàng {row}, cột {column}, quân {mark} của bot",
        titleDocument: "CARO NEON — Đấu với bot"
    },
    en: {
        eyebrow: "MINI GAME · 15×15 GOMOKU", title: "You vs. the bot.",
        intro: "Who goes first is randomized each round. Connect five in a row to win!",
        turnLabel: "CURRENT TURN", youTurn: "Your turn", botTurn: "Bot's turn",
        winsLabel: "Wins", lossesLabel: "Losses", drawsLabel: "Draws", restart: "New game",
        soundOn: "Sound: on", soundOff: "Sound: off", soundOnAria: "Turn sound off", soundOffAria: "Turn sound on",
        recordsAria: "Win and loss record",
        ruleTitle: "How to play", ruleCopy: "Connect five horizontally, vertically, or diagonally to win. X/O and who goes first are randomized each round.",
        footerLeft: "Every move counts — block the bot before it's too late!",
        footerRight: "YOUR MOVE", statusStart: "Your turn — play {mark}.",
        statusThink: "The bot is thinking...", statusPlayerWin: "You win! What a brilliant move! ✨",
        statusBotWin: "The bot wins this round. Start a rematch!",
        statusDraw: "It's a draw! Neither side gave in. Play another?",
        ariaBoard: "15 by 15 Gomoku board", emptyCell: "Row {row}, column {column}, empty",
        playerCell: "Row {row}, column {column}, your {mark}",
        botCell: "Row {row}, column {column}, bot {mark}",
        titleDocument: "NEON GOMOKU — Play the bot"
    }
};
const size = 15;
let player = "X";
let bot = "O";
const boardElement = document.querySelector("#caro-board");
const statusElement = document.querySelector("#game-status");
const turnMark = document.querySelector("#turn-mark");
const turnText = document.querySelector("#turn-text");
const winsElement = document.querySelector("#wins-count");
const lossesElement = document.querySelector("#losses-count");
const drawsElement = document.querySelector("#draws-count");
const recordsElement = document.querySelector(".pulse-records");
const soundButton = document.querySelector("#sound-toggle");
const soundIcon = document.querySelector("#sound-icon");
const lossAudio = new Audio("../mp3/tieng_ga_noi_gay-www_tiengdong_com.mp3");
const victoryAudio = new Audio("../mp3/Am_thanh_ve_dich_chien_thang-www_tiengdong_com.mp3");
const backgroundAudio = new Audio("../mp3/nhac_chuong_tieng_sao_thoi-www_tiengdong_com.mp3");
lossAudio.preload = "auto";
victoryAudio.preload = "auto";
backgroundAudio.preload = "auto";
backgroundAudio.loop = true;
backgroundAudio.volume = 0.18;
const directions = [[1, 0], [0, 1], [1, 1], [1, -1]];
const recordStorageKey = "tqt-caro-record";
let board = Array(size * size).fill("");
let currentTurn = player;
let gameOver = false;
let language = "vi";
let matchRecord = readMatchRecord();
let soundEnabled = true;
let lastMove = -1;
let winningCells = [];
let botTimer;

function text(key) {
    return copy[language][key];
}

function readMatchRecord() {
    try {
        const saved = localStorage.getItem(recordStorageKey);
        if (!saved) return { wins: 0, losses: 0, draws: 0 };
        const record = JSON.parse(saved);
        if (record && typeof record === "object" && ["wins", "losses", "draws"].every((key) =>
            Number.isSafeInteger(record[key]) && record[key] >= 0)) {
            return record;
        }
        console.warn("Ignoring invalid saved Caro results.");
    } catch (error) {
        console.error("Could not read saved Caro results:", error);
    }
    return { wins: 0, losses: 0, draws: 0 };
}

function updateMatchRecordDisplay() {
    winsElement.textContent = String(matchRecord.wins);
    lossesElement.textContent = String(matchRecord.losses);
    drawsElement.textContent = String(matchRecord.draws);
}

function saveMatchRecord() {
    updateMatchRecordDisplay();
    try {
        localStorage.setItem(recordStorageKey, JSON.stringify(matchRecord));
    } catch (error) {
        console.error("Could not save Caro results:", error);
    }
}

function updateSoundControl() {
    soundButton.setAttribute("aria-pressed", String(soundEnabled));
    soundButton.setAttribute("aria-label", text(soundEnabled ? "soundOnAria" : "soundOffAria"));
    soundIcon.textContent = soundEnabled ? "🔊" : "🔇";
    soundButton.querySelector("[data-i18n]").textContent = text(soundEnabled ? "soundOn" : "soundOff");
}

function playMp3(audio) {
    if (!soundEnabled) return;
    audio.pause();
    audio.currentTime = 0;
    audio.play().catch((error) => {
        console.warn("Could not play game sound:", error);
    });
}

function startBackgroundMusic() {
    if (!soundEnabled) return;
    backgroundAudio.play().catch((error) => {
        console.warn("Could not play background music:", error);
    });
}

function playOutcomeSound(outcome) {
    playMp3(outcome === "win" ? victoryAudio : lossAudio);
}

function cellName(index) {
    const row = Math.floor(index / size) + 1;
    const column = index % size + 1;
    if (board[index] === player) return text("playerCell").replace("{row}", row).replace("{column}", column).replace("{mark}", player);
    if (board[index] === bot) return text("botCell").replace("{row}", row).replace("{column}", column).replace("{mark}", bot);
    return text("emptyCell").replace("{row}", row).replace("{column}", column);
}

function renderBoard() {
    boardElement.setAttribute("aria-label", text("ariaBoard"));
    boardElement.innerHTML = board.map((mark, index) => {
        const winning = winningCells.includes(index);
        const classes = [
            "pulse-cell",
            winning ? "is-winning" : "",
            index === lastMove ? "is-last" : ""
        ].filter(Boolean).join(" ");
        const disabled = gameOver || currentTurn !== player || Boolean(mark);
        return `<button class="${classes}" type="button" role="gridcell" data-index="${index}" data-mark="${mark}" aria-label="${cellName(index)}" ${disabled ? "disabled" : ""}>${mark}</button>`;
    }).join("");
    sendHeight();
}

function updateTurn() {
    turnMark.textContent = currentTurn;
    turnMark.dataset.mark = currentTurn;
    turnText.textContent = currentTurn === player ? text("youTurn") : text("botTurn");
}

function updateCurrentStatus() {
    if (currentTurn === bot) {
        statusElement.textContent = text("statusThink");
    } else {
        statusElement.textContent = text("statusStart").replace("{mark}", player);
    }
}

function countInDirection(row, column, rowStep, columnStep, mark) {
    let count = 0;
    const cells = [];
    let nextRow = row + rowStep;
    let nextColumn = column + columnStep;
    while (nextRow >= 0 && nextRow < size && nextColumn >= 0 && nextColumn < size
        && board[nextRow * size + nextColumn] === mark) {
        count += 1;
        cells.push(nextRow * size + nextColumn);
        nextRow += rowStep;
        nextColumn += columnStep;
    }
    return cells;
}

function findWinningRun(index, mark) {
    const row = Math.floor(index / size);
    const column = index % size;
    for (const [rowStep, columnStep] of directions) {
        const before = countInDirection(row, column, -rowStep, -columnStep, mark);
        const after = countInDirection(row, column, rowStep, columnStep, mark);
        if (before.length + after.length + 1 >= 5) {
            return [index, ...before, ...after];
        }
    }
    return null;
}

function finishGame(winner, index) {
    gameOver = true;
    winningCells = findWinningRun(index, winner) || [];
    if (winner === player) {
        matchRecord.wins += 1;
        statusElement.textContent = text("statusPlayerWin");
        statusElement.dataset.result = "win";
        playOutcomeSound("win");
    } else {
        matchRecord.losses += 1;
        statusElement.textContent = text("statusBotWin");
        statusElement.dataset.result = "loss";
        playOutcomeSound("loss");
    }
    saveMatchRecord();
    renderBoard();
}

function makeMove(index, mark) {
    if (board[index] || gameOver) return false;
    board[index] = mark;
    lastMove = index;
    const winningRun = findWinningRun(index, mark);
    if (winningRun) {
        finishGame(mark, index);
        return true;
    }
    if (board.every(Boolean)) {
        gameOver = true;
        matchRecord.draws += 1;
        statusElement.textContent = text("statusDraw");
        statusElement.dataset.result = "draw";
        saveMatchRecord();
        renderBoard();
        return true;
    }
    currentTurn = mark === player ? bot : player;
    updateTurn();
    if (currentTurn === bot) {
        statusElement.textContent = text("statusThink");
        statusElement.dataset.result = "";
        renderBoard();
        botTimer = window.setTimeout(playBot, 420);
    } else {
        updateCurrentStatus();
        statusElement.dataset.result = "";
        renderBoard();
    }
    return true;
}

function candidateMoves() {
    const candidates = new Set();
    if (board.every((cell) => !cell)) return [Math.floor((size * size) / 2)];
    board.forEach((mark, index) => {
        if (!mark) return;
        const row = Math.floor(index / size);
        const column = index % size;
        for (let rowOffset = -2; rowOffset <= 2; rowOffset += 1) {
            for (let columnOffset = -2; columnOffset <= 2; columnOffset += 1) {
                const nextRow = row + rowOffset;
                const nextColumn = column + columnOffset;
                if (nextRow < 0 || nextRow >= size || nextColumn < 0 || nextColumn >= size) continue;
                const nextIndex = nextRow * size + nextColumn;
                if (!board[nextIndex]) candidates.add(nextIndex);
            }
        }
    });
    return [...candidates];
}

function windowScore(own, opponent) {
    if (own && opponent) return 0;
    if (own === 5) return 10000000;
    if (opponent === 5) return 10000000;
    const scores = [0, 2, 15, 180, 50000];
    return scores[own] + scores[opponent] * 1.12;
}

function moveScore(index, mark) {
    let score = 0;
    const row = Math.floor(index / size);
    const column = index % size;
    for (const [rowStep, columnStep] of directions) {
        for (let offset = -4; offset <= 0; offset += 1) {
            let own = 0;
            let opponent = 0;
            let includesMove = false;
            for (let position = offset; position < offset + 5; position += 1) {
                const nextRow = row + rowStep * position;
                const nextColumn = column + columnStep * position;
                if (nextRow < 0 || nextRow >= size || nextColumn < 0 || nextColumn >= size) break;
                if (position === 0) includesMove = true;
                const current = board[nextRow * size + nextColumn] || (position === 0 ? mark : "");
                if (current === mark) own += 1;
                else if (current) opponent += 1;
            }
            if (includesMove) score += windowScore(own, opponent);
        }
    }
    const centerDistance = Math.abs(row - 7) + Math.abs(column - 7);
    return score + Math.max(0, 14 - centerDistance) * 0.01 + Math.random() * 0.001;
}

function playBot() {
    if (gameOver || currentTurn !== bot) return;
    const candidates = candidateMoves();
    let bestMove = candidates[0];
    let bestScore = -Infinity;
    for (const index of candidates) {
        board[index] = bot;
        const botWins = Boolean(findWinningRun(index, bot));
        board[index] = player;
        const playerWins = Boolean(findWinningRun(index, player));
        board[index] = "";
        const score = (botWins ? 20000000 : 0) + (playerWins ? 12000000 : 0)
            + moveScore(index, bot) + moveScore(index, player) * 0.92;
        if (score > bestScore) {
            bestScore = score;
            bestMove = index;
        }
    }
    makeMove(bestMove, bot);
}

function startNewGame() {
    clearTimeout(botTimer);
    [lossAudio, victoryAudio].forEach((audio) => {
        audio.pause();
        audio.currentTime = 0;
    });
    board = Array(size * size).fill("");
    player = Math.random() < 0.5 ? "X" : "O";
    bot = player === "X" ? "O" : "X";
    currentTurn = "X";
    gameOver = false;
    lastMove = -1;
    winningCells = [];
    updateCurrentStatus();
    statusElement.dataset.result = "";
    updateTurn();
    renderBoard();
    if (currentTurn === bot) botTimer = window.setTimeout(playBot, 420);
}

function applyLanguage(nextLanguage) {
    language = nextLanguage === "en" ? "en" : "vi";
    document.documentElement.lang = language;
    document.title = text("titleDocument");
    document.querySelectorAll("[data-i18n]").forEach((element) => {
        element.textContent = text(element.dataset.i18n);
    });
    recordsElement.setAttribute("aria-label", text("recordsAria"));
    if (gameOver) {
        const message = winningCells.length
            ? (board[winningCells[0]] === player ? text("statusPlayerWin") : text("statusBotWin"))
            : text("statusDraw");
        statusElement.textContent = message;
    } else {
        updateCurrentStatus();
    }
    updateTurn();
    updateSoundControl();
    renderBoard();
}

function applyTheme(theme) {
    const dark = theme === "dark";
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    document.querySelector('meta[name="theme-color"]').content = dark ? "#090b18" : "#f3f5fb";
}

function sendHeight() {
    window.parent.postMessage({ type: "mini-game-height", height: document.body.scrollHeight }, "*");
}

boardElement.addEventListener("click", (event) => {
    const cell = event.target.closest("[data-index]");
    if (!cell || !boardElement.contains(cell) || currentTurn !== player || gameOver) return;
    startBackgroundMusic();
    makeMove(Number(cell.dataset.index), player);
});
document.querySelector("#restart-game").addEventListener("click", startNewGame);
soundButton.addEventListener("click", () => {
    soundEnabled = !soundEnabled;
    updateSoundControl();
    if (soundEnabled) {
        startBackgroundMusic();
    } else {
        [lossAudio, victoryAudio, backgroundAudio].forEach((audio) => audio.pause());
    }
});
updateMatchRecordDisplay();
updateSoundControl();
startNewGame();
applyLanguage(new URLSearchParams(window.location.search).get("lang"));
applyTheme(new URLSearchParams(window.location.search).get("theme"));
window.addEventListener("message", (event) => {
    if (event.source !== window.parent || event.data?.type !== "mini-game-preferences") return;
    applyLanguage(event.data.language);
    applyTheme(event.data.theme);
    sendHeight();
});
if ("ResizeObserver" in window) new ResizeObserver(sendHeight).observe(document.body);
window.addEventListener("load", sendHeight);
window.addEventListener("resize", sendHeight);
sendHeight();
