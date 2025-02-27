jest.mock('../../app/doubles/OtherUtils', ()=>({
    ...jest.requireActual('../../app/doubles/OtherUtils'),
    calculateComplexity: () => {return 10}
}))

jest.mock('uuid', ()=>({
    v4: () => {return '123'}
}))

import { calculateComplexity, toLowerCaseWithID } from '../../app/doubles/OtherUtils'
import { toUpperCase } from '../../app/Utils'

describe('Module test', () => {
    test('calculate complexcity', () => {
        const result = calculateComplexity({} as any);
        expect(result).toBe(10);
    })
    test('keep other functions', () => {
        const result = toUpperCase('abc');
        expect(result).toBe('ABC');
    })
    test('string with Id', () => {
        const result = toLowerCaseWithID('abc');
        expect(result).toBe('abc123');
    })
})