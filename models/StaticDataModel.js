const BaseModel = require('./BaseModel');
const path = require('path');
const fs = require('fs');

class StaticDataModel extends BaseModel {

    constructor(database) {
        super();
        this.database = database;
    }

    getFileData(req, cb) {
        fs.readFile(path.join(__dirname, '..', req.path.dir, req.path.name + req.path.ext), (err, data) => {
            cb(data);
        });
    }

    static getContentType(extension) {
        if (extension === 'js') {
            return 'text/javascript';
        } else if (extension === 'css') {
            return 'text/css';
        } else if (extension === 'png') {
            return 'image/png';
        } else if (extension === '') {
            return 'application/x-font-ttf';
        } else {
            return 'text/plain';
        }
    }
}

module.exports = StaticDataModel;
