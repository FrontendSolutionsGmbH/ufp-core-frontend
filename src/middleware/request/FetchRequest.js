import {getJSON, validateStatus} from '../UfpMiddlewareHelperUtils'

const createAxiosLikeErrorResponse = async(config, code, response) => {
    var err = new Error('Request failed with status code ' + response.status)
    err.config = config
    if (code) {
        err.code = code
    }
    err.response = response
    err.response.data = await getJSON(response)
    return err
}

const FetchRequest = {

    ufpMiddlewareRequest: async(config) => {
        // console.log('ufpMiddlewareRequest', JSON.parse(JSON.stringify(config)))
        // console.log('ufpMiddlewareRequest', JSON.parse(JSON.stringify(config)))
        // console.log('ufpMiddlewareRequest', JSON.parse(JSON.stringify(config)))
        // console.log('ufpMiddlewareRequest', JSON.parse(JSON.stringify(config)))
        // console.log('ufpMiddlewareRequest', JSON.parse(JSON.stringify(config)))
        // console.log('ufpMiddlewareRequest', JSON.parse(JSON.stringify(config)))
        // console.log('ufpMiddlewareRequest', JSON.parse(JSON.stringify(config)))
        // console.log('ufpMiddlewareRequest', JSON.parse(JSON.stringify(config)))
        // console.log('ufpMiddlewareRequest', JSON.parse(JSON.stringify(config)))
        // console.log('ufpMiddlewareRequest', JSON.parse(JSON.stringify(config)))
        // console.log('ufpMiddlewareRequest', JSON.parse(JSON.stringify(config)))
        // console.log('ufpMiddlewareRequest', JSON.parse(JSON.stringify(config)))
        // console.log('ufpMiddlewareRequest', JSON.parse(JSON.stringify(config)))
        // console.log('ufpMiddlewareRequest', JSON.parse(JSON.stringify(config)))
        // console.log('ufpMiddlewareRequest', JSON.parse(JSON.stringify(config)))
        // console.log('ufpMiddlewareRequest', JSON.parse(JSON.stringify(config)))

        // console.log('ufpMiddlewareRequest', JSON.parse(JSON.stringify(config)))
        // console.log('ufpMiddlewareRequest', JSON.parse(JSON.stringify(config)))

        var requestResponse

        requestResponse = await fetch(config.fetchUrl, {
            method: config.method,
            body: config.data,
            credentials: config.credentials,
            headers: config.headers || {}
        })
        var isResolve = validateStatus(requestResponse.status)
        if (!isResolve) {
            // in case of error retrieve content this way
            const responseClone = requestResponse.clone()
            const result = await createAxiosLikeErrorResponse(config, responseClone.status, responseClone)
            return result
        }
        requestResponse.data = await getJSON(requestResponse)

        return requestResponse
    }

}

export default FetchRequest
