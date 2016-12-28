const BaseController = require('../BaseController');

class IndexController extends BaseController {
    get name() {
        return 'Post User Action Controller';
    }

    run(req, res) {
        res.writeHead(302, {
            'Location': '/'
        });
        res.end();
    }
}

module.exports = IndexController;
