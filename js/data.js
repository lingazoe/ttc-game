class data { 

    #stations = new Map(); 
    #order = [];

    async load() {

        try {
            const response = await fetch('../data/ttc - line_1.csv');
            const text = await response.text();

            const rows = text.split('\n');

            rows.forEach(row => {

                if (!row || row.trim() === "") return;

                const cols = row.split(',');

                if (cols.length >= 2) {

                    const id = cols[0].trim();
                    const name = cols[1].trim();

                    const scrambledName = name.replace(/\s+/g, '');

                    console.log('oh its working!');
                    
                    this.#stations.set(id, {
                        original: name.toLowerCase(), 
                        scrambled: this.scramble(scrambledName).toLowerCase()
                    });
                }
            });

        } catch (error) {
            console.error("There's an error loading the CSV:", error);
        }

        this.#order = Array.from(this.#stations.keys());
        this.shuffleOrder();
    }

    scramble(station) {

        let letters = station.split('');

        for (let i = letters.length - 1; i > 0; i--) {

            const j = Math.floor(Math.random() * (i + 1));

            [letters[i], letters[j]] = [letters[j], letters[i]];
        }

        return letters.join("");
    }

    shuffleOrder() {

        for (let i = this.#order.length - 1; i > 0; i--) {

            const j = Math.floor(Math.random() * (i + 1));

            [this.#order[i], this.#order[j]] = [this.#order[j], this.#order[i]];
        }
    }

    get getOrder() {

        return this.#order;
    }

    getStationName(id) {

        const station = this.#stations.get(String(id));

        if (!station) {
            console.log('something went wrong');
            return "uh oh";
        }

        return station.original;
    }

    getStationNameScrambled(id) {

        const station2 = this.#stations.get(String(id));

        if (!station2) {
            console.log('something went wrong');
            return "uh oh";
        }

        return station2.scrambled;
    }

    //checking if it atcually worked lol

    getAllStations() {

        return Array.from(this.#stations.values());
    }
}