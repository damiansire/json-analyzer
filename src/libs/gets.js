const { isSimpleObject, isArrayOrObject, isEmptyObject } = require("./type-verification")

/**
 * Recursively searches for objects with a specified tag within a JSON structure.
 *
 * @param {Object} searchableObject - The JSON object to search within.
 * @param {string} tag - The tag to search for.
 * @returns {Object | null} - An object containing the tag and its containers, or null if not found.
 */
function _getTagRecursive(searchableObject, tag) {
    const entries = Object.entries(searchableObject);

    const newObj = {};
    entries.forEach(([key, value]) => {
        if (key === tag) {
            newObj[key] = searchableObject[key];
        }
        else if (isSimpleObject(value)) {
            const deepSearch = _getTagRecursive(value, tag);
            if (deepSearch) {
                newObj[key] = deepSearch;
            }
        }
        else if (Array.isArray(value)) {
            const deepSearchArr = [];
            value.forEach(value => {
                const deepSearch = _getTagRecursive(value, tag);
                if (deepSearch) {
                    deepSearchArr.push(deepSearch);
                }
            })
            if (deepSearchArr.length) {
                newObj[key] = deepSearchArr
            }
        }
    })

    return isEmptyObject(newObj) ? null : newObj;
}

/**
 * Retrieves objects containing a specified tag within a JSON structure.
 *
 * @param {Object | Array} json - The JSON object or array to search within.
 * @param {string} tag - The tag to search for.
 * @returns {Array} - An array of objects containing the specified tag.
 */
function getByTag(json, tag) {
    isArrayOrObject(json);
    if (typeof json === 'object') {
        if (json[tag]) {
            debugger
            const result = _getTagRecursive(json, tag)
            if (result) {
                return [result];
            }
            else {
                return []
            }
        }
        else {
            return []
        }
    }
    else if (Array.isArray(json)) {
        for (element of json) {
            if (isArrayOrObject(element)) {

            }
        }
    }

}

module.exports = { getByTag };