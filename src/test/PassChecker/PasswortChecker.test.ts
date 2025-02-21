import { PasswordChecker, PasswordErrors } from "../../app/PassChecker/PasswortChecker"

describe('Password Checker Test Suite', () => {
    let sut: PasswordChecker;

    beforeEach(() => {
        sut = new PasswordChecker();
    })

    it('Password shorter than 8 chareacters is invalid', () => {
        const actual = sut.checkPasswort('1234asD');
        expect(actual.valid).toBe(false);
        expect(actual.reasons).toContain(PasswordErrors.SHORT);
    })
    it('Password longer than 7 chareacters is valid', () => {
        const actual = sut.checkPasswort('1234asDF');
        expect(actual.reasons).not.toContain(PasswordErrors.SHORT);
    })
    it('Password with no upper character is invalid', () => {
        const actual = sut.checkPasswort('asdfghjk');
        expect(actual.valid).toBe(false);
        expect(actual.reasons).toContain(PasswordErrors.NO_UPPER_CASE);
    })
    it('Password with  at least one upper chareacter is valid', () => {
        const actual = sut.checkPasswort('1234asDf');
        expect(actual.reasons).not.toContain(PasswordErrors.NO_UPPER_CASE);
    })
    it('Password with no lower character is invalid', () => {
        const actual = sut.checkPasswort('AAAAAAAAADF');
        expect(actual.valid).toBe(false);
        expect(actual.reasons).toContain(PasswordErrors.NO_LOWER_CASE);
    })
    it('Password with  at least one lower chareacter is valid', () => {
        const actual = sut.checkPasswort('1234asDdddd');
        expect(actual.reasons).not.toContain(PasswordErrors.NO_LOWER_CASE);
    })
    it('complex password is valid', () => {
        const actual = sut.checkPasswort('1234asDdddd');
        expect(actual.reasons).toHaveLength(0);
        expect(actual.valid).toBe(true);
    })
    it('Adminpassword with no number is invalid', () => {
        const actual = sut.checkAdminPasswort('AsDfghhj');
        expect(actual.valid).toBe(false);
        expect(actual.reasons).toContain(PasswordErrors.NO_NUMBER);
    })
    it('Adminpassword with no number is invalid', () => {
        const actual = sut.checkAdminPasswort('1234Asdf');
        expect(actual.reasons).not.toContain(PasswordErrors.NO_LOWER_CASE);
    })
})