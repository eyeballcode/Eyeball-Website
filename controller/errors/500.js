module.exports = function(req, res) {
    res.setCaching(false);
    res.writeHead(500, {
        'Content-Type': 'text/plain'
    });
    res.end('500');
}
