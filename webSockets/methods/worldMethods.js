
const world = require('models/world');

function getWorld(ws, message, metadata) {
    const wsMethodResult = {};
    wsMethodResult.message = {
        data: world
    }
    wsMethodResult.needResponse = true;

    return wsMethodResult;
}

function forceUpdateWorld(ws, message, metadata) {
    world = message.world;
    const wsMethodResult = {};
    wsMethodResult.message = {
        data: world
    }
    wsMethodResult.needBroadcast = true;

    return wsMethodResult;
}

module.exports = {
    getWorld,
    forceUpdateWorld

}