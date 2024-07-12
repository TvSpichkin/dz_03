import {Response} from "express";
import {BlogIdModel, BlogViewModel} from "../../../IOtypes/blogsTypes";
import {ReqParam} from "../../../IOtypes/reqTypes";
import {blogsRep} from "../blogsRep";


export function findBlogController(req: ReqParam<BlogIdModel>, res: Response<BlogViewModel>) {
    res.json(blogsRep.findAndMap(req.params.id)); // Получение искомого сетевого журнала
}; // Контролёр, отвечающий за выдачу искомого сетевого журнала
