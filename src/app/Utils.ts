
export function toUpperCase(arg: String) {
    return arg.toUpperCase();
}

export type stringInfor = {
    lowerCase: string,
    upperCase: string,
    characters: string[],
    length: number,
    extraInfor: Object | undefined
}

export function getStringInfor(arg: string): stringInfor {
    return {
        lowerCase: arg.toLowerCase(),
        upperCase: arg.toUpperCase(),
        characters: Array.from(arg),
        length: arg.length,
        extraInfor: {}
    }
}