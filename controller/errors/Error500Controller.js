const BaseController = require('../BaseController');
const ErrorView = require('../../views/ErrorView');

class Error500Controller extends BaseController {
    get name() {
        return 'Error 500 Controller';
    }

    run(req, res, error) {
        res.setCaching(false);
        new ErrorView().render(res, 500, error);
    }
}

module.exports = Error500Controller;
