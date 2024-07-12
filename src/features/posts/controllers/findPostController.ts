import {Response} from "express";
import {PostIdModel, PostViewModel} from "../../../IOtypes/postsTypes";
import {ReqParam} from "../../../IOtypes/reqTypes";
import {postsRep} from "../postsRep";


export function findPostController(req: ReqParam<PostIdModel>, res: Response<PostViewModel>) {
    res.json(postsRep.findAndMap(req.params.id)); // Получение искомого записи
}; // Контролёр, отвечающий за выдачу искомого записи
