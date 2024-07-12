export type PostDbType = {
    id: number, // Идентификатор
    title: string, // Название; максимальная длина: 30
    shortDescription: string, // Краткое описание; максимальная длина: 100
    content: string, // Содержание; максимальная длина: 1000
    blogId: number // Идентификатор существующего сетевого журнала
}; // Тип записи в БД
