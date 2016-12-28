const BaseModel = require('./BaseModel');
const SessionModel = require('./SessionModel');
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
                new SessionModel(users, sessions).newSession(body, callback);
            });
        });
    }

    canUserLogin(body, callback) {
        this.database.lookupOne({
            $or: [
                {
                    username: body.username
                },
                {
                    email: body.username
                }
            ]
        }, (err, user) => {
            if (!user) {
                callback(false, 'Incorrect username or password');
                return;
            }
            this.saltHash(body.password, user.salt, hash => {
                if (hash === user.hash) {
                    callback(true, null);
                } else {
                    callback(false, 'Incorrect username or password');
                }
            })
        });
    }

    login(body, callback) {
        this.database.lookupOne({
            $or: [
                {
                    username: body.username
                },
                {
                    email: body.username
                }
            ]
        }, (err, user) => {
            new SessionModel(users, sessions).newSession(user, callback);
        });
    }
}

module.exports = UserModel;
