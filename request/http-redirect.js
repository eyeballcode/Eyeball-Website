module.exports = function(serverLocation) {
    return function(req, res) {
        res.writeHead(301, {
            'Location': serverLocation
        });
        res.end();
    }
}
