export interface IAnswerRepository {
    forceDelete(answer_id : number) : Promise<boolean>; //Должен удалить ответ, просто удаление из answers
}