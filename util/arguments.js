class Arguments {

    constructor(args) {
        this.args = args;
    }

    asArray() {
        return this.args;
    }

    getValue(name) {
        return this.args[this.args.indexOf('--' + name) + 1] || null;
    }

    hasValue(name) {
        return !((this.args[this.args.indexOf('--' + name) + 1] || '--').startsWith('--'));
    }

    hasFlag(name) {
        return this.args.indexOf('--' + name) !== -1;
    }

}

module.exports = Arguments;
