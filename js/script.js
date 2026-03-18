
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

    //--- CLICKING THE 'SUBMIT' BUTTON ---//

    submitBTN.addEventListener('click', () => {

        const userGuess = inputDisplay.value;

        gameLogic.isValid(userGuess);

        textDisplay.textContent = userGuess;
    });
}

//start the game
start();
