import {PostDbType} from "../../db/postsDbTypes";
import {db} from "../../db/db";
import {PostInputModel, PostViewModel} from "../../IOtypes/postsTypes";
import {blogsRep} from "../blogs/blogsRep";


export const postsRep = {
    getAll() {
        return db.posts.map(this.maper);
    }, // Извлечение всех записей
    find(id: string) {
        return db.posts.find(p => String(p.id) === id);
    }, // Извлечение записи по идентификатору
    findAndMap(id: string) {
        const post = this.find(id)!; //! Этот метод используется после проверки существования
        return this.maper(post);
    }, // Извлечение и конвертация записи
    create(post: PostInputModel) {
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
    del(id: string) {
        db.posts = db.posts.filter(p => p.id !== +id);
    }, // Удаление записи в БД
    put(post: PostInputModel, id: string) {
        const findPost: PostDbType = this.find(id)!; //! Этот метод используется после проверки существования

        findPost.title = post.title;
        findPost.shortDescription = post.shortDescription;
        findPost.content = post.content;
        findPost.blogId = +post.blogId;
    }, // Изменение записи в БД
    maper(post: PostDbType) {
        const postForOutput: PostViewModel = {
            id: String(post.id),
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: String(post.blogId),
            blogName: blogsRep.find(String(post.blogId))!.name //! Этот метод используется после проверки существования
        };

        return postForOutput;
    } // Конвертация записей из БД в модельный вид
}; // Работа с базой данных
