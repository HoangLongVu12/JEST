import { Authorizer } from "../../../app/server_app/auth/Authorizer";
import { RegisterHandler } from "../../../app/server_app/handlers/RegisterHandler"
import { get, IncomingMessage, ServerResponse } from 'http'
import { HTTP_CODES, HTTP_METHODS } from "../../../app/server_app/model/ServerModel";
import * as Utils from "../../../app/server_app/utils/Utils";



describe('RegisterHandler test suite', () => {
    let sut: RegisterHandler;

    const request = {
        method: undefined
    }

    const responseMock = {
        statusCode: 0,
        writeHead: jest.fn(),
        write: jest.fn()
    }

    const authorizerMock = {
        registerUser: jest.fn()
    }

    const someAccount = {
        id: '1234',
        password: 'HoangLongVu',
        userName: 'LongHinh'
    }
    
    beforeEach(() => {
        sut = new RegisterHandler(
            request as any as IncomingMessage,
            responseMock as any as ServerResponse,
            authorizerMock as any as Authorizer
        )
    })

    afterEach(() => {
        jest.clearAllMocks();
    })

    test('should register valid accounts in requests', async () => {
        request.method = HTTP_METHODS.POST;
        jest.spyOn(Utils, 'getRequestBody').mockResolvedValueOnce(someAccount);
        authorizerMock.registerUser.mockResolvedValueOnce(someAccount.id);

        await sut.handleRequest();

        expect(responseMock.statusCode).toBe(HTTP_CODES.CREATED);
        expect(responseMock.writeHead).toHaveBeenCalledWith(
            HTTP_CODES.CREATED,
            { 'Content-Type': 'application/json' }
        );
        expect(responseMock.write).toHaveBeenCalledWith(JSON.stringify({ 
            userId: someAccount.id 
        }));
    })

    test('should return bad request when account is invalid', async () => {
        request.method = HTTP_METHODS.POST;
        jest.spyOn(Utils, 'getRequestBody').mockResolvedValueOnce({});

        await sut.handleRequest();

        expect(responseMock.statusCode).toBe(HTTP_CODES.BAD_REQUEST);
        expect(responseMock.writeHead).toHaveBeenCalledWith(
            HTTP_CODES.BAD_REQUEST,
            { 'Content-Type': 'application/json' }
        );
        expect(responseMock.write).toHaveBeenCalledWith(JSON.stringify('userName and password required'));
    })

    test('should return bad request when account is invalid', async () => {
        request.method = HTTP_METHODS.GET;

        await sut.handleRequest();

        expect(authorizerMock.registerUser).not.toHaveBeenCalled();
        expect(Utils.getRequestBody).not.toHaveBeenCalled();
        expect(responseMock.writeHead).not.toHaveBeenCalled();
        expect(responseMock.write).not.toHaveBeenCalled();
    })
})