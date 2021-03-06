const Websocket = require('ws');

const P2P_PORT = process.env.P2P_PORT || 5001;
const peers = process.env.PEERS ? process.env.P2P_PORT.split(',') : [];

class P2pServer {
    constructor(blockchain) {
        this.blockchain = blockchain;
        this.sockets = [];
    }

    listen() {
        const server = new Websocket.Server({ port: P2P_PORT });
        server.on('connection', socket => this.connectSocket(socket));
    }

    connectSocket(socket) {
        this.sockets.push(socket);
        comsole.log('Socket connected');
    }
}

module.exports = P2pServer;