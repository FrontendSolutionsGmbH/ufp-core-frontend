import {GetSearchObject} from 'modules/react-redux-hash-router4/util'

const key1 = 'url'
const key2 = 'test'
const value1 = 'test1234'
const value2 = 'test5678'

const testData = `?${key1}=${value1}&${key2}=${value2}`

describe('GetSearchObject tests ', () => {
    it('Should Exist', () => {
        expect(GetSearchObject).to.exist
    })

    it('Should return object from query string only', () => {

        expect(GetSearchObject(testData)[key1]).to.equal(value1)
        expect(GetSearchObject(testData)[key2]).to.equal(value2)
    })
    it('Should return empty from undefined ', () => {

        expect(GetSearchObject(undefined)).to.exist
    })

})
