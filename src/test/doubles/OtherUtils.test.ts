import { calculateComplexity, OtherStringUtils, toUpperCaseWithCb } from "../../app/doubles/OtherUtils"

describe.skip('OtherUtils test suite', () => {
    describe('OtherStringUtils tests with spies', () => {

        let sut: OtherStringUtils;

        beforeEach(()=>{
            sut = new OtherStringUtils();
        })

        it('use a spy to track calls', () => {
            const toUpperCaseSpy = jest.spyOn(sut, 'toUpperCase');
            sut.toUpperCase('abc');
            expect(toUpperCaseSpy).toHaveBeenCalledWith('abc');
        })

        it('use a spy to track calls to other module', () => {
            const toUpperCaseSpy = jest.spyOn(sut, 'logString');
            sut.logString('abc');
            expect(toUpperCaseSpy).toHaveBeenCalledWith('abc');
        })

        it('use a spy to replace the implementation of a method', () => {
            jest.spyOn(sut, 'callExternalService').mockImplementation(() => {
                console.log('mocked implementation');
            });
            sut.callExternalService();
        })
    })

    describe('Tracking callbacks with Jest mocks', () => {
        
        const callBackMock = jest.fn();

        afterEach(()=>{
            jest.clearAllMocks();
        })

        it('calls callback for invalid argument', () => {
            const actual = toUpperCaseWithCb('', callBackMock);
            expect(actual).toBeUndefined
            expect(callBackMock).toHaveBeenCalledWith('Invalid argument');
            expect(callBackMock).toHaveBeenCalledTimes(1)
        })

        it('calls callback for valid argument', () => {
            const actual = toUpperCaseWithCb('abc', callBackMock);
            expect(actual).toBe('ABC')
            expect(callBackMock).toHaveBeenCalledWith('called function with abc');
            expect(callBackMock).toHaveBeenCalledTimes(1)
        })
    })
    it('calculate Complexity', () => {
        const someInfo = {
            length: 5,
            extraInfor: {
                field1 : 'someInfo',
                filed2 :  'someExtrsInfo'
            }
        }

        const actual = calculateComplexity(someInfo as any);
        expect(actual).toBe(10);
    })

    it('ToUpperCase - calls callback for invalid argument', () => {
        const actual = toUpperCaseWithCb('', () => {});
        expect(actual).toBeUndefined();
    })
    it('ToUpperCase - calls callback for valid argument', () => {
        const actual = toUpperCaseWithCb('abc', () => {});
        expect(actual).toBe('ABC');
    })
})