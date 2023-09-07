const fs = require('fs');
async function loadJSONFile(filePath) {
    try {
        const data = await new Promise((resolve, reject) => {
            fs.readFile(filePath, 'utf8', (error, fileContents) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(fileContents);
                }
            });
        });
        return JSON.parse(data);
    } catch (error) {
        throw new Error(`Error loading the JSON file. ${error.message}`);
    }
}

module.exports = loadJSONFile;