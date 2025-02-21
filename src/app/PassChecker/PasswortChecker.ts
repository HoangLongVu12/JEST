export enum PasswordErrors {
    SHORT = 'Password is too short',
    NO_UPPER_CASE = 'Upper character required !!!!',
    NO_LOWER_CASE = 'Lower character required !!!!',
    NO_NUMBER = 'At least one number required !!!!'
}

export interface CheckResult {
    valid: boolean;
    reasons: PasswordErrors[];
}

export class PasswordChecker {
    
    public checkPasswort(password: string): CheckResult{
        const reasons: PasswordErrors[] = [];
        this.checkForLength(password, reasons);
        this.checkForUpperCase(password, reasons);
        this.checkForLowerCase(password, reasons);
        return {
            valid: reasons.length > 0 ? false : true,
            reasons: reasons
        };
        
    }

    public checkAdminPasswort(password: string): CheckResult{
        const basisCheck = this.checkPasswort(password);
        this.checkForNumber(password, basisCheck.reasons);
        return {
            valid: basisCheck.reasons.length > 0 ? false : true,
            reasons: basisCheck.reasons
        };
    }

    private checkForNumber(password: string, reasons: PasswordErrors[]) {
        const hasnumer = /\d/
        if(!hasnumer.test(password)) {
            reasons.push(PasswordErrors.NO_NUMBER);
        }
    }

    private checkForLength(password: string, reasons: PasswordErrors[]) {
        if(password.length < 8){
            reasons.push(PasswordErrors.SHORT);
        }
    }
    private checkForUpperCase(password: string, reasons: PasswordErrors[]) {
        if(password == password.toLocaleLowerCase()){
            reasons.push(PasswordErrors.NO_UPPER_CASE);
        } 
    }
    private checkForLowerCase(password: string, reasons: PasswordErrors[]) {
        if(password == password.toLocaleUpperCase()){
            reasons.push(PasswordErrors.NO_LOWER_CASE);
        }
    }
}
