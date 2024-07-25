import {ValueOf} from "../methodsForTS";
import {BlogDbPutType, BlogDbType} from "./blogsDbTypes";
import {PostDbPutType, PostDbType} from "./postsDbTypes";
import {BlogInputModel} from "../IOtypes/blogsTypes";
import {PostInputModel} from "../IOtypes/postsTypes";


export type DBType = {
    blogs: BlogDbType[], // Массив сетевых журналов
    posts: PostDbType[] // Массив записей
}; // Типизация базы данных (что мы будем в ней хранить)

export type KeysDB = keyof DBType; // Ключи БД
export type ValsDB = ValueOf<DBType>; // Значения БД
export type EntDbType = BlogDbType | PostDbType; // Тип сущности в БД
export type DbTypeFind = EntDbType | undefined; // Тип извлечённой сущности по идентификатору из БД
export type keyIds = "id" | "blogId"; // Ключи идентификаторов от сущностей
export type EntPutType = BlogDbPutType | PostDbPutType; // Тип изменения сущности в БД
