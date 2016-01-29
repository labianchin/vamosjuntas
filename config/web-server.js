var express  = require('express');
var bodyParser = require('body-parser');
var fs  = require('fs');
var url = require('url');
var app = express();

app.use(bodyParser.json());

function sendJsonFileToResponse(fileName, res) {
  fs.readFile(fileName, function(error, data) {
    if (!error) {
      res.send(JSON.parse(data));
    } else {
      res.end();
    }
  });
}

function parseParams(reqUrl) {
  return url.parse(reqUrl, true).query;
}

function sendFile(fileName, res) {
  var options = {
    root: __dirname.substring(0, __dirname.indexOf('config')) + 'stubs/',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };

  var realFile = 'excelTestFile.xlsx';
  res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
  res.sendFile(realFile, options, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      console.log('Sent:', fileName);
    }
  });
}

app.use(express.static('.'));

var server = app.listen(3000, function() {});

app.get('/reports', function(req, res) {
  sendJsonFileToResponse('stubs/test.json', res);
});

app.post('/login', function(req, res){
  res.send(500);
})
