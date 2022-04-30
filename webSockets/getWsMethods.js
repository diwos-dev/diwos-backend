
const baseMethods = require('./methods/baseMethods');
const worldMethods = require('./methods/worldMethods');

const rawMethods = {};
const wsMethods = {};
Object.assign(rawMethods, baseMethods, worldMethods);

for (let rawMethod in rawMethods) {
    wsMethods[rawMethod] = fryMethod(rawMethods[rawMethod], rawMethod);
}


function fryMethod(rawMethod, rawMethodName) {

    return (ws, message, metadata) => {

        const rawMethodResult = rawMethod(ws, message, metadata);
        
        if (!rawMethodResult.message) {
            rawMethodResult.message = {};
        }

        if (!rawMethodResult.message.method) {
            rawMethodResult.message.method = rawMethodName;
        }

        if (!rawMethodResult.message.date) {
            if (!message.date) {
                rawMethodResult.message.date = new Date();
            } else {
                rawMethodResult.message.date = message.date;
            }
        }

        console.log(rawMethodName, rawMethodResult);

        return rawMethodResult;

    }

}



module.exports = wsMethods