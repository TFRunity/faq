import {QuestionWithAnswers, QuestionWithLatestAnswer} from "@/src/entities/models/view-models";

export interface IQuestionRepository {
    add(question : string) : Promise<QuestionWithLatestAnswer>; //Добавление без ответа, просто question 1 запрос
    addWithAnswer(question : string, answer : string) : Promise<QuestionWithLatestAnswer>; //Добавление с ответом, 3 запроса: 1 - добавить question, 2 - добавить answer, 3 - обновить answer_id у question
    delete(question_id : number) : Promise<boolean>; //Удаление каскадное, оформляется в 1 запрос : 1 - Удалить вопрос, т.к. уже стоит ON DELETE = CASCADE, то удалятся и связанные answers
    updateQuestion(question_id : number, question : string) : Promise<QuestionWithLatestAnswer>; //Обновить вопрос 1 запрос
    //Связанное с ответами
    getWithHistoryOfAnswers(question_id : number) : Promise<QuestionWithAnswers>; //Получение плоских данных 1 запрос : Получить вопрос со всеми связанными answers, (через inner join)
    addAnswer(question_id : number, answer : string) : Promise<QuestionWithLatestAnswer>; //Добавить ответ, сменить answer_id 2 запроса
    changeAnswerToPrevious(question_id : number, previous_answer_id : number) : Promise<QuestionWithLatestAnswer> //Сменить answer_id 1 запрос
    //Связанное с категориями
    addRelWithCategories(question_id : number, category_id : number) : Promise<boolean>; //Изменить category_id
    deleteRelWithCategories(question_id : number, category_id : number) : Promise<boolean>; //Занулить category_id
}