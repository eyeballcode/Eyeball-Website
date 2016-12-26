const BaseView = require('./BaseView');

class IndexView extends BaseView {

    constructor() {
        super();
    }

    render(res, session) {
        res.sendHTML('index', session);
    }
}

module.exports = IndexView;
