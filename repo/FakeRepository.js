class MongoRepository {
    constructor(data) {
        this.data = data || [];
    }

    lookup(query, cb) {
        for (let object of this.data) {
            var passed = false;
            var hasFailed = false
            for (let key of Object.keys(query)) {
                if (object[key] && query[key] === object[key] && !hasFailed) {
                    passed = true;
                } else {
                    hasFailed = true;
                    passed = false;
                }
            }
            if (passed) {
                cb(null, object);
                return;
            }
        }
        cb(null, null);
    }

    lookupOne(query, cb) {
        this.lookup(query, cb);
    }

    insert(data, cb) {
        this.data.push(data);
        cb(null);
    }

}

module.exports = MongoRepository;
