class logic {

    #data;
    #order;
    #currentStation;
    #pattern;

    constructor(database) {

        this.#data = database;
    }

    setup() {

        this.#order = this.#data.getOrder;
        this.#currentStation = "1";
        this.#pattern = /[^a-zA-Z0-9\s\-\.\']/g;
    }

    //if station was guessed right or station was skipped;
    //return show answer
    iterateStations(confirmation) {

        //after show answer is clicked
        if (confirmation) {

            let currentIndex = Number(this.#currentStation);

            if (currentIndex < this.#order.length - 1) {

                currentIndex++;

                this.#currentStation = String(currentIndex);

                //send the new station
                //display new station when 'next' is clicked
                return this.#data.getStationName(this.#order[this.#currentStation]);
            }

            else {

                this.reset();
            }
        }
    }

    //check if the user guess and the original scramble is right
    //user can try again if its wrong...
    ifCorrect(original, guess) {

        let fixedGuess = guess.toLowerCase().replace(/[.\'\-\s]/g, "");
        let fixedOriginal = original.replace(/\s/g, "");

        console.log(fixedGuess);
        console.log(fixedOriginal);

        return fixedOriginal === fixedGuess;
    }

    //for other purposes
    reset() {

        this.#currentStation = "1";
    }

    //when 'show answer' is clicked
    getCurrentStationName() {

        return this.#data.getStationName(String(this.#order[this.#currentStation]));
    }

    getCurrentStationNameScrambled() {

        return this.#data.getStationNameScrambled(String(this.#order[this.#currentStation]));

    }

    isValid(input) {

        if (!input || input.trim().length === 0) return false;
        if (input.length > 40) return false;
        if (this.#pattern.test(input)) return false;

        return true;
    }
}