function matched(regex, string, path) {
    return !!regex.exec(string) ? path : null;
}

module.exports = {
    routes: {
        '/': 'index.js',
        '/users/signup': 'users/signup.js',
        '/users/login': 'users/login.js'
    }, errors: {
        404: 'errors/404.js',
        500: 'errors/500.js'
    }, regex: [
        path => matched(/\/static\/.*/, path, 'static.js')
    ]
}
