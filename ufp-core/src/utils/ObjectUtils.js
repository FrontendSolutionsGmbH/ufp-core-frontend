export const flattenObject = (target, object, path = '') => {
    for (var i in object) {
        if (object.hasOwnProperty(i)) {
            if (object[i] !== undefined) {
                if (object[i] !== null) {
                    if (object[i] !== '') {
                        if (typeof object[i] === 'object') {
                            flattenObject(target, object[i], path === '' ? i : path + '.' + i)
                        } else if (Array.isArray(object[i])) {
                            // flatten array as comma separated list ?
                        } else {
                            if (Array.isArray(object)) {
                                target[path === '' ? '[' + i + ']' : path + '[' + i + ']'] = object[i]
                            } else {
                                target[path === '' ? i : path + '.' + i] = object[i]
                            }
                        }
                    }
                }
            }
        }
    }
    return target
}

export const buildUpdateObjectSetValue = (path, newValue) => {
    //console.log('buildUpdateObject 1 ', path, newValue)
    var elems = path.split('.')
    var current
    elems.reverse()
    //console.log('buildUpdateObject 2 ', elems, elems.length)
    for (var i = 0; i < elems.length; i++) {
        //console.log('buildUpdateObject checking value 3', i, elems[i])
        var item = elems[i]
        if (i === 0) {
            current = {
                [item]: {
                    $set: newValue
                }
            }
        } else {
            current = {
                [item]: current
            }
        }
    }

    //console.log('buildUpdateObject returning', current)
    return current
}

/**
 * checks of an object has at least one own property
 * @param obj
 * @returns {boolean}
 */
export const isObjectEmpty = (obj) => {
    if (obj) {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                return false
            }
        }
    }
    return true
}

export default{
    isObjectEmpty,
    flattenObject,
    buildUpdateObjectSetValue
}
