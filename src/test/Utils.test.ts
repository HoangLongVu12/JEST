import { getStringInfor, toUpperCase, StringUtils } from "../app/Utils";

describe('Utils test suite', () => {
    describe('StringUtils tests', () => {

        let sut: StringUtils;

        beforeEach(() => {
            sut = new StringUtils();
            console.log('Setup');
        });

        it('Should return correct upperCase', () => {
            const actual = sut.toUpperCase('long');

            expect(actual).toBe('LONG');
            console.log('Actual test')
        });

        it('Should throw error on a invalid argument - function', () => {
            function expectError() {
                const actual = sut.toUpperCase('');
            }

            expect(expectError).toThrow();
            expect(expectError).toThrowError('Invalid argument');
        });

        it('Should throw error on a invalid argument - arrow function', () => {
            expect(() => {
                sut.toUpperCase('');
            }).toThrowError('Invalid argument');
        });

        it('Should throw error on a invalid argument - try catch block', (done) => {
            try {
                sut.toUpperCase('');
                done('GetStringInfor should throw error for invalid arg!')
            } catch (error) {
                expect(error).toBeInstanceOf(Error);
                expect(error).toHaveProperty('message', 'Invalid argument!');
                done();
            }
        });
    });


    describe('StringUtils tests', () => {

        let sut: StringUtils;

        beforeEach(() => {
            sut = new StringUtils();
            console.log('Setup');
        });

        afterEach(() => {
            //clear mocks
            console.log('Teardown')
        });

        it('Should return correct upperCase', () => {
            const actual = sut.toUpperCase('long');

            expect(actual).toBe('LONG');
            console.log('Actual test')
        });
    });

});