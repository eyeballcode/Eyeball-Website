module.exports = function(req, res) {
    res.sendHTML('index', {
        title: 'Home',
        pageTitle: 'Home'
    });
}
