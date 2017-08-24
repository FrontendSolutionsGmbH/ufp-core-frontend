import queryParams,{isArray, isDate, isObject} from 'ufpmiddleware/queryParams'

describe('ufpmiddleware queryParams utils::isX', () => {

    describe('isArray', () => {
        it('should validate Array', function () {
            expect(isArray([])).to.be.equal(true);
            expect(isArray({length: 5})).to.be.equal(false)
        });
    })
    describe('isObject', () => {
        it('should validate Object', function () {
            expect(isObject({})).to.be.equal(true)
            expect(isObject(null)).to.be.equal(false)
        });
    });
    describe('isDate', () => {
        it('should validate Date', function () {
            expect(isDate(new Date())).to.be.equal(true)
            expect(isDate(Date.now())).to.be.equal(false)
        });
    });


});
describe('ufpmiddleware queryParams', () => {
    it('Should serialize date', () => {
        var date = new Date()
        expect( queryParams({
            date: date
        })).to.be.equal('date=' + date.toISOString())
    })

    it('Should serialize object', () => {
            expect(queryParams({
                foo: {
                    bar: 'baz'
                }
            })).to.be.equal('foo=' + encodeURI('{"bar":"baz"}'))
    })
    it('Should serialize array', () => {
            expect(queryParams({
                foo: ['bar', 'baz']
            })).to.be.equal('foo[]=bar&foo[]=baz');

    })
    it('Should support special chars', () => {
        expect(queryParams({
            foo: '@:$, '
        })).to.be.equal('foo=@:$,+');
    })
    it('Should ignore undefined properties', () => {
        expect(queryParams({
            bar: 'baz',
            foo: undefined
        })).to.be.equal('bar=baz');
    })
})