import {req, getPost} from "./helpers/test-helpers";
import {setDB} from "../src/db/repository/repDB";
import {SET} from "../src/settings";
import {auth, bigStr, corrPost1, corrPost2, corrPost3, corrBlog1, corrBlog2} from "./helpers/datasets";
import {PostViewModel} from "../src/IOtypes/postsTypes";


describe("/posts", () => {
    var post1: PostViewModel, post2: PostViewModel, blogName1 = corrBlog1.name, blogName2 = corrBlog2.name;
    
    beforeAll(async () => {
        await setDB(); // Очистка базы данных перед началом тестирования
        await req.post(SET.PATH.BLOGS).set(auth).send(corrBlog1).expect(201); // Добавление в БД 1 сетевого журнала
        await req.post(SET.PATH.BLOGS).set(auth).send(corrBlog2).expect(201); // Добавление в БД 2 сетевого журнала
    });
    
    it("должен вернуть 200 и пустой массив", async () => {
        await getPost.expect(200, []);
    });


    it("должен вернуть 404 для несуществующей записи", async () => {
        await req.get(SET.PATH.POSTS + "/-1").expect(404);
    });

    it("не должен создать запись без авторизации и должен вернуть 401", async () => {
        await req.post(SET.PATH.POSTS).send(corrPost1).expect(401);
        await req.post(SET.PATH.POSTS).set({"Auth": "Basic cisaB"}).send(corrPost1).expect(401);
        await req.post(SET.PATH.POSTS).set({"Authorization": "Vazic cisaB"}).send(corrPost1).expect(401);
        await req.post(SET.PATH.POSTS).set({"Authorization": "Basic cisaB"}).send(corrPost1).expect(401);
        await getPost.expect(200, []);
    });

    it("не должен создать запись c неправильными входными данными", async () => {
        const post = corrPost1;

        await req.post(SET.PATH.POSTS).set(auth).expect(400);
        await getPost.expect(200, []);

        await req.post(SET.PATH.POSTS).set(auth).send().expect(400);
        await getPost.expect(200, []);

        await req.post(SET.PATH.POSTS).set(auth).send({название: 0}).expect(400);
        await getPost.expect(200, []);

        await req.post(SET.PATH.POSTS).set(auth).send({...post, title: undefined}).expect(400);
        await req.post(SET.PATH.POSTS).set(auth).send({...post, title: 0}).expect(400);
        await req.post(SET.PATH.POSTS).set(auth).send({...post, title: bigStr(31)}).expect(400);
        await req.post(SET.PATH.POSTS).set(auth).send({...post, title: "    "}).expect(400);
        await getPost.expect(200, []);

        await req.post(SET.PATH.POSTS).set(auth).send({...post, shortDescription: undefined}).expect(400);
        await req.post(SET.PATH.POSTS).set(auth).send({...post, shortDescription: 0}).expect(400);
        await req.post(SET.PATH.POSTS).set(auth).send({...post, shortDescription: bigStr(101)}).expect(400);
        await req.post(SET.PATH.POSTS).set(auth).send({...post, shortDescription: "    "}).expect(400);
        await getPost.expect(200, []);

        await req.post(SET.PATH.POSTS).set(auth).send({...post, content: undefined}).expect(400);
        await req.post(SET.PATH.POSTS).set(auth).send({...post, content: 0}).expect(400);
        await req.post(SET.PATH.POSTS).set(auth).send({...post, content: bigStr(1001)}).expect(400);
        await req.post(SET.PATH.POSTS).set(auth).send({...post, content: "    "}).expect(400);
        await getPost.expect(200, []);

        await req.post(SET.PATH.POSTS).set(auth).send({...post, blogId: undefined}).expect(400);
        await req.post(SET.PATH.POSTS).set(auth).send({...post, blogId: 0}).expect(400);
        await req.post(SET.PATH.POSTS).set(auth).send({...post, blogId: "-1"}).expect(400);
        await getPost.expect(200, []);
    });

    it("должен создать запись c правильными входными данными", async () => {
        post1 = (await req.post(SET.PATH.POSTS).set(auth).send(corrPost1).expect(201)).body;
        expect(post1).toEqual({
            id: "1",
            title: corrPost1.title,
            shortDescription: corrPost1.shortDescription,
            content: corrPost1.content,
            blogId: corrPost1.blogId,
            blogName: blogName1
        });

        post2 = (await req.post(SET.PATH.POSTS).set(auth).send(corrPost2).expect(201)).body;
        expect(post2).toEqual({
            id: "2",
            title: corrPost2.title,
            shortDescription: corrPost2.shortDescription,
            content: corrPost2.content,
            blogId: corrPost2.blogId,
            blogName: blogName1
        });

        await getPost.expect(200, [post1, post2]);
    });

    it("должен вернуть 200 и созданные записи", async () => {
        await req.get(SET.PATH.POSTS + "/1").expect(200, post1);
        await req.get(SET.PATH.POSTS + "/2").expect(200, post2);
    });

    it("не должен обновить запись без авторизации и должен вернуть 401", async () => {
        await req.put(SET.PATH.POSTS + "/1").send(corrPost2).expect(401);
        await req.put(SET.PATH.POSTS + "/1").set({"Auth": "Basic cisaB"}).send(corrPost2).expect(401);
        await req.put(SET.PATH.POSTS + "/1").set({"Authorization": "Vazic cisaB"}).send(corrPost2).expect(401);
        await req.put(SET.PATH.POSTS + "/1").set({"Authorization": "Basic cisaB"}).send(corrPost2).expect(401);
        await req.get(SET.PATH.POSTS + "/1").expect(200, post1);
    });

    it("не должен обновить записи c неправильными входными данными", async () => {
        const post = corrPost2;

        await req.put(SET.PATH.POSTS + "/1").set(auth).expect(400);
        await req.get(SET.PATH.POSTS + "/1").expect(200, post1);

        await req.put(SET.PATH.POSTS + "/1").set(auth).send().expect(400);
        await req.get(SET.PATH.POSTS + "/1").expect(200, post1);

        await req.put(SET.PATH.POSTS + "/1").set(auth).send({название: 0}).expect(400);
        await req.get(SET.PATH.POSTS + "/1").expect(200, post1);

        await req.put(SET.PATH.POSTS + "/1").set(auth).send({...post, title: undefined}).expect(400);
        await req.put(SET.PATH.POSTS + "/1").set(auth).send({...post, title: 0}).expect(400);
        await req.put(SET.PATH.POSTS + "/1").set(auth).send({...post, title: bigStr(31)}).expect(400);
        await req.put(SET.PATH.POSTS + "/1").set(auth).send({...post, title: "    "}).expect(400);
        await req.get(SET.PATH.POSTS + "/1").expect(200, post1);

        await req.put(SET.PATH.POSTS + "/1").set(auth).send({...post, shortDescription: undefined}).expect(400);
        await req.put(SET.PATH.POSTS + "/1").set(auth).send({...post, shortDescription: 0}).expect(400);
        await req.put(SET.PATH.POSTS + "/1").set(auth).send({...post, shortDescription: bigStr(101)}).expect(400);
        await req.put(SET.PATH.POSTS + "/1").set(auth).send({...post, shortDescription: "    "}).expect(400);
        await req.get(SET.PATH.POSTS + "/1").expect(200, post1);

        await req.put(SET.PATH.POSTS + "/1").set(auth).send({...post, content: undefined}).expect(400);
        await req.put(SET.PATH.POSTS + "/1").set(auth).send({...post, content: 0}).expect(400);
        await req.put(SET.PATH.POSTS + "/1").set(auth).send({...post, content: bigStr(1001)}).expect(400);
        await req.put(SET.PATH.POSTS + "/1").set(auth).send({...post, content: "    "}).expect(400);
        await req.get(SET.PATH.POSTS + "/1").expect(200, post1);

        await req.put(SET.PATH.POSTS + "/1").set(auth).send({...post, blogId: undefined}).expect(400);
        await req.put(SET.PATH.POSTS + "/1").set(auth).send({...post, blogId: 0}).expect(400);
        await req.put(SET.PATH.POSTS + "/1").set(auth).send({...post, blogId: "-1"}).expect(400);
        await req.get(SET.PATH.POSTS + "/1").expect(200, post1);
    });

    it("не должен обновить несуществующую запись", async () => {
        await req.put(SET.PATH.POSTS + "/-1").set(auth).send(corrPost2).expect(404);
    });

    it("должен обновить запись c правильными входными данными", async () => {
        const post = corrPost3;
        post1 = {...post1, ...post, blogName: blogName2};
        await req.put(SET.PATH.POSTS + "/1").set(auth).send(post).expect(204);
        await req.get(SET.PATH.POSTS + "/1").expect(200, post1);
        await req.get(SET.PATH.POSTS + "/2").expect(200, post2);
    });

    it("не должен удалить запись без авторизации и должен вернуть 401", async () => {
        await req.delete(SET.PATH.POSTS + "/1").expect(401);
        await req.delete(SET.PATH.POSTS + "/1").set({"Auth": "Basic cisaB"}).expect(401);
        await req.delete(SET.PATH.POSTS + "/1").set({"Authorization": "Vazic cisaB"}).expect(401);
        await req.delete(SET.PATH.POSTS + "/1").set({"Authorization": "Basic cisaB"}).expect(401);
        await req.get(SET.PATH.POSTS + "/1").expect(200, post1);
    });

    it("не должен удалить несуществующую запись", async () => {
        await req.delete(SET.PATH.POSTS + "/-1").set(auth).expect(404);
    });

    it("должен удалить существующую запись", async () => {
        await req.delete(SET.PATH.POSTS + "/2").set(auth).expect(204);

        await getPost.expect(200, [post1]);
    });

    it("должен удалить все существующие записи сетевого журнала при его удалении", async () => {
        await req.delete(SET.PATH.BLOGS + "/2").set(auth).expect(204);

        await getPost.expect(200, []);
    });
});
