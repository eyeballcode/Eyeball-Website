const BaseView = require('./BaseView');

class ErrorView extends BaseView {

    constructor() {
        super();
    }

    render(res, errorCode, error) {
        res.writeHead(errorCode);
        res.send(`${errorCode}:\n${error ? error.stack : ''}`);
        res.end();
    }
}

module.exports = ErrorView;
