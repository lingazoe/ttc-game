
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
const submitBTN = document.querySelector("#checking");


//hide the [NEXT] button
nextBTN.classList.add('hidden');

async function start() {

    //initialize

    //load the csv
    await gameData.load();

    //load other data
    gameLogic.setup();

    //reset values just in case...
    gameLogic.reset();

    /*

    When the web page loads, user should be able to see:

    A scrambled text. Each time the website is refreshed, the website generates another
    scrambled text.
    
    The input text box, with a black border. Has a sample station inside for example.

    Has 2 buttons: Submit and Show Answer.
    
    */

    textDisplay.textContent = gameLogic.getCurrentStationNameScrambled();

    //console.log(gameLogic.getCurrentStationName());

    submitBTN.addEventListener('click', () => {

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

        gameLogic.iterateStations(true);
        gameLogic.resetChances();

        textDisplay.textContent = gameLogic.getCurrentStationNameScrambled();
        chancesDisplay.textContent = "chances: " + gameLogic.getChancesString();
        //console.log(gameLogic.getCurrentStationName());
    });
}

function guessLogic(guess) {

    if (gameLogic.isValid(guess) && gameLogic.ifCorrect(gameLogic.getCurrentStationName(), guess)) {

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

//start the game
start();
