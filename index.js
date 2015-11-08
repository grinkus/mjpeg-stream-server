#!/usr/bin/env node

var app = require('express')();
var server = require('http').createServer(app);
var argv = require('minimist')(process.argv.slice(2), {
  alias: {
    'p': 'port',
    'h': 'host'
  },
  default: {
    'port': 80,
    'host': '0.0.0.0'
  }
});

process.stdin.resume();

var boundary = '--boundarydonotcross'; // boundary string

app.get('/', function (req, res) {
  res.setHeader(
    'Content-Type',
    'multipart/x-mixed-replace;boundary="' + boundary + '"'
  );
  res.setHeader('Connection', 'close');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Cache-Control', 'no-cache, private');
  res.setHeader('Expires', 0);
  res.setHeader('Max-Age', 0);

  process.stdin.pipe(res);
});

process.stdin.pipe(process.stdout);

server.listen(argv.port, argv.host);
