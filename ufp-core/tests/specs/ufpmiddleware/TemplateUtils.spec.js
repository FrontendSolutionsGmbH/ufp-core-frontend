import TemplateUtils from 'ufpmiddleware/TemplateUtils'

describe('ufpmiddleware TemplateUtils', () => {
    it('Should be a object', () => {
        expect(TemplateUtils).to.be.a('object')
    })
    describe('urlParamsToUrl', () => {
        it('Should replace path variables', () => {
            expect(TemplateUtils.urlParamsToUrl).to.be.a('function')
            expect(TemplateUtils.urlParamsToUrl('/hello/:id', {id: 7})).to.be.equal('/hello/7')
        })
    })
    describe('urlToUrlParams', () => {
        it('Should get url params from url based on template url', () => {
            expect(TemplateUtils.urlToUrlParams).to.be.a('function')
            expect(TemplateUtils.urlToUrlParams('/hello/:id','/hello/7')).to.have.property('id', '7')
        })
    })
})