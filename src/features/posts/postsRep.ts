import {PostDbPutType, PostDbType} from "../../db/postsDbTypes";
import {repBD} from "../../db/repDB";
import {PostInputModel, PostViewModel} from "../../IOtypes/postsTypes";

const entKey = "posts";

export const postsRep = {
    async getAll(): Promise<PostViewModel[]> {
        // @ts-ignore: что-то с несоответствием типов
        const posts: PostDbType[] = await repBD.readAll(entKey);

        return Promise.all(posts.map(this.maper));
    }, // Извлечение всех записей
    async find(id: string): Promise<PostDbType | undefined> {
        // @ts-ignore: что-то с несоответствием типов
        return repBD.read(entKey, +id);
    }, // Извлечение записи по идентификатору
    async findAndMap(id: string): Promise<PostViewModel> {
        const post = (await this.find(id))!; //! Этот метод используется после проверки существования
        return this.maper(post);
    }, // Извлечение и конвертация записи
    async create(post: PostInputModel): Promise<PostViewModel> {
        const newPost: PostDbType = {
            id: 0,
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: +post.blogId
        };

        newPost.id = await repBD.write(entKey, newPost);

        return this.maper(newPost);
    }, // Запись записи в БД
    async del(id: string) {
        await repBD.remove(entKey, "id", +id);
    }, // Удаление записи в БД
    async put(post: PostInputModel, id: string) {
        const putPost: PostDbPutType = {
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: +post.blogId
        };
        await repBD.edit(entKey, putPost, +id);
    }, // Изменение записи в БД
    async maper(post: PostDbType): Promise<PostViewModel> {
        const postForOutput: PostViewModel = {
            id: String(post.id),
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: String(post.blogId),
            // @ts-ignore: что-то с несоответствием типов
            blogName: (await repBD.read("blogs", post.blogId))!.name //! Этот метод используется после проверки существования
        };

        return postForOutput;
    } // Конвертация записей из БД в модельный вид
}; // Работа с базой данных
