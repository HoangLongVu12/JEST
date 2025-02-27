import { DataBase } from "../../../app/server_app/data/DataBase";
import * as IdGenerator from "../../../app/server_app/data/IdGenerator";

type SomeTypeWithId = {
    id: string, 
    name: string,
    color: string
}

const object1 = {
    id: '',
    name: 'LongHinh',
    color: 'rot'
}

const object2 = {
    id: '',
    name: 'KhoaLinh',
    color: 'rot'
}

const object3 = {
    id: '',
    name: 'AnhTai',
    color: 'blue'
}


describe.skip('Database', () => {

    let sut: DataBase<SomeTypeWithId>;

    const fakeId = '1234';

    beforeEach(() => {
        sut = new DataBase<SomeTypeWithId>();
        jest.spyOn(IdGenerator, 'generateRandomId').mockReturnValue(fakeId);
    })

    it('insert should add an element to the database', async () => {
        const actual = await sut.insert(
            { id: '' } as any );
        expect(actual).toBe(fakeId); 
    })
    it('it should get an element after calling getBy method', async () => {
        const id = await sut.insert(object1);
        const expected = await sut.getBy('id', id);
        expect(expected).toBe(object1); 
    })
    it('it should get all elements with the same color', async () => {
        await sut.insert(object1);
        await sut.insert(object2);
        await sut.insert(object3);
        const expected = await sut.findAllBy('color', 'rot');
        expect(expected).toEqual([object1, object2]); 
    })
    it('it should update an element', async () => {
        const id = await sut.insert(object1);
        await sut.update(id, 'name', 'Long');
        const expected = await sut.getBy('id', id);
        expect(expected.name).toEqual('Long'); 
    })
    it('it should delete an element', async () => {
        const id = await sut.insert(object1);
        await sut.delete(id);
        const expected = await sut.getBy('id', id);
        expect(expected).toBeUndefined(); 
    })
    it('it should get all elements', async () => {
        await sut.insert(object1);
        await sut.insert(object2);
        await sut.insert(object3);
        const expected = await sut.getAllElements();
        expect(expected).toEqual([object1, object2, object3]); 
    })
})