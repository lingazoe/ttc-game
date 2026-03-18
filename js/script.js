const gameData = new data();

const textDisplay = document.querySelector(".scrambled");
const inputDisplay = document.querySelector(".guess");
const answerBTN = document.querySelector("#answer");
const nextBTN = document.querySelector("#next");
const submitBTN = document.querySelector("#checking");

nextBTN.classList.add('hidden');

async function start() {

    const gameLogic = new logic(gameData);

    await gameData.load();

    gameLogic.setup();

    //display answer and display the button
    answerBTN.addEventListener('click', () => {

        const answer = gameLogic.getCurrentStationName();

        textDisplay.textContent = answer;

        nextBTN.classList.remove('hidden');
        answerBTN.classList.add('hidden');

        inputDisplay.classList.remove('green-border');
    });
}

start();
