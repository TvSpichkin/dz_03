import express, {Response} from "express";
import {setDB} from "../../db/db";


export const testRout = express.Router(); // Объявление маршрутизатора тестирования

testRout.delete('/all-data', (req, res: Response) => {
    setDB(); // Очистка базы данных для начала тестирования

    res.sendStatus(204); // Отправка успешного состояния «нет содержимого»
}); // Удаление всего содержимого БД
