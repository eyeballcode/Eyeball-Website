const BaseModel = require('./BaseModel');

class SessionsModel extends BaseModel {

    constructor(database) {
        super();
        this.database = database;
    }

    getSession(sessionID, callback) {
        this.database.lookupOne({sessionID}, callback);
    }

}

module.exports = SessionsModel;
