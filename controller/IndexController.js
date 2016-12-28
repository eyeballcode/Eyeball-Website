const SessionController = require('./SessionController');
const IndexView = require('../views/IndexView');

class IndexController extends SessionController {

    constructor() {
        super();
    }

    get name() {
        return 'Index Controller';
    }

    run(req, res) {
        super.getSession(req, session => {
            new IndexView().render(res, session);
        });
    }
}

module.exports = IndexController;
