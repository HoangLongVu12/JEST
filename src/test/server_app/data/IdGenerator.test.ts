import { generateRandomId } from "../../../app/server_app/data/IdGenerator";

describe('test IdGenerator', () => {
    let sut: ReturnType<typeof generateRandomId>

    beforeEach(() => {
        sut = generateRandomId()
    })

    test('should return a string', () => {
        expect(typeof sut).toBe('string')
    })
    test('should return a string with length 20', () => {
        expect(sut.length).toBe(20)
    })
    test('should return a string with only hex characters', () => {
        expect(sut).toMatch(/^[0-9a-f]+$/)
    })
})