const utils = require('../util/utils');

describe('Argument parsing', () => {
    it('ignores words in front of the running javascript program', () => {
        var args = ['sudo', 'nice', 'node', 'main.js'];
        var argsParsed = utils.parseArgs(args);
        expect(argsParsed.asArray()).toEqual([]);
    });

    it('returns words after the running javascript program', () => {
        var args = ['node', 'main.js', '--no-https', '--port', '80'];
        var argsParsed = utils.parseArgs(args);
        expect(argsParsed.asArray()).toEqual(['--no-https', '--port', '80']);
    });

    it('ignores other files', () => {
        var args = ['node', 'compile.js', '-C', 'my_program.js'];
        var argsParsed = utils.parseArgs(args);
        expect(argsParsed.asArray()).toEqual(['-C', 'my_program.js']);
    });

    it('allows retrieving of an argsParsed\' argument', () => {
        var args = ['node', 'main.js', '--no-https', '--port', '80'];
        var argsParsed = utils.parseArgs(args);
        expect(argsParsed.getValue('port')).toEqual('80');
    });

    it('allows checking of whether an argument exists', () => {
        var args = ['node', 'main.js', '--no-https', '--port', '80'];
        var argsParsed = utils.parseArgs(args);
        expect(argsParsed.hasFlag('no-https')).toEqual(true);
        expect(argsParsed.hasFlag('no-signin-logging')).toEqual(false);
    });

    it('allows checking of whether an argument has a value', () => {
        var args = ['node', 'main.js', '--no-https', '--port', '80'];
        var argsParsed = utils.parseArgs(args);
        expect(argsParsed.hasValue('no-https')).toEqual(false);
        expect(argsParsed.hasValue('port')).toEqual(true);
    });
});

describe('Checking environment', () => {
    it('can detect testing environments', () => {
        delete process.env.NODE_ENV;
        expect(utils.isTesting()).toEqual(true);
    });

    it('can detect production environments', () => {
        process.env.NODE_ENV = 'PRODUCTION';
        expect(utils.isProduction()).toEqual(true);
    });


});
