const BaseController = require('./BaseController');
const SessionModel = require('../models/SessionModel');
const IndexView = require('../views/IndexView');

class IndexController extends BaseController {
    get name() {
        return 'Index Controller';
    }

    run(req, res) {
        new SessionModel(sessions).getSession(req.cookies.sessionID, (err, session) => {
            new IndexView().render(res, session);
        });
    }
}

module.exports = IndexController;
