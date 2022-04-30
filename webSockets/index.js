
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 13372 });
const wsMethods = require('./getWsMethods');
const users = require('models/users');
const world = require('models/world');

const clients = new Map();

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

wss.on('connection', (ws) => {
    const id = uuidv4();
    const color = Math.floor(Math.random() * 360);
    const metadata = { id, color };

    clients.set(ws, metadata);

    ws.on('message', (messageAsString) => {

        let request = {};

        try {
            request = JSON.parse(messageAsString);

        } catch (e) {
            console.error('WS JSON parse error', messageAsString, e);
            ws.send('{"error": "JSON parse error"}');
            return;
        }

        if (!request.method) {
            ws.send('{"error": "No method specified"}');
            return;
        }

        if (!wsMethods[request.method]) {
            ws.send('{"error": "Unknown method"}');
            return;
        }

        if (!users[request.login]) {
            ws.send('{"error": "Unknown user"}');
            return;
        }

        if (!users[request.login].token == request.token) {
            ws.send('{"error": "Wrong token"}');
            return;
        }

        const metadata = clients.get(ws);
        let wsMethodResult = {};

        const user = users[request.login];
        metadata.user = user;

        if (!world[user.mainObj]) {
            ws.send('{"error": "User has no main object"}');
        }

        try {
            wsMethodResult = wsMethods[request.method](ws, request, metadata);

        } catch (error) {
            console.error('WS method error', request.method, error);
            ws.send('{"error": "Method error ' + JSON.stringify(error.message) + ' "}');
            return;
        }

        const outbound = JSON.stringify(wsMethodResult.message);

        if (wsMethodResult.needBroadcast) {
            [...clients.keys()].forEach((client) => {
                client.send(outbound);
            });

        } else if (wsMethodResult.needResponse) {
            ws.send(outbound);

        }
    
    });
    
    ws.on("close", () => {
        clients.delete(ws);
    });

});

console.log("wss up");