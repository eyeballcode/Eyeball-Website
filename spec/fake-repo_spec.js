const FakeRepository = require('../repo/FakeRepository');

describe('The Fake repository', () => {

    it('Can lookup items', () => {
        var db = new FakeRepository([
            {name: 'Eyeball', email: 'eyeball@eyeball.online'},
            {name: 'Soccer Ball', email: 'soccer@soccer.com'}
        ]);
        db.lookupOne({
            name: 'Eyeball'
        }, (err, user) => {
            expect(user).not.toBeNull();
        });
    });

    it('Can insert items', () => {
        var db = new FakeRepository();
        db.lookupOne({
            name: 'Ice Cream'
        }, (err, user) => {
            expect(user).toBeNull();
            db.insert({
                name: 'Ice Cream',
                email: 'ic@google.com'
            }, (err) => {
                db.lookupOne({
                    name: 'Ice Cream'
                }, (err, user) => {
                    expect(user).not.toBeNull();
                });
            });
        });
    });

});
