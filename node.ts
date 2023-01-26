import fs = require('fs');
import http = require('http');
import path = require('path');

const server = http
  .createServer((req, res) => {
    const id = setTimeout(() => {
      console.log('hello');
    }, 1000);
    fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
      res.writeHead(200);
      res.end(data);
    });
  })
  .listen(8080, () => {
    console.log('서버 시작됨');
  });

exports = server;
module.exports = server;
