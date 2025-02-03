const httpServer = require('http');
const fileSystem = require('fs');
const dirPath = require('path');

const app = httpServer.createServer(function (req, res) {
    let filePath = '';

    if (req.url === '/') {
        filePath = dirPath.join(__dirname, 'public', 'index.html');
        serveFile(filePath, 'text/html', res);
    } else if (req.url === '/questions') {
        filePath = dirPath.join(__dirname, 'questions.json');
        serveFile(filePath, 'application/json', res);
    } else if (req.url === '/style.css') {
        filePath = dirPath.join(__dirname, 'public', 'style.css');
        serveFile(filePath, 'text/css', res);
    } else if (req.url === '/script.js') {
        filePath = dirPath.join(__dirname, 'public', 'script.js');
        serveFile(filePath, 'text/javascript', res);
    } else {
        res.writeHead(404);
        res.end('Oops! Page not found.');
    }
});

function serveFile(filePath, contentType, res) {
    fileSystem.readFile(filePath, function (error, data) {
        if (error) {
            console.log('Error loading file:', filePath);
            res.writeHead(500, { 'Content-Type': 'text/html' });
            res.end('<h2>Something went wrong!</h2>');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
}

app.listen(4000, function () {
    console.log('Server is running');
});