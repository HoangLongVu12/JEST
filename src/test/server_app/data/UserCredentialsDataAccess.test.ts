import { DataBase } from "../../../app/server_app/data/DataBase";
import { UserCredentialsDataAccess } from "../../../app/server_app/data/UserCredentialsDataAccess";

const insertMock = jest.fn();
const getByMock = jest.fn();

jest.mock('../../../app/server_app/data/DataBase', () => {
  return {
    DataBase: jest.fn().mockImplementation(() => {
      return {
        insert: insertMock,
        getBy: getByMock,
      };
    })
  };
})

describe('UserCredentialsDataAccess test suite', () => {
    let sut: UserCredentialsDataAccess;
    
    const someAccount = {
        id: '',
        userName: 'someUserName',
        password: 'somePassword'
    }

    const someId = '1234';

    beforeEach(() => {
        sut = new UserCredentialsDataAccess();
        //expect(DataBase).toHaveBeenCalledTimes(1);
    });

    test('addUser should call insert', async () => {
        insertMock.mockResolvedValue(someId);
        const result = await sut.addUser(someAccount);
        expect(insertMock).toHaveBeenCalledWith(someAccount);
        expect(result).toBe(someId);
    });
    test('getUserById should call getBy', async () => { 
        getByMock.mockResolvedValue(someAccount);
        const result = await sut.getUserById(someId);
        expect(getByMock).toHaveBeenCalledWith('id', someId);
        expect(result).toBe(someAccount);
    })
    test('getUserByUserName should call getBy', async () => {
        getByMock.mockResolvedValue(someAccount);
        const result = await sut.getUserByUserName(someAccount.userName);
        expect(getByMock).toHaveBeenCalledWith('userName', someAccount.userName);
        expect(result).toBe(someAccount);
    })
})  