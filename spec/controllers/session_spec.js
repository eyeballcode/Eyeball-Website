const LogoutController = require('../../controller/users/LogoutController');
const dbMocker = require('./db-mocker');
const FakeRepository = require('../../repo/FakeRepository');
const FakeRequest = require('./FakeRequest');
const FakeResponse = require('./FakeResponse');
const OutgoingResponse = require('../../request/OutgoingResponse');

describe('The logout controller', () => {
    var database = {
        users: new FakeRepository([
            {
                username: 'Eyeball',
                email: 'eyeball@eyeball.online'
            }
        ]),
        sessions: new FakeRepository([
            {
                sessionID: 'test',
                username: 'Eyeball',
                email: 'eyeball@eyeball.online'
            }
        ])
    }

    it('logs out users if they are logged in', () => {
        dbMocker(database.users, database.sessions, done => {
            var req = new FakeRequest('POST', '/users/logout', {
                session: 'test'
            }, {}, {});
            var res = new OutgoingResponse(req, new FakeResponse(req, data => {
                expect(res.statusCode).toEqual(200);
                done();
            }));
            new LogoutController().run(req, res);
        });
    });

    it('prevents logouts if the user is not logged in', () => {
        dbMocker(database.users, database.sessions, done => {
            var req = new FakeRequest('POST', '/users/logout', {
                session: 'fake'
            }, {}, {});
            var res = new OutgoingResponse(req, new FakeResponse(req, data => {
                expect(res.statusCode).toEqual(400);
                done();
            }));
            new LogoutController().run(req, res);
        });
    });

});
