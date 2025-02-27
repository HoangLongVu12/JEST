import type { Config } from '@jest/types'

    const baseDir = '<rootDir>/src/app/doubles/**'
    const baseDirTest = '<rootDir>/src/test/doubles/**'

const config : Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true,
    collectCoverage: true,
    collectCoverageFrom: [
        `${baseDir}/**/*.ts`
    ],
    testMatch: [
        `${baseDirTest}/**/*.ts`
    ],
}
 export default config;