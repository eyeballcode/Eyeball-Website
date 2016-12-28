const FakeRepository = require('../repo/FakeRepository');
const SessionModel = require('../models/SessionModel');

describe('The session spec', () => {
    it('Can lookup sessions', () => {
        var sessionRepo = new FakeRepository([
            {
                sessionID: 'hashbrowns',
                username: 'Eyeball',
                email: 'eyeball@eyeball.online'
            }, {
                sessionID: 'ryfndk',
                username: 'lol',
                email: 'a@b.com'
            }
        ]);

        var usersRepo = new FakeRepository([
            {
                username: 'Eyeball',
                email: 'eyeball@eyeball.online'
            }, {
                username: 'lol',
                email: 'a@b.com'
            }
        ]);

        var model = new SessionModel(usersRepo, sessionRepo);
        model.getSession('hashbrowns', (err, session) => {
            expect(session).not.toBe(null);
            expect(session.username).toBe('Eyeball');
        });

    });
});
