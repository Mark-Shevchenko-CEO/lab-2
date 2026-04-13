var http = require('http');

var urls = [process.argv[2], process.argv[3], process.argv[4]];
var results = ['', '', ''];
var completed = 0;

function get(url, index) {
  http.get(url, function(response) {
    response.setEncoding('utf8');

    response.on('data', function(data) {
      results[index] += data;
    });

    response.on('end', function() {
      completed++;
      if (completed === 3) {
        results.forEach(function(result) {
          console.log(result);
        });
      }
    });
  });
}

get(urls[0], 0);
get(urls[1], 1);
get(urls[2], 2);