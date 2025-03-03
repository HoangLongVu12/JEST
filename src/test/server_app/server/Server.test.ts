import { Server } from "../../../app/server_app/server/Server";
import { Authorizer } from "../../../app/server_app/auth/Authorizer";
import { ReservationsDataAccess } from "../../../app/server_app/data/ReservationsDataAccess";
import { LoginHandler } from "../../../app/server_app/handlers/LoginHandler";
import { RegisterHandler } from "../../../app/server_app/handlers/RegisterHandler";
import { ReservationsHandler } from "../../../app/server_app/handlers/ReservationsHandler";

jest.mock('../../../app/server_app/auth/Authorizer')
jest.mock('../../../app/server_app/data/ReservationsDataAccess')    
jest.mock('../../../app/server_app/auth/Authorizer')
jest.mock('../../../app/server_app/handlers/LoginHandler')
jest.mock('../../../app/server_app/handlers/RegisterHandler')
jest.mock('../../../app/server_app/handlers/ReservationsHandler')
const requestMock = {
    url: '',
    headers: {
        'user-agent': 'jest-test'
    }
}

const responseMock = {
    end: jest.fn(),
    writeHead: jest.fn()
}   

const serverMock = {
    listen: jest.fn(),
    close: jest.fn((callback) => callback())
}

jest.mock('http', ()=> ({
    createServer: (cb:Function) => {
        cb(requestMock, responseMock)
        return serverMock 
    }
}))

describe('Server test suite', ()=>{
    let sut: Server;

    beforeEach(()=>{
        sut = new Server();
    })  
    
    afterEach(()=>{
        jest.restoreAllMocks();
    })

    test('Server should be created', async ()=>{
        await sut.startServer();
    })

    test('It should start the server on the port 8080 and end the request', async()=>{
        await sut.startServer();

        expect(serverMock.listen).toHaveBeenCalledWith(8080);
        console.log('Checking responseMock.end calls:')
        expect(responseMock.end).toHaveBeenCalled();
    })

    test('should handle register requests', async ()=>{
        requestMock.url = 'localhost:8080/register';
        const handleRequestSpy = jest.spyOn(RegisterHandler.prototype, 'handleRequest');

        await sut.startServer();

        expect(handleRequestSpy).toHaveBeenCalledTimes(1);
        expect(RegisterHandler).toHaveBeenCalledWith(requestMock, responseMock, expect.any(Authorizer));
    });

    test('should handle login requests', async ()=>{
        requestMock.url = 'localhost:8080/login';
        const handleRequestSpy = jest.spyOn(LoginHandler.prototype, 'handleRequest');

        await sut.startServer();

        expect(handleRequestSpy).toHaveBeenCalledTimes(1);
        expect(LoginHandler).toHaveBeenCalledWith(requestMock, responseMock, expect.any(Authorizer));
    })

    test('should handle reservation requests', async ()=>{
        requestMock.url = 'localhost:8080/reservation';
        const handleRequestSpy = jest.spyOn(ReservationsHandler.prototype, 'handleRequest');

        await sut.startServer();

        expect(handleRequestSpy).toHaveBeenCalledTimes(1);
        expect(ReservationsHandler).toHaveBeenCalledWith(requestMock, responseMock, expect.any(Authorizer), expect.any(ReservationsDataAccess));
    })

    test('should do nothing for not supported routes', async ()=>{
        requestMock.url = 'localhost:8080/someRandomRoute';
        const validateTokenSpy = jest.spyOn(Authorizer.prototype, 'validateToken');
        
        await sut.startServer();

        expect(validateTokenSpy).not.toHaveBeenCalled();
    })

    test('should handle errors in serving requests', async ()=>{
        requestMock.url = 'localhost:8080/reservation';
        const handleRequestSpy = jest.spyOn(ReservationsHandler.prototype, 'handleRequest').mockImplementation(()=>{
            throw new Error('error')
        });

        await sut.startServer();

        expect(responseMock.writeHead).toHaveBeenCalledWith(500, JSON.stringify('Internal server error: error'));
    })

    test('should stop the server', async ()=>{
        await sut.startServer();
        await sut.stopServer();
    
        expect(serverMock.close).toHaveBeenCalledTimes(1);
    }, 10000);

    test('should reject an error when stopping the server', async ()=>{
        await sut.startServer();
        serverMock.close = jest.fn((callback) => callback(new Error('error')));

        await expect(sut.stopServer()).rejects.toThrow('error');
    })
})    