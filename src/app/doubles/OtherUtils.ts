import { v4 as uuidv4 } from 'uuid';

export type stringInfor = {
    lowerCase: string,
    upperCase: string,
    characters: string[],
    length: number,
    extraInfor: Object | undefined
}

type LoggerServiceCallback = (arg: string) => void

export function calculateComplexity(stringInfor: stringInfor) {
    return Object.keys(stringInfor.extraInfor).length * stringInfor.length
}

export function toUpperCase(arg: string) {
    return arg.toUpperCase();
}           

export function toLowerCaseWithID(arg: string) {
    return arg.toLowerCase() + v4();
}   
export function toUpperCaseWithCb(arg: string, callback: LoggerServiceCallback) {
    if(!arg) {
        callback('Invalid argument');
        return;
    }
    callback(`called function with ${arg}`);
    return arg.toUpperCase();
}

export class OtherStringUtils {

    public callExternalService() {
        console.log('Calling external service');
    }
    
    public toUpperCase(arg: string) {
        return arg.toUpperCase();
    }
    public logString(arg: string) {
        return console.log(arg);
    }
}
function v4() {
    return uuidv4();
}
