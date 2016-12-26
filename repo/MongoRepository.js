class MongoRepository {
    constructor(database, collection) {
        this.database = database.collection(collection);
    }

    lookup(query, cb) {
        this.database.find(query, cb);
    }

    lookupOne(query, cb) {
        this.database.find(query).next(cb);
    }

    insert(data, cb) {
        this.database.insert(data, cb);
    }

}

module.exports = MongoRepository;
