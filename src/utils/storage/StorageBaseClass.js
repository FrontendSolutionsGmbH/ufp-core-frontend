import {_Includes} from '../JSUtils'

class StorageBaseClass {

    constructor(storageKey) {
        this.storageKey = storageKey
    }

    setItem(key, value) {
        var obj = JSON.parse(window.localStorage.getItem(this.storageKey)) || {}
        obj[key] = value
        window.localStorage.setItem(this.storageKey, JSON.stringify(obj))
    }

    getItem(key, defaultVal) {
        var obj = JSON.parse(window.localStorage.getItem(this.storageKey)) || {}
        if (!obj[key]) {
            obj[key] = defaultVal
            window.localStorage.setItem(this.storageKey, JSON.stringify(obj))
        }
        return obj[key]
    }

    remove(key) {
        var obj = JSON.parse(window.localStorage.getItem(this.storageKey)) || {}
        if (obj[key]) {
            obj[key] = undefined
        }
        window.localStorage.setItem(this.storageKey, JSON.stringify(obj))
    }

    // removes all key they are not in keArray
    removeAllExcept(keyArray) {
        var obj = JSON.parse(window.localStorage.getItem(this.storageKey)) || {}
        for (var key in obj) {
            if (!_Includes(keyArray, key)) {
                if (obj[key]) {
                    obj[key] = undefined
                }
            }
        }
        window.localStorage.setItem(this.storageKey, JSON.stringify(obj))
    }

    clear() {
        window.localStorage.removeItem(this.storageKey)
    }

}

export default StorageBaseClass
