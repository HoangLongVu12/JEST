import { getStringInfor, toUpperCase } from "../app/Utils";

describe('Utils test suite', () => {

    it('should return uppercase of valid string', () => {
        // arrange:
        const sut = toUpperCase;
        const expected = 'ABC'

        // act:
        const actual = sut('abc');

        // assert:
        expect(actual).toBe(expected);
    })

    describe.only('ToUpperCase examples', () => {
        it.each([
            { input: 'abc', expected: 'ABC' },
            { input: 'long', expected: 'LONG' },
            { input: 'deptrai', expected: 'DEPTRAI' },
        ])('$input toUpperCase should be $expected', ({ input, expected }) => {
            const actual = getStringInfor(input);
            expect(actual.upperCase).toBe(expected);
        })
    })

    describe('getStringInFor for arg My-String should', () => {
        test('return right lenght', () => {
            const actual = getStringInfor('My-String');
            expect(actual.characters).toHaveLength(9);
        });
        test('return right lower case', () => {
            const actual = getStringInfor('My-String');
            expect(actual.lowerCase).toBe('my-string');
        });
        test('return right uppercase', () => {
            const actual = getStringInfor('My-String');
            expect(actual.upperCase).toBe('MY-STRING');
        });
        test('return right characters', () => {
            const actual = getStringInfor('My-String');
            expect(actual.characters).toEqual((['M', 'y', '-', 'S', 't', 'r', 'i', 'n', 'g']));
            expect(actual.characters).toContain<string>('y');
            expect(actual.characters).toEqual(
                expect.arrayContaining(['M', 'y', '-', 'S', 't', 'r', 'i'])
            );
        });
        test('return defined extra infor', () => {
            const actual = getStringInfor('My-String');
            expect(actual.extraInfor).toBeDefined();
        });
        test('return right extra infor', () => {
            const actual = getStringInfor('My-String');
            expect(actual.extraInfor).toEqual({});
        });
    });
});