const httpUtil = require('./http-util');
const util = require('../util/utils');
const controllerUtils = require('./controller-utils');
const path = require('path');
const mappings = require('./mappings');

module.exports = function(serverLocation) {
    return function(req, res) {
        httpUtil.setupIncoming(req, res, (req, response) => {
            var controller = controllerUtils.mapToController(req.url.path);
            controller = path.join(__dirname, '../controller', controller);
            var requireFunction = require;
            if (util.isTesting()) {
                requireFunction = util.requireUncached;
            }
            try {
                var Controller = requireFunction(controller);
                new Controller().run(req, response);
            } catch (e) {
                var Controller = require(path.join(__dirname, '../controller', mappings.errors[500]));
                new Controller().run(req, response, e);
            }
        });
    }
}
