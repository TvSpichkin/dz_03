import {app} from "./app";
import {runDB} from "./db/mongoDb";
import {SET} from "./settings";


async function startApp() {
    await runDB();
    app.listen(SET.PORT, () => {
        console.log("Сервер доступен по адресу " + "МП" + " и случшает порт " + SET.PORT);
    });
}

startApp();
