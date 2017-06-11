var fs = require('fs');

readJSONFile(filename, onRead){
    fs.readFile(filename, 'utf-8', onRead);
}
