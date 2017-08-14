import {get, set} from 'utils/DeepGetSet'

describe('utils DeepGetSet', () => {
    describe('get', () => {
        it('Should get a property by path from Object', () => {
            var obj ={
                h: {
                    a: 'test'
                }
            }
            expect(get(obj ,'h.a')).to.equal('test')
        })
        it('Should return default if peroperty undefined', () => {
            var obj ={
                h: {
                    a: 'test'
                }
            }
            expect(get(obj ,'h.b', 'test2')).to.equal('test2')
        })
    })
    describe('set', () => {
        it('Should set a property by path at Object', () => {
            var obj ={
                h: {
                    a: 'test'
                }
            }
            set(obj ,'h.a', 'test2')
            expect(obj.h.a).to.equal('test2')
        })
    })
})