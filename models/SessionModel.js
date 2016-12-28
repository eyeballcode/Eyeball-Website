const BaseModel = require('./BaseModel');
const crypto = require('crypto');

class SessionsModel extends BaseModel {

    constructor(userDatabase, database) {
        super();
        this.database = database;
        this.users = userDatabase;
    }

    newSession(data, callback) {
        var sessionID = crypto.randomBytes(32).toString('hex');
        this.database.insert({
            sessionID: sessionID,
            username: data.username,
            email: data.email
        }, (err) => {
            callback(sessionID);
        });
    }

    getSession(sessionID, callback) {
        this.database.lookupOne({sessionID}, (err, session) => {
            if (!session) {
                callback(null, null);
                return;
            }
            this.users.lookupOne({
                username: session.username,
                email: session.email
            }, callback);
        });
    }

}

module.exports = SessionsModel;
