
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 13372 });
const wsMethods = require('./getWsMethods');

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

        let message = '';

        try {
            message = JSON.parse(messageAsString);

        } catch (e) {
            console.error('WS JSON parse error', messageAsString, e);
            ws.send('{"error": "JSON parse error"}');
            return;
        }

        if (!message.method) {
            ws.send('{"error": "No method specified"}');
            return;
        }

        if (!wsMethods[message.method]) {
            ws.send('{"error": "Unknown method"}');
            return;
        }

        const metadata = clients.get(ws);
        let wsMethodResult = {};

        try {
            wsMethodResult = wsMethods[message.method](ws, message, metadata);

        } catch (e) {
            console.error('WS method error', message.method, e);
            ws.send('{"error": "Method error"}');
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