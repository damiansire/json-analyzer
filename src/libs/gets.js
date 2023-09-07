const { isSimpleObject, isArrayOrObject, isEmptyObject } = require("./type-verification")

function _getTagRecursiveInArray(value, tag) {
    const deepSearchArr = [];
    value.forEach(value => {
        const deepSearch = _getTagRecursive(value, tag);
        if (deepSearch) {
            deepSearchArr.push(deepSearch);
        }
    })
    return deepSearchArr;
}

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
            const deepSearchArr = _getTagRecursiveInArray(value, tag)
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
        const result = _getTagRecursive(json, tag)
        if (result) {
            return [result];
        }
    }
    else if (Array.isArray(json)) {
        return _getTagRecursiveInArray(json, tag)
    }
    return [];

}

function getType(element) {
    if (typeof element != "object") {
        return typeof element
    }
    else if (Array.isArray(element)) {
        return "array"
    }
    else if (element instanceof Date) {
        return "date"
    }
    else if (element === null) {
        return 'null';
    }
    return "object";
}

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

function getShape(obj) {
    const shape = {}
    const entries = Object.entries(obj);
    entries.forEach(([key, value]) => {
        const type = getType(value);
        if (type === "object") {
            shape[key] = getShape(value);
        }
        else if (type === "array") {
            const arrayTypes = value.map(getShape);
            const uniqueTypes = removeDuplicates(arrayTypes);
            shape[key] = uniqueTypes;
        }
        else {
            shape[key] = type;
        }
    })
    return shape
}

function getJSONShape(json) {
    if (isSimpleObject(json)) {
        return getShape(json)
    } else if (Array.isArray(json)) {
        const arrayTypes = json.map(getShape)
        const uniqueTypes = removeDuplicates(arrayTypes);
        return uniqueTypes;
    }
    throw new Error("format not considered")
}

module.exports = { getByTag, getJSONShape };