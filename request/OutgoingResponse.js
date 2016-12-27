const etag = require('etag');
const path = require('path');
const fs = require('fs');
const pug = require('pug');
const util = require('../util/utils');

class OutgoingResponse {
    constructor(req, res) {
        this.res = res;
        this.req = req;
        this.statusCode = 200;
        this.headers = {};
        this.buffer = Buffer.alloc(0);
        this.hasEnded = false;
        this.useCaching = true;
    }

    setHeader(key, val) {
        this.headers[key] = val;
    }

    status(code) {
        this.statusCode = code;
    }

    send(data) {
        if (this.hasEnded) throw new Error('Write after end');
        if (Buffer.isBuffer(data))
            this.buffer = Buffer.concat([this.buffer, data]);
         else if (typeof data === 'string')
            this.buffer = Buffer.concat([this.buffer, Buffer.from(data.toString())]);

    }

    writeHead(code, headers) {
        this.statusCode = code;
        this.headers = headers;
    }

    end(data) {
        if (data) {
            this.send(data);
        }
        this.hasEnded = true;
        var {req, res} = this;
        var body = this.buffer;
        if (this.useCaching && (this.statusCode >= 200 && this.statusCode <= 400)) {
            var bodyETag = etag(body.toString());
            if (req.headers['if-none-match'] && req.headers['if-none-match'] === bodyETag) {
                res.writeHead(304, this.headers);
                res.end();
            } else {
                Object.assign(this.headers, {
                    'ETag': bodyETag
                })
                res.writeHead(this.statusCode, this.headers);
                res.end(body);
            }
        } else {
            res.writeHead(this.statusCode, this.headers);
            res.end(body);
        }
    }

    setCaching(caching) {
        this.useCaching = caching;
    }

    sendHTML(name, variables) {
        var htmlPath = path.join(__dirname, '../html', name + '.pug');
        var html = pug.renderFile(htmlPath, variables, {
            cache: util.isTesting()
        });
        this.setHeader('Content-Type', 'text/html');
        this.end(html);
    }

    sendJSON(json) {
        this.setHeader('Content-Type', 'application/json');
        this.end(JSON.stringify(json));
    }

}

module.exports = OutgoingResponse;
