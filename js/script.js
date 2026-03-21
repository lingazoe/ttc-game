
//initialize the data
const gameData = new data();
const gameLogic = new logic(gameData);

//initalize the necessary HTML Elements
const textDisplay = document.querySelector(".scrambled");
const inputDisplay = document.querySelector(".guess");
const scoreDisplay = document.querySelector("#score");
const chancesDisplay = document.querySelector("#chances");
const answerBTN = document.querySelector("#answer");
const nextBTN = document.querySelector("#next");
const endBTN = document.querySelector("#end");
const statDisplay = document.querySelector(".res-container");
const backgroundDisplay = document.querySelector(".res-background");

const statScore = document.querySelector("#scores");
const highScore = document.querySelector("#high-score");
const scoreRate = document.querySelector("#score-rating");

nextBTN.classList.add('hidden');
statDisplay.classList.add('hidden');
backgroundDisplay.classList.add('hidden');

async function start() {

    //initialize

    //load the csv
    await gameData.load();

    //load other data
    gameLogic.setup();

    //reset values just in case...
    gameLogic.reset();

    textDisplay.textContent = gameLogic.getCurrentStationNameScrambled();

    //console.log(gameLogic.getCurrentStationName());

    inputDisplay.addEventListener('keypress', (event) => {

        if (event.key === 'Enter') {

            if (!(gameLogic.checkChances())) {

                textDisplay.textContent = gameLogic.getCurrentStationName();
                answerBTN.classList.add('hidden');
                nextBTN.classList.remove('hidden');

                inputDisplay.classList.add('disable');
                inputDisplay.classList.remove('green-border', 'red-border');

            }

            const guess = inputDisplay.value;

            guessLogic(guess);

            chancesDisplay.textContent = "chances: " + gameLogic.getChancesString();

            }
    });

    endBTN.addEventListener('click', () => {

        endRound();
    });

    answerBTN.addEventListener('click', () => {

        textDisplay.textContent = gameLogic.getCurrentStationName();
        answerBTN.classList.add('hidden');
        nextBTN.classList.remove('hidden');

        inputDisplay.classList.add('disable');
        inputDisplay.classList.remove('green-border', 'red-border');
    });

    nextBTN.addEventListener('click', () => {

        nextBTN.classList.add('hidden');
        answerBTN.classList.remove('hidden');

        inputDisplay.classList.remove('disable');
        inputDisplay.value = "";
        inputDisplay.classList.remove('green-border', 'red-border');

        if (gameLogic.iterateStations(true)) {

            gameLogic.resetChances();

            textDisplay.textContent = gameLogic.getCurrentStationNameScrambled();
            chancesDisplay.textContent = "chances: " + gameLogic.getChancesString();
        }

        else {

            endRound();
        }
        //console.log(gameLogic.getCurrentStationName());
    });
}

function guessLogic(guess) {

    if (gameLogic.isValid(guess) && gameLogic.ifCorrect(gameLogic.getCurrentStationName(), guess)) {

        gameLogic.setScore();

        inputDisplay.classList.add('green-border');

        answerBTN.classList.add('hidden');
        nextBTN.classList.remove('hidden');

        inputDisplay.ariaReadOnly = true;

        scoreDisplay.textContent = "score: " + gameLogic.getScore();

        return;
    }

    inputDisplay.classList.add('red-border');

    gameLogic.setChances();
}

function endRound() {

    statDisplay.classList.remove('hidden');
    backgroundDisplay.classList.remove('hidden');

    statScore.textContent = "score: " + gameLogic.getScore();
    scoreRate.textContent = "score rating: " + gameLogic.calcRating() + "%";
}

//start the game
start();
