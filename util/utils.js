const Arguments = require('./arguments');
const path = require('path');

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
    return (process.env.NODE_ENV || '').toUpperCase() !== 'PRODUCTION';
}

function isProduction() {
    return !isTesting();
}

function requireUncached(module){
    delete require.cache[require.resolve(module)]
    return require(module)
}

module.exports = {parseArgs, isTesting, isProduction, requireUncached};
