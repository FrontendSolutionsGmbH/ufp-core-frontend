import {InvalidUFPAction, InternalError, RequestError, ApiError, ResultParserError} from 'ufpmiddleware/Errors'

describe('(Modules) UfpMiddleware Errors', () => {

    it('Should export InvalidUFPAction', () => {
        expect(InvalidUFPAction).to.be.a('function')
        var ufpErr =new InvalidUFPAction('validationerrors')
        expect(ufpErr).be.an.instanceof(Error)
        expect(ufpErr).to.have.property('name', 'InvalidUFPAction')
        expect(ufpErr).to.have.property('message', 'Invalid UFPAction')
        expect(ufpErr).to.have.property('validationErrors', 'validationerrors')
    })
    it('Should export InternalError', () => {
        expect(InternalError).to.be.a('function')
        var intErr =new InternalError('test')
        expect(intErr).be.an.instanceof(Error)
        expect(intErr).to.have.property('name', 'InternalError')
        expect(intErr).to.have.property('message', 'test')
    })
    it('Should export RequestError', () => {
        expect(RequestError).to.be.a('function')
        var reqErr =new RequestError('test')
        expect(reqErr).be.an.instanceof(Error)
        expect(reqErr).to.have.property('name', 'RequestError')
        expect(reqErr).to.have.property('message', 'test')
    })
    it('Should export ApiError', () => {
        expect(ApiError).to.be.a('function')
        var apiErr =new ApiError(400, 'Bad Request', 'bla')
        expect(apiErr).be.an.instanceof(Error)
        expect(apiErr).to.have.property('name', 'ApiError')
        expect(apiErr).to.have.property('status', 400)
        expect(apiErr).to.have.property('statusText', 'Bad Request')
        expect(apiErr).to.have.property('response', 'bla')
        expect(apiErr).to.have.property('message', '400 - Bad Request')
    })
    it('Should export ResultParserError', () => {
        expect(ResultParserError).to.be.a('function')
        var parseErr =new ResultParserError('test')
        expect(parseErr).be.an.instanceof(Error)
        expect(parseErr).to.have.property('name', 'ResultParserError')
        expect(parseErr).to.have.property('message', 'test')
    })
})