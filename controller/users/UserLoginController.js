const BaseController = require('../BaseController');
const SessionModel = require('../../models/SessionModel');
const UserModel = require('../../models/UserModel');
const UserLoginView = require('../../views/users/UserLoginView');

class IndexController extends BaseController {
    get name() {
        return 'User Signup Controller';
    }

    run(req, res) {
        var view = new UserLoginView(users);
        switch (req.method) {
            case 'GET':
                new SessionModel(users, sessions).getSession(req.cookies.sessionID, (err, session) => {
                    if (session) {
                        this.alreadySignedIn(res);
                    } else {
                        view.render(res);
                    }
                });
                break;
            case 'POST':
                var userModel = new UserModel(users, sessions);
                if (typeof req.body === 'string') {
                    //Failed to parse JSON
                    this.invalidMedia(res);
                    return;
                }
                userModel.canUserLogin(req.body, (canLogin, reason) => {
                    if (canLogin) {
                        userModel.login(req.body, sessionID => {
                            this.loginOk(res, sessionID);
                        });
                    } else {
                        this.loginError(res, reason);
                    }
                });
                break;
            default:
                res.sendJSON({
                    'ErrorMessage': 'MethodNotAllowed',
                    'Reason': 'Use POST or GET instead.'
                });
                break;
        }
    }

    alreadySignedIn(res) {
        res.writeHead(302, {
            'Location': '/'
        });
        res.end();
    }

    invalidMedia(res) {
        res.writeHead(415);
        res.sendJSON({
            'ErrorMessage': 'UnsupportedMediaType',
            'Reason': 'Use JSON instead.'
        });
    }

    loginError(res, reason) {
        res.writeHead(400);
        res.sendJSON({
            'ErrorMessage': 'LoginError',
            'Reason': reason
        });
    }

    loginOk(res, sessionID) {
        res.writeHead(200);
        res.setCookie('session', sessionID, true, +new Date() + 31536000);
        res.end();
    }

}

module.exports = IndexController;
