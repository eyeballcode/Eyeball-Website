const BaseController = require('../BaseController');
const ErrorView = require('../../views/ErrorView');

class Error404Controller extends BaseController {

    get name() {
        return 'Error 404 Controller';
    }

    run(req, res) {
        res.setCaching(false);
        new ErrorView().render(res, 404);
    }
}

module.exports = Error404Controller;
