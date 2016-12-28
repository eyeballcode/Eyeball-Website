const BaseController = require('./BaseController');
const StaticDataModel = require('../models/StaticDataModel');
const StaticView = require('../views/StaticView');
const Error404Controller = require('./errors/Error404Controller');

class StaticController extends BaseController {
    get name() {
        return 'Static Controller';
    }

    run(req, res) {
        var model = new StaticDataModel();
        model.getFileData(req, data => {
            if (data) {
                var format = StaticDataModel.getContentType(req.path.ext.substr(1));
                new StaticView().render(res, data, format);
            } else {
                new Error404Controller().run(req, res);
            }
        });
    }
}

module.exports = StaticController;
