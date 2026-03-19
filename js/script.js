
//initialize the data
const gameData = new data();

//initalize the necessary HTML Elements
const textDisplay = document.querySelector(".scrambled");
const inputDisplay = document.querySelector(".guess");
const answerBTN = document.querySelector("#answer");
const nextBTN = document.querySelector("#next");
const submitBTN = document.querySelector("#checking");

//hide the [NEXT] button
nextBTN.classList.add('hidden');

async function start() {

    //initialize game logic
    const gameLogic = new logic(gameData);

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

    console.log(gameLogic.getCurrentStationName());

    //--- CLICKING THE 'SUBMIT' BUTTON ---//

    /*
    
    DELETE LATER?

    if value in textbox is: empty, too long, too short, invalid hacks?
    return false. else, return true...and continue on:

    if value in textbox is equal to answer, return true.
    else, return false.
    
    if false, show red. if true, show green.

    once green is shown, disable submit btn and texting.

    show the 'next' button.
    
    */

    submitBTN.addEventListener('click', () => {

        const guess = inputDisplay.value();

        guessLogic(guess);
    });

    answerBTN.addEventListener('click', () => {


        answerBTN.classList.add('hidden');
        nextBTN.classList.remove('hidden');

        inputDisplay.ariaReadOnly = true;
    });

    nextBTN.addEventListener('click', () => {

        nextBTN.classList.add('hidden');
        answerBTN.classList.remove('hidden');

        inputDisplay.ariaReadOnly = false;
        inputDisplay.classList.remove('green-border', 'red-border');
    });
}

function guessLogic(guess) {

    if (gameLogic.isValid(guess) && gameLogic.ifCorrect(gameLogic.getCurrentStationName(), guess)) {

        inputDisplay.classList.add('green-border');

        answerBTN.classList.add('hidden');
        nextBTN.classList.remove('hidden');

        inputDisplay.ariaReadOnly = true;

        return;
    }

    inputDisplay.classList.add('red-border');
}

//start the game
start();
