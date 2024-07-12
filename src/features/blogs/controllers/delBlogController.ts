import {Response} from "express";
import {BlogIdModel} from "../../../IOtypes/blogsTypes";
import {ReqParam} from "../../../IOtypes/reqTypes";
import {blogsRep} from "../blogsRep";


export function delBlogController(req: ReqParam<BlogIdModel>, res: Response) {
    blogsRep.del(req.params.id); // Удаление выбранного сетевого журнала
    res.sendStatus(204); // Отправка успешного состояния «нет содержимого»
}; // Контролёр, отвечающий за удаление выбранного сетевого журнала
