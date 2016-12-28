const BaseController = require('../BaseController');
const SessionModel = require('../../models/SessionModel');
const UserModel = require('../../models/UserModel');
const UserSignupView = require('../../views/users/UserSignupView');

class IndexController extends BaseController {
    get name() {
        return 'User Signup Controller';
    }

    run(req, res) {
        var view = new UserSignupView(users);
        switch (req.method) {
            case 'GET':
                new SessionModel(sessions).getSession(req.cookies.sessionID, (err, session) => {
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
                userModel.canUserSignup(req.body, (canSignup, reason) => {
                    if (canSignup) {
                        userModel.signup(req.body, sessionID => {
                            this.signupOk(res, sessionID);
                        });
                    } else {
                        this.signupError(res, reason);
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

    signupError(res, reason) {
        res.writeHead(400);
        res.sendJSON({
            'ErrorMessage': 'SignupError',
            'Reason': reason
        });
    }

    signupOk(res, sessionID) {
        res.writeHead(302, {
            'Location': '/'
        });
        res.setCookie('session', sessionID, true, +new Date() + 31536000);
        res.end();
    }

}

module.exports = IndexController;
