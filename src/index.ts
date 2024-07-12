import {app} from "./app";
import {SET} from "./settings";


app.listen(SET.PORT, () => {
    console.log("Сервер доступен по адресу " + "МП" + " и случшает порт " + SET.PORT);
});
