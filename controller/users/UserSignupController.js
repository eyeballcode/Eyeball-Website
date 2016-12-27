const BaseController = require('../BaseController');
const SessionModel = require('../../models/SessionModel');

class IndexController extends BaseController {
    get name() {
        return 'User Signup Controller';
    }

    run(req, res) {
        switch (req.method) {
            'GET':
                new SessionModel(sessions).getSession(req.cookies.sessionID, (err, session) => {
                    if (session) {
                        res.writeHead(302, {
                            'Location': '/'
                        });
                        res.end();
                    } else {
                        res.sendHTML('users/signup');
                    }
                });
                break;
            'POST':
                break;
            default:
                res.sendJSON({
                    'ErrorMessage': 'MethodNotAllowed',
                    'Reason': 'Use POST or GET instead.'
                });
                break;
        }
    }
}

module.exports = IndexController;
