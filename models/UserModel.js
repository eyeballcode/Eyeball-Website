const BaseModel = require('./BaseModel');
const crypto = require('crypto');

class UserModel extends BaseModel {

    constructor(database, sessionDatabase) {
        super();
        this.database = database;
        this.sessionDatabase = sessionDatabase;
    }

    getSalt() {
        return crypto.randomBytes(32).toString('hex');
    }

    saltHash(password, salt, cb) {
        crypto.pbkdf2(password, salt, 10000, 1024, 'RSA-SHA512', function(err, hash) {
            cb(hash.toString('hex'));
        });
    }

    canUserSignup(body, callback) {
        if (body.username === '') callback(false, 'Please enter a username');
        else if (body.password === '') callback(false, 'Please enter a password');
        else if (body.email === '') callback(false, 'Please enter an email');
        else
            this.database.lookupOne({
                username: body.username
            }, (err, user) => {
                if (user) {
                    callback(false, 'Username already taken'); return;
                } else {
                    this.database.lookupOne({
                        email: body.email
                    }, (err, user) => {
                        if (user) {
                            callback(false, 'Email already taken'); return;
                        } else {
                            callback(true, null);
                        }
                    });
                }
            });
    }

    signup(body, callback) {
        var salt = this.getSalt();
        var sessionID = this.getSalt();
        this.saltHash(body.password, salt, hash => {
            var userData = {
                username: body.username,
                email: body.email,
                hash: hash,
                salt: salt
            };
            this.database.insert(userData, (err) => {
                this.sessionDatabase.insert({
                    sessionID: sessionID,
                    username: body.username,
                    email: body.email
                }, (err) => {
                    callback(sessionID);
                });
            });
        });
    }
}

module.exports = UserModel;
