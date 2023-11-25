const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeleft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
    values: {
        timerId: null,
        gameVelocity: 1000,
        hitPosision: 0,
        result: 0,
        currentTime: 60,
        countDownTimerId: setInterval(countDown, 1000),
    },
};



function countDown() {
    state.values.currentTime--;
    state.view.timeleft.textContent = state.values.currentTime;

    if(state.values.currentTime <= 0) {
        clearInterval(state.values.timerId);
        clearInterval(state.values.countDownTimerIdtimerId);
        alert("Game Over! O seu resultado foi: " + state.values.result);
    }
}


function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosision = randomSquare.id;
}

function moveEnemy(){
    state.values.timerId = setInterval(randomSquare,  state.values.gameVelocity);
}


function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosision) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosision = null;
                playSound("hit");
            }
            
        });
    });
}

function init() {
    moveEnemy();
    addListenerHitBox();
}


init();