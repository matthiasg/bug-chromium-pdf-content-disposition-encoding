'use strict';

var http = require('http');
var fs = require('fs');
var path = require('path');

var indexContent = fs.readFileSync('index.html');
var pdfContent = fs.readFileSync('pdf-sample.pdf');

http.createServer(function (req, res) {
  
  if(req.url.indexOf('pdf-sample.pdf') >= 0) {
    res.setHeader('Content-Type', 'application/pdf');

    // NOTE ü and other german umlaute are contained in ISO 8859-1. See http://en.wikipedia.org/wiki/ISO/IEC_8859-1
    res.setHeader('Content-Disposition', 'inline; filename="Test für UMLAUTE.pdf"');
    // res.setHeader('Content-Disposition', contentDisposition( 'Test für us.pdf', {type:'inline'} ));
    res.setHeader('Content-Length', pdfContent.length);
    res.setHeader('Connection', 'keep-alive');


    res.end(pdfContent);
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(indexContent);
  }
}).listen(9615);

console.log("INFO: Open http://localhost:9615")