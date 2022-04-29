
const world = require('models/world');

function getWorld(ws, message, metadata) {
    const wsMethodResult = {};
    wsMethodResult.message = {
        data: world
    }
    wsMethodResult.needResponse = true;

    return wsMethodResult;
}

module.exports = {
    getWorld

}