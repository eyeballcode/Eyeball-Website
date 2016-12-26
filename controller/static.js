const mappings = require('../request/mappings');
const util = require('../util/utils');
const path = require('path');
const fs = require('fs');

function send404(req, res) {
    require(path.join(__dirname, '../controller', mappings.errors[404]))(req, res);
}

function getContentType(extension) {
    if (extension === 'js') {
        return 'text/javascript';
    } else if (extension === 'css') {
        return 'text/css';
    } else if (extension === 'png') {
        return 'image/png';
    } else if (extension === '') {
        return 'application/x-font-ttf';
    } else {
        return 'text/plain';
    }
}

module.exports = function(req, res) {
    var requestPath = req.path;
    if (requestPath.dir !== '/static') {
        send404(req, res);
        return;
    }
    fs.readFile(path.join(__dirname, '../static', requestPath.name + requestPath.ext), (err, data) => {
        if (err) {
            send404(req, res);
        } else {
            res.writeHead(200, {
                'Content-Type': getContentType(requestPath.ext.substr(1))
            });
            if (util.isProduction())
                res.setHeader('Cache-Control', 'public, max-age=31536000')
            res.end(data);
        }
    });
}
