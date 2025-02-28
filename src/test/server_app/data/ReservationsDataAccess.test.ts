import { DataBase } from "../../../app/server_app/data/DataBase";
import { ReservationsDataAccess } from "../../../app/server_app/data/ReservationsDataAccess";

const insertMock = jest.fn();
const getByMock = jest.fn();
const updateMock = jest.fn();
const deleteMock = jest.fn();
const getAllElementsMock = jest.fn();

jest.mock('../../../app/server_app/data/DataBase', () => {
  return {
    DataBase: jest.fn().mockImplementation(() => {
      return {
        insert: insertMock,
        getBy: getByMock,
        update: updateMock,
        delete: deleteMock,
        getAllElements: getAllElementsMock
      };
    })
  };
})

describe('UserCredentialsDataAccess test suite', () => {
    let sut: ReservationsDataAccess;
    
    const someReservation = {
        id: '',
        room: 'Naruto',
        user: 'LongHinh',
        startDate: '25-12-2000',
        endDate: '25-12-2025'
    }

    const someReservation2 = {
        id: '', 
        room: 'Sasuke',
        user: 'KhoaLinh',
        startDate: '25-12-2000',
        endDate: '25-12-2025'
    }

    const someId = '1234';

    beforeEach(() => {
        sut = new ReservationsDataAccess();
        //expect(DataBase).toHaveBeenCalledTimes(1);
    });

    test('createReservation should call insert', async () => {
        insertMock.mockResolvedValue(someId);
        const result = await sut.createReservation(someReservation);
        expect(insertMock).toHaveBeenCalledWith(someReservation);
        expect(result).toBe(someId);
    });
    test('updateReservation should call update', async () => {
      const field = 'room';
      const value = 'Sasuke';
      await sut.updateReservation(someId, field, value);
      expect(updateMock).toHaveBeenCalledWith(someId, field, value);
    })

    test('deleteReservation shuold call delete', async () => {
      await sut.deleteReservation(someId);
      expect(deleteMock).toHaveBeenCalledWith(someId);  
    })
    test('getReservation should call getBy', async () => {
        getByMock.mockResolvedValue(someReservation);
        const result = await sut.getReservation(someId);
        expect(getByMock).toHaveBeenCalledWith('id', someId);
        expect(result).toBe(someReservation); 
    })
    test('getAllReservations should call getAllElements', async () => {
        getAllElementsMock.mockResolvedValue([someReservation, someReservation2]);
        const result = await sut.getAllReservations();
        expect(getAllElementsMock).toHaveBeenCalled();
        expect(result).toEqual([someReservation, someReservation2]);
    })
});  