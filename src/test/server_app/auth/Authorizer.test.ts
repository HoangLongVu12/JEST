import { SessionTokenDataAccess } from "../../../app/server_app/data/SessionTokenDataAccess";
import { UserCredentialsDataAccess } from "../../../app/server_app/data/UserCredentialsDataAccess";
import { ITokenValidator } from "../../../app/server_app/auth/ITokenValidator";
import { IUsersHandler } from "../../../app/server_app/auth/IUsersHandler";
import { Authorizer } from "../../../app/server_app/auth/Authorizer";

// mock for SessionTokenDataAccess
const isValidTokenMock = jest.fn();
const generateTokenMock = jest.fn();
const invalidateTokenMock = jest.fn();
jest.mock('../../../app/server_app/data/SessionTokenDataAccess', () => {
  return {
    SessionTokenDataAccess: jest.fn().mockImplementation(() => {
      return {
        isValidToken: isValidTokenMock,
        generateToken: generateTokenMock,
        invalidateToken: invalidateTokenMock
      };
    })
  };
})
// mock for UserCredentialsDataAccess
const addUserMock = jest.fn();
const getUserByUserNameMock = jest.fn();
jest.mock('../../../app/server_app/data/UserCredentialsDataAccess', () => { 
    return {
        UserCredentialsDataAccess: jest.fn().mockImplementation(() => {
        return {
            addUser: addUserMock,
            getUserByUserName: getUserByUserNameMock
        };
        })
    };
})

describe('Authorizer test suite', () => {
    let sut: Authorizer;

    const someId = '1234';
    
    const someUser = {
        id: '',
        userName: 'LongHinh',
        password: '1234'
    }

    beforeEach(() => {
        sut = new Authorizer();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('validateToken should call isValidToken', async () => {
        isValidTokenMock.mockResolvedValue(true);

        const result = await sut.validateToken(someId);

        expect(isValidTokenMock).toHaveBeenCalledWith(someId);
        expect(result).toBe(true);
    })

    test('registerUser should call addUser', async () => {
        addUserMock.mockResolvedValue(someId);

        const result = await sut.registerUser(someUser.userName, someUser.password);

        expect(addUserMock).toHaveBeenCalledWith(someUser);
        expect(result).toBe(someId);
    })

    test('login should call generateToken', async () => {
        getUserByUserNameMock.mockResolvedValue(someUser);
        generateTokenMock.mockResolvedValue(someId);

        const result = await sut.login(someUser.userName, someUser.password);

        expect(generateTokenMock).toHaveBeenCalledWith(someUser);
        expect(result).toBe(someId);
    })

    test('should logout', async () => {
        await sut.logout(someId);

        expect(invalidateTokenMock).toHaveBeenCalledWith(someId);
    })
})   
