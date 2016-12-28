const OutgoingResponse = require('../../request/OutgoingResponse');

class FakeResponse {
    constructor (req, onEnd) {
        this.status = 200;
        this.headers = {};
        this.data = '';
        this.writeHead = (status, headers) => {
            this.status = status || 200;
            this.headers = headers || {};
        };
        this.send = data => {
            this.data += data.toString()
        }
        this.end = data => {
            if (data) {
                this.send(data);
            }
            onEnd(this.data.toString());
        };
        this.setHeader = (k, v) => {
            this.headers[k] = v;
        }
    }
}

module.exports = FakeResponse;
