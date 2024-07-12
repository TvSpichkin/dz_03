import {Response} from "express";
import {PostInputModel, PostViewModel} from "../../../IOtypes/postsTypes";
import {ReqBody} from "../../../IOtypes/reqTypes";
import {postsRep} from "../postsRep";


export function createPostController(req: ReqBody<PostInputModel>, res: Response<PostViewModel>) {
    const newPost = postsRep.create(req.body); // Создание записи

    res.status(201).json(newPost); // Возврат созданной записи
}; // Контролёр, отвечающий за создание и возврат записи
