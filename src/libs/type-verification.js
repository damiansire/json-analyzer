function isEmptyObject(obj) {
    return Object.keys(obj).length === 0;
}

function isSimpleObject(object) {
    return typeof object === 'object' && !(object instanceof Date) && !Array.isArray(object);
}


function isArrayOrObject(object) {
    if (typeof object != 'object') {
        throw new Error(`An object or array was expected, but received a ${typeof object}`);
    }
    else if (object instanceof Date) {
        throw new Error(`An object or array was expected, but received a Date`);
    }
    return true;
}

module.exports = { isSimpleObject, isArrayOrObject, isEmptyObject };