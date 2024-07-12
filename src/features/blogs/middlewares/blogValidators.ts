import {Request, Response, NextFunction} from "express";
import {body} from "express-validator";
import {blogsRep} from "../blogsRep";
import {adminMiddleware} from "../../../globalMiddlewares/adminMiddleware";
import {inputCheckErrorsMiddleware} from "../../../globalMiddlewares/inputCheckErrorsMiddleware";


const nameValidator = body("name").isString().withMessage('Имя не является строкой')
        .trim().isLength({min: 1, max: 15}).withMessage('Имя содержит больше 15 символов или является пустым'), // Проверка правильности входящего имени
    descriptionValidator = body("description").isString().withMessage('Описание не является строкой')
        .trim().isLength({min: 1, max: 500}).withMessage('Описание содержит больше 500 символов или является пустым'), // Проверка правильности входящего описания
    websiteUrlValidator = body("websiteUrl").isString().withMessage('ЕУР сетевого узла не является строкой')
        .trim().isLength({min: 1, max: 100}).withMessage('ЕУР сетевого узла содержит больше 100 символов или является пустым')
        .isURL({protocols: ["https"], allow_underscores: true}).withMessage('Строка не является единым указателем ресурсов'); // Проверка правильности входящего ЕУР сетевого узла

export function findBlogValidator(req: Request<{id: string}>, res: Response, next: NextFunction) {
    const findBlog = blogsRep.find(req.params.id); // Поиск сетевого журнала
    if(!findBlog) res.sendStatus(404); // Если не найдено, то возрат 404 статуса
    else next(); // Передача управления дальше
} // Проверка существования искомого сетевого журнала

export const blogValidators = [
    adminMiddleware,

    nameValidator,
    descriptionValidator,
    websiteUrlValidator,

    inputCheckErrorsMiddleware
]; // Набор проверок для создания и изменения сетевых журналов
