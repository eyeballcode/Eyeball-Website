module.exports = function(serverLocation) {
    return function(req, res) {
        res.writeHead(302, {
            'Location': serverLocation
        });
        res.end();
    }
}
