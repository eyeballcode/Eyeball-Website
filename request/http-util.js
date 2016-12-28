const url = require('url');
const querystring = require('querystring');
const path = require('path');
const OutgoingResponse = require('./OutgoingResponse');

function parseCookies(cookies) {
    return cookies.split(/([^=]+=[^;]+);/).filter(Boolean).reduce((a, e) => {var p=e.split(/=/);a[p[0].trim()]=p[1];return a;}, {});
}

function parse(data, ...parsers) {
    for (let parser of parsers)
        try {
            return parser(data);
        } catch (e) {
        }
}

function processPost(request, response, callback) {
    var queryData = '';
    if(typeof callback !== 'function') return null;

    if(request.method === 'POST') {
        request.on('data', (data) => {
            queryData += data.toString();
            if(queryData.length > 1e6) {
                queryData = "";
                response.writeHead(413, {'Content-Type': 'text/plain'}).end();
                request.connection.destroy();
            }
        });

        request.on('end', () => {
            var parsed = parse(queryData, JSON.parse, querystring.parse, String);
            request.body = parsed;
            callback(request, response);
        });
    } else {
        callback(request, response);
    }
}

function setupIncoming(req, res, callback) {
    req.url = url.parse(req.url);
    req.path = path.parse(req.url.pathname);
    req.query = querystring.parse(req.url.query || '');
    req.ip = req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

    if (req.headers['cookie']) {
        req.cookies = parseCookies(req.headers['cookie']);
    } else req.cookies = {};

    var wrappedRes = new OutgoingResponse(req, res);

    processPost(req, wrappedRes, callback);
}

module.exports = {setupIncoming};
