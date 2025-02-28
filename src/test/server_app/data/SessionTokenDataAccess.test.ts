import { DataBase } from "../../../app/server_app/data/DataBase";
import { SessionTokenDataAccess } from "../../../app/server_app/data/SessionTokenDataAccess";

const insertMock = jest.fn();   
const getByMock = jest.fn();
const updateMock = jest.fn();

jest.mock('../../../app/server_app/data/DataBase', () => {
  return {
    DataBase: jest.fn().mockImplementation(() => {
      return {
        insert: insertMock,
        getBy: getByMock,
        update: updateMock
      };
    })
  };
})

describe('UserCredentialsDataAccess test suite', () => {
    let sut: SessionTokenDataAccess;

    let someAccount = {
        id: '1234',
        userName: 'LongHinh',
        password: 'Vuhoanglong12'
    }

    let someSessionToken = {
        id: '1234',
        userName: 'LongHinh',
        valid: true,
        expirationDate: new Date(Date.now() + 60 * 60 * 1000)
    }

    

    beforeEach(() => {
        sut = new SessionTokenDataAccess()
    }); 

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('generateToken should call insert', async () => {
        insertMock.mockResolvedValue('1234');
        const tokenId = await sut.generateToken(someAccount);
        expect(insertMock).toHaveBeenCalledTimes(1);
        expect(insertMock).toHaveBeenCalledWith({
            id: '',
            userName: someAccount.userName,
            valid: true,
            expirationDate: expect.any(Date)
        });
        expect(tokenId).toBe('1234');
    })

    test('invalidateToken should call update', async () => {
        await sut.invalidateToken('1234');
        expect(updateMock).toHaveBeenCalledTimes(1);
        expect(updateMock).toHaveBeenCalledWith(
            '1234',
            'valid',
            false
        );
    })

    test('isValidToken should call getBy and return true if token is valid', async () => {
        getByMock.mockResolvedValue(someSessionToken);
        const result = await sut.isValidToken('1234');
        expect(getByMock).toHaveBeenCalledTimes(1);
        expect(getByMock).toHaveBeenCalledWith('id', '1234');
        expect(result).toBe(true);
    })

    test('isValidToken should return false if token is invalid', async () => {
        getByMock.mockResolvedValue(null);
        const result = await sut.isValidToken('1234');
        expect(getByMock).toHaveBeenCalledTimes(1);
        expect(getByMock).toHaveBeenCalledWith('id', '1234');
        expect(result).toBe(false);
    })
})    