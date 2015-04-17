'use strict';

var http = require('http');
var fs = require('fs');
var path = require('path');

var indexContent = fs.readFileSync('index.html');
var pdfContent = fs.readFileSync('pdf-sample.pdf');

http.createServer(function (req, res) {
  
  if(req.url.indexOf('pdf-sample.pdf') >= 0) {
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="Test f%Cr us.pdf"');
    res.setHeader('Content-Length', pdfContent.length);
    res.setHeader('Connection', 'keep-alive');


    res.end(pdfContent);
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(indexContent);
  }
}).listen(9615);

console.log("INFO: Open http://localhost:9615")