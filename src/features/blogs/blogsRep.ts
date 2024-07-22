import {BlogDbType} from "../../db/blogsDbTypes";
import {db} from "../../db/db";
import {BlogInputModel, BlogViewModel} from "../../IOtypes/blogsTypes";


export const blogsRep = {
    async getAll(): Promise<BlogViewModel[]> {
        return Promise.all(db.blogs.map(this.maper));
    }, // Извлечение всех сетевых журналов
    async find(id: string): Promise<BlogDbType | undefined> {
        return db.blogs.find(b => String(b.id) === id);
    }, // Извлечение сетевого журнала по идентификатору
    async findAndMap(id: string): Promise<BlogViewModel> {
        const blog: BlogDbType = (await this.find(id))!; //! Этот метод используется после проверки существования
        return this.maper(blog);
    }, // Извлечение и конвертация сетевого журнала
    async create(blog: BlogInputModel): Promise<BlogViewModel> {
        const newBlog: BlogDbType = {
            id: db.blogs.length ? db.blogs[db.blogs.length - 1].id + 1 : 1,
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl
        };

        db.blogs.push(newBlog);

        return this.maper(newBlog);
    }, // Запись сетевого журнала в БД
    async del(id: string) {
        db.blogs = db.blogs.filter(b => b.id !== +id);
        db.posts = db.posts.filter(p => p.blogId !== +id);
    }, // Удаление сетевого журнала и всех его записей в БД
    async put(blog: BlogInputModel, id: string) {
        const findBlog: BlogDbType = (await this.find(id))!; //! Этот метод используется после проверки существования

        findBlog.name = blog.name;
        findBlog.description = blog.description;
        findBlog.websiteUrl = blog.websiteUrl;
    }, // Изменение сетевого журнала в БД
    async maper(blog: BlogDbType): Promise<BlogViewModel> {
        const blogForOutput: BlogViewModel = {
            id: String(blog.id),
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl
        };

        return blogForOutput;
    } // Конвертация сетевых журналов из БД в модельный вид
}; // Работа с базой данных
