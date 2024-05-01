// Create web server
// Load modules
var http = require('http');
var fs = require('fs');
var qs = require('querystring');
var url = require('url');
var path = require('path');
var comments = require('./comments.json');

// Create server
http.createServer(function (req, res) {

    // Parse request
    var urlParsed = url.parse(req.url, true);
    var pathname = urlParsed.pathname;
    var query = urlParsed.query;

    // Log request
    console.log(req.method, pathname, query);

    // Return comments
    if (pathname === '/comments.json') {
        if (req.method === 'GET') {
            res.end(JSON.stringify(comments));
        } else if (req.method === 'POST') {
            var data = '';
            req.on('data', function (chunk) {
                data += chunk;
            });
            req.on('end', function () {
                var comment = qs.parse(data);
                comments.push(comment);
                fs.writeFile('comments.json', JSON.stringify(comments, null, 4), function (err) {
                    if (err) {
                        res.end('Error');
                    } else {
                        res.end('Success');
                    }
                });
            });
        } else {
            res.statusCode = 405;
            res.end('Method Not Allowed');
        }
    } else {
        // Return file
        var filename = path.join(__dirname, pathname);
        fs.exists(filename, function (exists) {
            if (!exists) {
                res.statusCode = 404;
                res.end('Not Found');
                return;
            }
            fs.createReadStream(filename).pipe(res);
        });
    }
}).listen(3000, function () {
    console.log('Server running at http://localhost:3000/');
});