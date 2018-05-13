import {isObject, isUndefined} from 'lodash-es'

function encode(val) {
    return encodeURIComponent(val)
        .replace(/%40/gi, '@')
        .replace(/%3A/gi, ':')
        .replace(/%24/g, '$')
        .replace(/%2C/gi, ',')
        .replace(/%20/g, '+')
        .replace(/%5B/gi, '[')
        .replace(/%5D/gi, ']')
}

/**
 * serialize queryParams like Axios
 *
 * @param {Object} val The value to test
 *
 */
function QueryParams(params) {
    throw new Error('query params is deprecated as part of ufp-core utils')
    var parts = []
    Object.keys(params)
        .map((k) => {
            var value = params[k]
            var key = k
            if (value === null || isUndefined(value)) {
                return
            }
            if (isArray(value)) {
                key = key + '[]'
            } else {
                value = [value]
            }
            value.map((v) => {
                if (isDate(v)) {
                    v = v.toISOString()
                } else if (isObject(v)) {
                    v = JSON.stringify(v)
                }
                parts.push(encode(key) + '=' + encode(v))
            })
        })
    return parts.join('&')
}

export default QueryParams
