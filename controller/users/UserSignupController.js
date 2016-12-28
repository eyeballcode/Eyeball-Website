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
                        view.alreadySignedIn(res);
                    } else {
                        view.render(res);
                    }
                });
                break;
            case 'POST':
                var userModel = new UserModel(users, sessions);
                if (typeof req.body === 'string') {
                    //Failed to parse JSON
                    view.invalidMedia(res);
                    return;
                }
                userModel.canUserSignup(req.body, (canSignup, reason) => {
                    if (canSignup) {
                        userModel.signup(req.body, sessionID => {
                            view.signupOk(res, sessionID);
                        });
                    } else {
                        view.signupError(res, reason);
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
}

module.exports = IndexController;
