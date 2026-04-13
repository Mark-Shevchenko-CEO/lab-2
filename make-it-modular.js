var mymodule = require('./mymodule');

var dir = process.argv[2];
var ext = process.argv[3];

mymodule(dir, ext, function(err, files) {
  if (err) {
    console.log('Произошла ошибка:', err);
    return;
  }

  files.forEach(function(file) {
    console.log(file);
  });
});