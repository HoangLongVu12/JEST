import { Account } from "../../app/server_app/model/AuthModel";
import { HTTP_CODES, HTTP_METHODS } from "../../app/server_app/model/ServerModel";
import { Server } from "../../app/server_app/server/Server"
import { makeAwesomeRequest } from "./utils/http-clients";
import * as generated from "../../app/server_app/data/IdGenerator";
import { Reservation } from "../../app/server_app/model/ReservationModel";



describe('Server app integration tests', ()=>{

    let server: Server;

    beforeAll(()=>{
        server = new Server();
        server.startServer();
    });

    afterAll(async ()=>{
         await server.stopServer()
    })

    const someUser: Account = {
        id: '',
        userName: 'HoangLongVu',
        password: 'somePassword'
    }

    const someReservation = {
        id: '',
        endDate: '05-01-2026',
        startDate: '25-12-2025',
        room:'Naruto',
        user: 'LongHinh'
    }

    it('should register new user', async ()=>{
        const result = await fetch('http://localhost:8080/register', {
            method:HTTP_METHODS.POST,
            body: JSON.stringify(someUser)
        });
        const resultBody = await result.json();

        expect(result.status).toBe(HTTP_CODES.CREATED);
        expect(resultBody.userId).toBeDefined();
    });

    it('should register new user with awesomeRequest', async ()=>{
        const result = await makeAwesomeRequest({
            host: 'localhost',
            port: 8080,
            method: HTTP_METHODS.POST,
            path: '/register'
        }, someUser)

        expect(result.statusCode).toBe(HTTP_CODES.CREATED);
        expect(result.body.userId).toBeDefined();
    });

    let token: string;
    test('should login a registered user', async ()=>{
        const result = await fetch('http://localhost:8080/login', {
            method: HTTP_METHODS.POST,
            body: JSON.stringify(someUser)
        });
        const resultBody = await result.json();
        expect(result.status).toBe(HTTP_CODES.CREATED);
        expect(resultBody.token).toBeDefined();
        token = resultBody.token;
    });

    let createdReservationId: string;
    test('should create reservation if authorized', async () => {
        const result = await fetch('http://localhost:8080/reservation', {
            method: HTTP_METHODS.POST,
            body: JSON.stringify(someReservation),
            headers: {
                authorization: token
            }
        });

        const resultBody = await result.json();
        expect(result.status).toBe(HTTP_CODES.CREATED);
        expect(resultBody.reservationId).toBeDefined();
        createdReservationId = resultBody.reservationId;
    })

    test('should get resercation if authorized', async () => {
        const result = await fetch(`http://localhost:8080/reservation/${createdReservationId}`, {
            method: HTTP_METHODS.GET,
            headers: {
                authorization: token
            }
        });

        const resultBody = await result.json();

        const expectedReservation = structuredClone(someReservation);
        expectedReservation.id = createdReservationId;

        expect(result.status).toBe(HTTP_CODES.OK);
        expect(resultBody.id).toBe(createdReservationId);
    })
    
    test('should create and retrive multiple reservations if authorized', async ()=> {
        await fetch('http://localhost:8080/reservation', {
            method: HTTP_METHODS.POST,
            body: JSON.stringify(someReservation),
            headers: {
                authorization: token
            }
        });

        await fetch('http://localhost:8080/reservation', {
            method: HTTP_METHODS.POST,
            body: JSON.stringify(someReservation),
            headers: {
                authorization: token
            }
        });

        await fetch('http://localhost:8080/reservation', {
            method: HTTP_METHODS.POST,
            body: JSON.stringify(someReservation),
            headers: {
                authorization: token
            }
        });

        const getAllresult = await fetch('http://localhost:8080/reservation/all',{
            method: HTTP_METHODS.GET,
            headers: {
                authorization: token
            }
        })

        const getAllresultBody = await getAllresult.json();
        expect(getAllresult.status).toBe(HTTP_CODES.OK)
        expect(getAllresultBody).toHaveLength(4);

    })

    test('should update reservation if authorized', async () => {
        const updateResult = await fetch(`http://localhost:8080/reservation/${createdReservationId}`, {
            method: HTTP_METHODS.PUT,
            body: JSON.stringify({
                room: 'Sasuke' 
            }),
            headers: {
                authorization: token
            }
        });

        expect(updateResult.status).toBe(HTTP_CODES.OK);   
        
        const getResult = await fetch(`http://localhost:8080/reservation/${createdReservationId}`, {
            method: HTTP_METHODS.GET,
            headers: {
                authorization: token
            }
        });
         
        const getResultBody = await getResult.json();
        expect(getResultBody.room).toBe('Sasuke');
        expect(getResult.status).toBe(HTTP_CODES.OK);
    })

    test('should delete reservation if authorized', async () => {
        const deleteResult = await fetch('http://localhost:8080/reservation/${createdReservationId}', {
            method: HTTP_METHODS.DELETE,
            headers: {
                authorization: token
            }
        })
        
        expect(deleteResult.status).toBe(HTTP_CODES.OK);

        const getResult = await fetch('http://localhost:8080/reservation/${createdReservationId}', {
            method: HTTP_METHODS.GET,
            headers: {
                authorization: token
            }
        })

        expect(getResult.status).toBe(HTTP_CODES.NOT_fOUND);
    })

    test('snapshot demo',async () => {
        jest.spyOn(generated, 'generateRandomId').mockReturnValueOnce('1234');

        await fetch('http://localhost:8080/reservation', {
            method: HTTP_METHODS.POST,
            body: JSON.stringify(someReservation),
            headers: {
                authorization: token
            }
        });

        const getResult = await fetch('http://localhost:8080/reservation/1234',{
            method: HTTP_METHODS.GET,
            headers: {
                authorization: token
            }
        })

        const getRequestBody: Reservation = await getResult.json();

        expect(getRequestBody).toMatchSnapshot();


    })
})