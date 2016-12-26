const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const mongodb = require('mongodb');

const utils = require('./util/utils');
const handler = require('./request/handler');
const httpRedirect = require('./request/http-redirect');

const config = JSON.parse(fs.readFileSync('config.json'));
const args = utils.parseArgs();
const port = parseInt((args.hasValue('port') ? args.getValue('port') : (utils.isTesting() ? 8000 : 80)));
const serverLocation = config[utils.isTesting() ? 'testing' : 'production'].serverURL.replace(/\$\{PORT\}/, port === 80 ? '' : `:${port}`);
const repositoryClass = 'MongoRepository'
const Repository = require(`./repo/${repositoryClass}`);
const MONGO_SERVER = 'mongodb://localhost:27017/EyeballWebsite';

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
    server = https.createServer({
        key: fs.readFileSync(path.join(__dirname, 'https/privkey.pem')),
        cert: fs.readFileSync(path.join(__dirname, 'https/cert.pem')),
        ca: fs.readFileSync(path.join(__dirname, 'https/chain.pem'))
    }, handler());
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

function connectToMongo(callback) {
    var client = new mongodb.MongoClient();
    client.connect(MONGO_SERVER, function (err, db) {
        if (err) throw err;
        global.users = new Repository(db, 'users');
        global.sessions = new Repository(db, 'sessions');
        callback();
    });
}

connectToMongo(setupServers);
