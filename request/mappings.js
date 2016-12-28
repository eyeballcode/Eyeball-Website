function matched(regex, string, path) {
    return !!regex.exec(string) ? path : null;
}

module.exports = {
    routes: {
        '/': 'IndexController.js',
        '/users/signup': 'users/UserSignupController.js',
        '/users/postsignup': 'users/PostActionController.js'
    }, errors: {
        404: 'errors/Error404Controller.js',
        500: 'errors/Error500Controller.js'
    }, regex: [
        path => matched(/\/static\/.*/, path, 'StaticController.js')
    ]
}
