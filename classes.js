
const uuid = require('uuid').v4;

class LetterTile {
    constructor(letter) {
        this.id = uuid();
        this.letter = letter;
        this.value = 1;
    }    
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getAlphabetArray() {
    return "abcdefghijklmnopqrstuvwxyz".split('');
}

function getRandomLetter(distribution = "uniform") {
    const letters = getAlphabetArray();
    return letters[getRandomInt(letters.length)];
}

class GameQueue {
    constructor() {
        this.queue = [];
    }

    addPlayer(player) {
        this.queue.push(player);
        return this;
    }

    getPlayers() {
        return Array.from(this.queue);
    }

    popPlayers() {
        const players = this.queue;
        this.queue = [];
        return players;
    }
}

class GameState {
    constructor(numPlayers = 1, numTiles = 10, inProgress=false) {
        this.id = uuid();
        this.players = new Array(numPlayers);
        this.letters = new Array(numTiles).fill(0).map(i=> new LetterTile(getRandomLetter()));
        this.inProgress = false;
        this.startTime = null;
        this.endTime = null;
        this.winner = null;
    }

    addPlayer(player) {
        this.players.push(player);
        return this;
    }

    start() {
        this.inProgress = true;
        this.startTime = new Date();
        return this;
    }

    end() {
        this.inProgress = false;
        this.endTime = new Date();
    }

    setWinner(player) {
        this.winner = player;
        if (this.inProgress) this.end();
        return this;
    }
}

module.exports = {
    GameState,
    GameQueue
}