const url = require('url');

class FakeRequest {
    constructor(method, path, cookies, body, headers) {
        this.method = method;
        this.url = url.parse(path);
        this.cookies = cookies;
        this.body = body;
        this.headers = headers;
    }

}

module.exports = FakeRequest;
