const BaseModel = require('./BaseModel');

class SessionsModel extends BaseModel {

    constructor(userDatabase, database) {
        super();
        this.database = database;
        this.users = userDatabase;
    }

    getSession(sessionID, callback) {
        this.database.lookupOne({sessionID}, (err, session) => {
            this.users.lookupOne({
                username: session.username,
                email: session.email
            }, callback);
        });
    }

}

module.exports = SessionsModel;
