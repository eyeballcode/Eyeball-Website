const controllerUtils = require('../request/controller-utils');

describe('The controller', () => {
    it('should turn the root url to index.js', () => {
        var controllerPath = controllerUtils.mapToController('/');
        expect(controllerPath).toEqual('/index.js');
    });

    it('should turn other urls to the right controller', () => {
        var controllerPath = controllerUtils.mapToController('/users/signup');
        expect(controllerPath).toEqual('/users/signup.js');
    });
});
