const express = require('express');
const http = require('http')
const socketIO = require('socket.io')
const {GameState, GameQueue} = require('./classes');
const responses = require('./responses');
const cors = require('cors');

const port = process.env.port || 5000;
const app = express(port);
const httpServer = http.Server(app);
const io = socketIO(httpServer,{
    cors: {
        origin: "http://localhost:8080",
    }
});

app.use(cors());
app.use(express.static(__dirname + "/dist"));

httpServer.listen(port,()=>console.log('listening on port',port));

const game = new GameState();
const gameQueue = new GameQueue();

class Player {
    constructor(id,name,isReady = false) {
        this.id = id;
        this.name = name;
        this.isReady = isReady;
    }

    startGame() {
        this.isReady = true;
    }
}

io.on('connection',(socket,data)=>{
    console.log('new user connected',socket.request._query);
    const newPlayer = new Player(socket.id,socket.request._query.name);
    if (game.inProgress) {
        gameQueue.addPlayer(newPlayer);
        socket.emit('msg',responses.addedToQueue);
    } else {
        game.addPlayer(newPlayer);
        socket.emit('msg',responses.addedToGame);
    }
})