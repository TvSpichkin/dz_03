import {PostDbType} from "../../db/postsDbTypes";
import {db} from "../../db/db";
import {PostInputModel, PostViewModel} from "../../IOtypes/postsTypes";
import {blogsRep} from "../blogs/blogsRep";


export const postsRep = {
    async getAll(): Promise<PostViewModel[]> {
        return Promise.all(db.posts.map(this.maper));
    }, // Извлечение всех записей
    async find(id: string): Promise<PostDbType | undefined> {
        return db.posts.find(p => String(p.id) === id);
    }, // Извлечение записи по идентификатору
    async findAndMap(id: string): Promise<PostViewModel> {
        const post = (await this.find(id))!; //! Этот метод используется после проверки существования
        return this.maper(post);
    }, // Извлечение и конвертация записи
    async create(post: PostInputModel): Promise<PostViewModel> {
        const newPost: PostDbType = {
            id: db.posts.length ? db.posts[db.posts.length - 1].id + 1 : 1,
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: +post.blogId
        };

        db.posts.push(newPost);

        return this.maper(newPost);
    }, // Запись записи в БД
    async del(id: string) {
        db.posts = db.posts.filter(p => p.id !== +id);
    }, // Удаление записи в БД
    async put(post: PostInputModel, id: string) {
        const findPost: PostDbType = (await this.find(id))!; //! Этот метод используется после проверки существования

        findPost.title = post.title;
        findPost.shortDescription = post.shortDescription;
        findPost.content = post.content;
        findPost.blogId = +post.blogId;
    }, // Изменение записи в БД
    async maper(post: PostDbType): Promise<PostViewModel> {
        const postForOutput: PostViewModel = {
            id: String(post.id),
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: String(post.blogId),
            blogName: (await blogsRep.find(String(post.blogId)))!.name //! Этот метод используется после проверки существования
        };

        return postForOutput;
    } // Конвертация записей из БД в модельный вид
}; // Работа с базой данных
