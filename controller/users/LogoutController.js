const BaseController = require('../BaseController');
const SessionModel = require('../../models/SessionModel');

class IndexController extends BaseController {
    get name() {
        return 'Logout Controller';
    }

    run(req, res) {
        new SessionModel(users, sessions).getSession(req.cookies.session, (err, session) => {
            if (session) {
                res.setCookie('session', '', true, 0);
                res.end();
            } else {
                res.writeHead(400);
                res.end('Not Logged In');
            }
        });
    }
}

module.exports = IndexController;
