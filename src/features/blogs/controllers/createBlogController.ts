import {Response} from "express";
import {BlogInputModel, BlogViewModel} from "../../../IOtypes/blogsTypes";
import {ReqBody} from "../../../IOtypes/reqTypes";
import {blogsRep} from "../blogsRep";


export function createBlogController(req: ReqBody<BlogInputModel>, res: Response<BlogViewModel>) {
    const newBlog = blogsRep.create(req.body); // Создание сетевого журнала

    res.status(201).json(newBlog); // Возврат созданного сетевого журнала
}; // Контролёр, отвечающий за создание и возврат сетевого журнала
