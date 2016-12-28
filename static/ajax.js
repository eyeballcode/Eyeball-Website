function parse(data, ...parsers) {
    for (let parser of parsers)
    try {
        return parser(data);
    } catch (e) {
    }
    return data;
}

function ajax(options) {
    var request = new XMLHttpRequest();
    var promise = new Promise((resolve, reject) => {
        request.onreadystatechange = () => {
            var data;
            if (request.response) {
                if (request.responseType === "text") {
                    data = request.responseText;
                } else if (request.responseType === "document") {
                    data = request.responseXML;
                } else {
                    data = parse(request.response, JSON.parse);
                }
            }
            if (request.readyState == XMLHttpRequest.DONE) {
                if (request.status === 200)
                resolve(data);
                else
                reject(data);
            } else if (request.readyState == XMLHttpRequest.UNSENT) {
                reject();
            }
        }
    });
    request.open(options.method || 'GET', options.url);
    if (options.method === 'GET')
    request.send();
    else request.send(JSON.stringify(options.form || {}));
    return promise;
}
