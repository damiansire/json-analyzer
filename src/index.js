const loadJSONFile = require('./libs/load-json-file');
const { getByTag } = require('../src/libs/gets');

module.exports = {
    sum: function (a, b) {
        return a + b;
    },
    loadJSONFile,
    getByTag

}