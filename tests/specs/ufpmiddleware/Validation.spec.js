import {isUFPAction, validateUFPAction, isValidUFPAction} from 'ufpmiddleware/Validation'
import UFPRequestActions from 'ufpmiddleware/UfpRequestActions'

describe('ufpmiddleware Validation', () => {
    describe('isUFPAction', () => {
        it('Should simple validate a UFPAction', () => {
            expect(isUFPAction).to.be.a("function")
            expect(isUFPAction({[UFPRequestActions.UFP_REQUEST_ACTION]:{}})).to.equal(true)
        })
    })
    describe('validateUFPAction', () => {
        it('Should validate a UFPAction', () => {
            expect(validateUFPAction).to.be.a("function")
            expect(validateUFPAction({[UFPRequestActions.UFP_REQUEST_ACTION]:{
                ufpDefinition:{
                    url:'api/Globals',
                    method: 'get'
                },
                ufpData:{},
                ufpPreHandler: [],
                ufpResultHandler: []
            }}).length).to.be.equal(0)
            expect(validateUFPAction({[UFPRequestActions.UFP_REQUEST_ACTION]:{
                ufpDefinition:{
                    url:'api/Globals',
                    method: 'get'
                },
                ufpPreHandler: [],
                ufpResultHandler: []
            }}).length).to.be.equal(1)
            expect(validateUFPAction({[UFPRequestActions.UFP_REQUEST_ACTION]:{
            }}).length).to.be.equal(1)
        })
    })
})