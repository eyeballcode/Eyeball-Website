const BaseView = require('../BaseView');

class UserSignupView extends BaseView {

    constructor() {
        super();
    }

    render(res) {
        res.sendHTML('users/signup');
    }
}

module.exports = UserSignupView;
