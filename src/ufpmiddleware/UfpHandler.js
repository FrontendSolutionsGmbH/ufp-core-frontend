import Util from './Util'
import PropTypes from 'prop-types'

const UFPHandlerPropTypeDefinition =
    PropTypes.shape({
        matcher: PropTypes.func.isRequired,
        handler: PropTypes.func.isRequired
    })

const UFPHandlerPropTypeDefinitionArray = {
    input: PropTypes.arrayOf(UFPHandlerPropTypeDefinition).isRequired
}
const UFPHandlerPropTypeDefinitionObject = {
    input: UFPHandlerPropTypeDefinition.isRequired
}

class UFPHandler {

    constructor(handler) {
        if (Util.PropTypesCheck({input: handler}, UFPHandlerPropTypeDefinitionArray)) {
            this.handlerArray = handler
        } else if (Util.ReactPropTypesCheck({input: handler}, UFPHandlerPropTypeDefinitionObject)) {
            this.handlerArray = [handler]
        } else {
            this.handlerArray = []
        }
    }

    registerHandler(handlerObj) {
        if (Util.PropTypesCheck({input: handlerObj}, UFPHandlerPropTypeDefinitionArray)) {
            this.handlerArray = this.handlerArray.concat(handlerObj)
        } else if (Util.PropTypesCheck({input: handlerObj}, UFPHandlerPropTypeDefinitionObject)) {
            this.handlerArray.push(handlerObj)
        }
    }

    handle(resultData) {
        var result = new Promise(async(resolve) => {
            var ufpErrorHandlerResultPromiseArray = []
            this.handlerArray.map((handlerObject) => {
                if (handlerObject.matcher(resultData)) {
                    ufpErrorHandlerResultPromiseArray.push(handlerObject.handler(resultData))
                }
            })
            var promiseAll = await Promise.all(ufpErrorHandlerResultPromiseArray)
            resolve(promiseAll)
        })
        return result
    }

    handleSuccessive(resultData) {
        // // console.log('handleSuccessive 2')
        var result = new Promise(async(resolve) => {
            // // console.log('handleSuccessive 2')
            if (this.handlerArray.length === 0) {
                // // console.log('handleSuccessive 3')
                resolve({
                    break: false,
                    handled: false
                })
            }
            else {
                var handled = false
                // // console.log('handleSuccessive 4')
                for (var i = 0; i < this.handlerArray.length; i++) {
                    var handlerObject = this.handlerArray[i]
                    if (!handled) {
                        // // console.log('handleSuccessive 5', handlerObject)
                        if (handlerObject.matcher(resultData)) {
                            var handlerRes = await handlerObject.handler(resultData)
                            // // console.log('handleSuccessive 6', handlerRes)
                            if (handlerRes.handled) {
                                // // console.log('handleSuccessive 7', handlerRes)
                                handled = true
                                resolve(handlerRes)
                            }
                        }
                    }
                }
                if (!handled) {
                    resolve({
                        break: false,
                        handled: false
                    })
                }
            }
        })
        return result
    }

    get() {
        return this.handlerArray
    }

}

export default UFPHandler
