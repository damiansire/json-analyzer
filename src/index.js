const loadJSONFile = require('./libs/load-json-file');
const { getByTag, getJSONShape } = require('../src/libs/gets');

module.exports = {
    sum: function (a, b) {
        return a + b;
    },
    loadJSONFile,
    getByTag,
    getJSONShape
}