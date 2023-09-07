function removeDuplicates(array) {
    const uniqueArray = [];
    const seenObjects = new Set();

    for (const item of array) {
        const stringifiedItem = JSON.stringify(item);

        if (!seenObjects.has(stringifiedItem)) {
            seenObjects.add(stringifiedItem);
            uniqueArray.push(item);
        }
    }

    return uniqueArray;
}

module.exports = { removeDuplicates } 