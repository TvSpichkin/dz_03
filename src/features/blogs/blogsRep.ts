import {BlogDbType} from "../../db/blogsDbTypes";
import {db} from "../../db/db";
import {BlogInputModel, BlogViewModel} from "../../IOtypes/blogsTypes";


export const blogsRep = {
    getAll() {
        return db.blogs.map(this.maper);
    }, // Извлечение всех сетевых журналов
    find(id: string) {
        return db.blogs.find(b => String(b.id) === id);
    }, // Извлечение сетевого журнала по идентификатору
    findAndMap(id: string) {
        const blog = this.find(id)!; //! Этот метод используется после проверки существования
        return this.maper(blog);
    }, // Извлечение и конвертация сетевого журнала
    create(blog: BlogInputModel) {
        const newBlog: BlogDbType = {
            id: db.blogs.length ? db.blogs[db.blogs.length - 1].id + 1 : 1,
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl
        };

        db.blogs.push(newBlog);

        return this.maper(newBlog);
    }, // Запись сетевого журнала в БД
    del(id: string) {
        db.blogs = db.blogs.filter(b => b.id !== +id);
        db.posts = db.posts.filter(p => p.blogId !== +id);
    }, // Удаление сетевого журнала и всех его записей в БД
    put(blog: BlogInputModel, id: string) {
        const findBlog: BlogDbType = this.find(id)!; //! Этот метод используется после проверки существования

        findBlog.name = blog.name;
        findBlog.description = blog.description;
        findBlog.websiteUrl = blog.websiteUrl;
    }, // Изменение сетевого журнала в БД
    maper(blog: BlogDbType) {
        const blogForOutput: BlogViewModel = {
            id: String(blog.id),
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl
        };

        return blogForOutput;
    } // Конвертация сетевых журналов из БД в модельный вид
}; // Работа с базой данных
