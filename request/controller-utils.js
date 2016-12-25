const fs = require('fs');
const path = require('path');
const mappings = require('./mappings');

function mapToController(pathname) {
    pathname = path.join(path.parse(pathname).dir, path.parse(pathname).base);
    if (mappings.routes[pathname]) {
        return mappings.routes[pathname];
    } else {
        var found = mappings.regex.filter(matcher => {
            return !!matcher(pathname);
        });
        if (found.length === 1) {
            return found[0](pathname);
        } else {
            return mappings.errors[404];
        }
    }
}

module.exports = {mapToController};
