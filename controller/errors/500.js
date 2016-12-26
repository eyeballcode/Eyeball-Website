module.exports = function(req, res, err) {
    res.setCaching(false);
    res.writeHead(500, {
        'Content-Type': 'text/plain'
    });
    res.send('500: \n');
    res.end(err.stack);
}
