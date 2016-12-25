const http = require('http');
const https = require('https');
const fs = require('fs');

const utils = require('./util/utils');
const handler = require('./request/handler');
const httpRedirect = require('./request/http-redirect');

const config = JSON.parse(fs.readFileSync('config.json'));

const args = utils.parseArgs();

const port = parseInt((args.hasValue('port') ? args.getValue('port') : (utils.isTesting() ? 8000 : 80)));

const serverLocation = config[utils.isTesting() ? 'testing' : 'production'].serverURL.replace(/\$\{PORT\}/, port === 80 ? '' : `:${port}`);

global.server = null;
global.redirectServer = null;

function registerListeners(server, serverName, port) {
    server.on('listening', () => {
        console.log(`${serverName} listening on ${port}`);
    });
    server.on('error', error => {
        if (error.syscall !== 'listen') throw err;
        switch (error.code) {
            case 'EACCES':
                console.error(`Port ${port} for ${serverName} requires elevated privileges`);
                break;
            case 'EADDRINUSE':
                console.error(`Port ${port} for ${serverName} is in use`);
            default:
                throw error;
        }
        process.exit(1);
    });
}

function setupHTTPOnly() {
    server = http.createServer(handler());
    server.listen(port);
    registerListeners(server, 'http request handler', port);
}

function setupHTTPSWithRedirect() {
    server = https.createServer({}, handler());
    redirectServer = http.createServer(httpRedirect(serverLocation));
    server.listen(443);
    redirectServer.listen(port);
    registerListeners(server, 'https request handler', 443);
    registerListeners(redirectServer, 'http redirect', port);
}

function setupServers() {
    if (args.hasFlag('no-https')) {
        setupHTTPOnly();
    } else {
        setupHTTPSWithRedirect();
    }
}

setupServers();
