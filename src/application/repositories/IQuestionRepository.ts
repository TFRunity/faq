import {QuestionWithAnswers, QuestionWithLatestAnswer} from "@/src/entities/models/view-models";

export interface IQuestionRepository {
    add(question : string) : Promise<QuestionWithLatestAnswer>; //Добавление без ответа
    addWithAnswer(question : string, answer : string) : Promise<QuestionWithLatestAnswer>;
    delete(question_id : number) : Promise<boolean>; //Обязательно удаление идет каскадное, с ответами
    updateQuestion(question_id : number, question : string) : Promise<QuestionWithLatestAnswer>;
    //Связанное с ответами
    getWithHistoryOfAnswers(question_id : number) : Promise<QuestionWithAnswers>;
    addAnswer(question_id : number, answer : string) : Promise<QuestionWithLatestAnswer>; //Переключает на новый ответ, сразу же
    changeAnswerToPrevious(question_id : number, previous_answer_id : number) : Promise<QuestionWithLatestAnswer> //Вызывается после того как вывелась вся история
    //Связанное с категориями
    addRelWithCategories(question_id : number, category_id : number) : Promise<boolean>;
    deleteRelWithCategories(question_id : number, category_id : number) : Promise<boolean>;
}