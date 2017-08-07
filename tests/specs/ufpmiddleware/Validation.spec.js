import {isUFPAction, validateUFPAction, isValidUFPAction} from 'ufpmiddleware/Validation'
import UFPRequestActions from 'ufpmiddleware/UfpRequestActions'

describe('ufpmiddleware Validation', () => {
    describe('isUFPAction', () => {
        it('Should validate a UFPAction', () => {
            expect(isUFPAction).to.be.a("function")
            expect(isUFPAction({[UFPRequestActions.UFP_REQUEST_ACTION]:{}})).to.equal(true)
        })
    })
})