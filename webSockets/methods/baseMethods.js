
function ping(ws, message, metadata) {
    const wsMethodResult = {};
    wsMethodResult.message = {
        data: metadata
    }
    wsMethodResult.needResponse = true;

    return wsMethodResult;
}

function pingAll(ws, message, metadata) {
    const wsMethodResult = ping(ws, message, metadata);

    return wsMethodResult;
}



module.exports = {
    ping,
    pingAll

}