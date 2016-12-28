const BaseController = require('./BaseController');
const SessionModel = require('../models/SessionModel');

class SessionController extends BaseController {
    get name() {
        return 'Session Controller';
    }

    run(req, res) {

    }

    getSession(req, cb) {
        new SessionModel(users, sessions).getSession(req.cookies.session, (err, session) => {
            cb(session);
        });
    }
}

module.exports = SessionController;
