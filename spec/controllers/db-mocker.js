module.exports = (users, sessions, cb) => {
    global.users = users;
    global.sessions = sessions;
    cb(() => {
        delete global.users;
        delete global.session;
    });
}
