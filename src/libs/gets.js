const { isSimpleObject, isArrayOrObject, isEmptyObject } = require("./type-verification")

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

const _internalFunctions = { _getTagRecursive }

module.exports = { getByTag };