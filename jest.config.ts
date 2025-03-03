import type { Config } from '@jest/types'

    const baseDir = '<rootDir>/src/app/server_app/auth/**'
    const baseDirTest = '<rootDir>/src/test/server_app/auth/**'

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