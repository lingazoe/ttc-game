class logic {

    #data;
    #order;
    #currentStation;
    #pattern;
    #score;
    #chances;

    constructor(database) {

        this.#data = database;
    }

    setup() {

        this.#order = this.#data.getOrder;
        this.#currentStation = "1";
        this.#pattern = /[^a-zA-Z0-9\s\-\.\']/g;
        this.#score = 0;
        this.#chances = 3;
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

                return false;
            }
        }
    }

    //check if the user guess and the original scramble is right
    //user can try again if its wrong...
    ifCorrect(original, guess) {

        let fixedGuess = guess.toLowerCase().replace(/[.\'\-\s]/g, "");
        let fixedOriginal = original.replace(/\s/g, "");

        return fixedOriginal === fixedGuess;
    }

    //for other purposes
    reset() {

        this.getNewOrder();
        this.#currentStation = "1";
        this.#score = 0;
        this.resetChances();
    }

    //when 'show answer' is clicked
    getCurrentStationName() {

        return this.#data.getStationName(String(this.#order[this.#currentStation]));
    }

    getCurrentStationNameScrambled() {

        return this.#data.getStationNameScrambled(String(this.#order[this.#currentStation]));

    }

    setScore() {

        this.#score++;
    }

    getScore() {

        return String(this.#score);
    }

    setChances() {

        if (this.#chances > 0) {this.#chances--;}
    }

    getChancesString() {

        return String(this.#chances);
    }

    checkChances() {

        return (this.#chances > 1);
    }

    resetChances() {

        this.#chances = 3;
    }

    isValid(input) {

        if (!input || input.trim().length === 0) return false;
        if (input.length > 40) return false;
        if (this.#pattern.test(input)) return false;

        return true;
    }

    getNewOrder() {

        for (let i = this.#order.length - 1; i > 0; i--) {

            const j = Math.floor(Math.random() * (i + 1));

            [this.#order[i], this.#order[j]] = [this.#order[j], this.#order[i]];
        }
    }

    getIndex() {

        return this.#currentStation;
    }
}