const UserModel = require('../models/UserModel');
const FakeRepository = require('../repo/FakeRepository');

describe('The User Model', () => {

    var dupeDatabase = new FakeRepository([
        {
            username: 'Eyeball',
            email: 'eyeball@eyeball.com',
            salt: 'hash',
            hash: 'browns'
        }
    ]);

    it('disallows signups for duplicate usernames', () => {
        var model = new UserModel(dupeDatabase, null);
        model.canUserSignup({
            username: 'Eyeball'
        }, (canSignup, reason) => {
            expect(canSignup).toBe(false);
        });
    });

    it('disallows signups for duplicate emails', () => {
        var model = new UserModel(dupeDatabase, null);
        model.canUserSignup({
            email: 'eyeball@eyeball.com'
        }, (canSignup, reason) => {
            expect(canSignup).toBe(false);
        });
    });

    it('Allows signups for non-existing accounts', () => {
        var model = new UserModel(dupeDatabase, null);
        model.canUserSignup({
            username: 'Basketball',
            email: 'sports@basket.com'
        }, (canSignup, reason) => {
            expect(canSignup).toBe(true);
        });
    });

    it('Gives a new sessionID on signups', () => {
        var sessionDatabase = new FakeRepository();
        var model = new UserModel(dupeDatabase, sessionDatabase);

        model.signup({
            username: 'Basketball',
            email: 'sports@basket.com',
            password: 'I Like Cats'
        }, sessionID => {
            sessionDatabase.lookupOne({
                sessionID: sessionID
            }, (err, session) => {
                expect(session).not.toBe(null);
                expect(session.username).toBe('Basketball');
            });
        });
    });

});
