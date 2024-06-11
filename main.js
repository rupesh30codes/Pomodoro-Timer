const breakLengthDisplay = document.querySelector('.break-length p');
const sessionLengthDisplay = document.querySelector('.session-length p');
const timerMinutes = document.getElementById('minutes');
const timerSeconds = document.getElementById('seconds');
const timerType = document.getElementById('new');
let interval;

let breakLength = 5;
let sessionLength = 25;
let isSession = true;
let minutes = sessionLength;
let seconds = 0;
let isTimerRunning = false;

function updateBreakLength(value) {
    breakLength += value;
    if (breakLength < 1) {
        breakLength = 1;
    }
    breakLengthDisplay.textContent = breakLength;
}

function updateSessionLength(value) {
    sessionLength += value;
    if (sessionLength < 1) {
        sessionLength = 1;
    }
    sessionLengthDisplay.textContent = sessionLength;
    if (isSession) {
        timerMinutes.textContent = sessionLength;
    }
}

function start() {
    interval = setInterval(updateTimer, 1000);
    isTimerRunning = true;
}

function updateTimer() {
    if (minutes === 0 && seconds === 0) {
        isSession = !isSession;
        if (isSession) {
            timerType.textContent = 'Session';
            minutes = sessionLength;
        } else {
            timerType.textContent = 'Break';
            minutes = breakLength;
        }
    }

    if (seconds === 0) {
        seconds = 59;
        minutes--;
    } else {
        seconds--;
    }
    timerMinutes.textContent = minutes < 10 ? '0' + minutes : minutes;
    timerSeconds.textContent = seconds < 10 ? '0' + seconds : seconds;
}

function toggleTimer() {
    if (isTimerRunning) {
        stop();
        document.querySelector('.stop').textContent = 'PLAY';
    } else {
        start();
        document.querySelector('.stop').textContent = 'STOP';
    }
}

function stop() {
    clearInterval(interval);
    isTimerRunning = false;
}

function reset() {
    clearInterval(interval);
    breakLength = 5;
    sessionLength = 25;
    isSession = true;
    minutes = sessionLength;
    seconds = 0;
    timerType.textContent = 'Session';
    breakLengthDisplay.textContent = breakLength;
    sessionLengthDisplay.textContent = sessionLength;
    timerMinutes.textContent = sessionLength;
    timerSeconds.textContent = '00';
    isTimerRunning = false;
    document.querySelector('.stop').textContent='Play';
}

document.querySelector('.break-main .fa-minus').addEventListener('click', () => updateBreakLength(-1));
document.querySelector('.break-main .fa-plus').addEventListener('click', () => updateBreakLength(1));
document.querySelector('.session-main .fa-minus').addEventListener('click', () => updateSessionLength(-1));
document.querySelector('.session-main .fa-plus').addEventListener('click', () => updateSessionLength(1));
document.querySelector('.stop').addEventListener('click', toggleTimer);
document.querySelector('.reset').addEventListener('click', reset);

document.querySelector('.break-main').addEventListener('click', () => {
    isSession = false;
    timerType.textContent = 'Break';
    minutes = breakLength;
    seconds = 0;
    timerMinutes.textContent = minutes < 10 ? '0' + minutes : minutes;
    timerSeconds.textContent = seconds < 10 ? '0' + seconds : seconds;
});

document.querySelector('.session-main').addEventListener('click', () => {
    isSession = true;
    timerType.textContent = 'Session';
    minutes = sessionLength;
    seconds = 0;
    timerMinutes.textContent = minutes < 10 ? '0' + minutes : minutes;
    timerSeconds.textContent = seconds < 10 ? '0' + seconds : seconds;
});

start();
