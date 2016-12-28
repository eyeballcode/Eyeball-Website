const BaseView = require('../BaseView');

class UserSignupView extends BaseView {

    constructor() {
        super();
    }

    render(res) {
        res.sendHTML('users/signup');
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
        res.setCookie('session', sessionID);
        res.end();
    }
}

module.exports = UserSignupView;
