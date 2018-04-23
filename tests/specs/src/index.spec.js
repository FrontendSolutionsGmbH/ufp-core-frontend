import * as index from 'index'
import {UfpCore} from 'index'

describe('Ufp-Core lib index.js exists ', () => {
    it('Should Exist', () => {
        expect(index).to.exist
        // <v0.6 (deprecated with 0.7
        expect(index.UfpCore).to.exist
        // >v0.6
        expect(UfpCore).to.exist
    })

})
