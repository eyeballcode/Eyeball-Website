const BaseView = require('./BaseView');
const util = require('../util/utils');

class StaticView extends BaseView {

    constructor() {
        super();
    }

    render(res, data, contentType) {
        res.writeHead(200, {
            'Content-Type': contentType
        });
        if (util.isProduction())
            res.setHeader('Cache-Control', 'public, max-age=31536000')
        res.end(data);
    }
}

module.exports = StaticView;
