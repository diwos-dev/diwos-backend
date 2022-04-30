
const world = require('models/world');

function getWorld(ws, request, metadata) {
    const wsMethodResult = {};
    wsMethodResult.message = {
        data: world
    }
    wsMethodResult.needResponse = true;

    return wsMethodResult;
}

function forceUpdateWorld(ws, request, metadata) {
    world = request.world;
    const wsMethodResult = {};
    wsMethodResult.message = {
        data: world
    }
    wsMethodResult.needBroadcast = true;

    return wsMethodResult;
}

function forceMainObjUpdate(ws, request, metadata) {

    const userObj = metadata.user.mainObj;

    if (!world[userObj]) {
        throw new Error('User has no main object');
    }

    if (!request.objData) {
        throw new Error('Request has no objData');
    }

    for (const objKey in request.objData) {
        world[userObj][objKey] = request.objData[objKey];
    }

    const wsMethodResult = {};
    wsMethodResult.message = {
        data: world,
        method: 'getWorld'
    }
    wsMethodResult.needBroadcast = true;
    return wsMethodResult;
}

module.exports = {
    getWorld,
    forceUpdateWorld,
    forceMainObjUpdate,

}