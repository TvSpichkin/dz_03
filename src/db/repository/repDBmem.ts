import {DBmem} from "../DBmem";
import {DBType, KeysDB, ValsDB, EntDbType, DbTypeFind, keyIds, EntPutType} from "../types/typesRepDB";


export const repBDmem = {
    async readAll(entKey: KeysDB): Promise<ValsDB> {
        return DBmem[entKey];
    }, // Извлечение всех сущностей
    async read(entKey: KeysDB, id: number): Promise<DbTypeFind> {
        // @ts-ignore: это выражение может быть вызвано
        return DBmem[entKey].find((e: EntDbType) => e.id === id);
    }, // Извлечение сущности по идентификатору
    async write(entKey: KeysDB, entity: EntDbType): Promise<number> {
        entity.id = DBmem[entKey].length ? DBmem[entKey][DBmem[entKey].length - 1].id + 1 : 1;
        // @ts-ignore: что-то с несоответствием типов
        DBmem[entKey].push(entity);

        return entity.id;
    }, // Запись сущности в БД
    async remove(entKey: KeysDB, keyId: keyIds, id: number) {
        // @ts-ignore: это выражение может быть вызвано
        DBmem[entKey] = DBmem[entKey].filter((e: EntDbType) => e[keyId] !== +id);
    }, // Удаление сущности в БД
    async edit(entKey: KeysDB, entity: EntPutType, id: number) {
        const findEnt: EntDbType = (await this.read(entKey, id))!, //! Этот метод используется после проверки существования
            editKeys = Object.keys(entity);

        // @ts-ignore: что-то с несоответствием типов
        for(let i = 0; i < editKeys.length; i++) findEnt[editKeys[i]] = entity[editKeys[i]];
    }, // Изменение сетевого журнала в БД
}; // Работа с базой данных

export async function setDBmem(dataset?: DBType) {
    if(!dataset) { // Если в функцию ничего не передано - то очищаем базу данных
        DBmem.blogs = []; // Отчистка массива сетевых журналов
        DBmem.posts = []; // Отчистка массива записей
    } else { // Если что-то передано - то заменяем старые значения новыми
        DBmem.blogs = dataset.blogs.map(b => ({...b})); // Перезапись массива сетевых журналов
        DBmem.posts = dataset.posts.map(p => ({...p})); // Перезапись массива записей
    }
} // Функция перезаписи БД
