const Arguments = require('./arguments');
const path = require('path');
const fs = require('fs');
var config = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'config.json')));

function parseArgs(args) {
    args = args || process.argv;
    var foundNodeExec = false;
    var foundFileName = false;
    return new Arguments(args.filter((element) => {
        if (path.parse(element).name === process.argv0) {
            foundNodeExec = true;
            return false;
        }
        if (foundNodeExec && !foundFileName) {
            foundFileName = true;
            return false;
        }
        return foundNodeExec
    }));
}

function isTesting() {
    return config.mode ? config.mode !== 'production' : (process.env.NODE_ENV || '').toUpperCase() !== 'PRODUCTION';
}

function isProduction() {
    return !isTesting();
}

function requireUncached(module){
    delete require.cache[require.resolve(module)]
    return require(module)
}

module.exports = {parseArgs, isTesting, isProduction, requireUncached};
