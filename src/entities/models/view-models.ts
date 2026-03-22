import { SelectCategory, SelectQuestion, SelectAnswer } from "@/drizzle/schema";
import {Question} from "@/src/entities/models/question";

//Когда хотим вывести вопрос со всеми предыдущими ответами, (АДМИН)
export interface QuestionWithAnswers {
    question: SelectQuestion,
    answers: SelectAnswer[] | null
}

//Когда хотим вывести весь список, (ПОЛЬЗОВАТЕЛЬ)
export interface CategoryWithQuestions {
    category: SelectCategory,
    questions: QuestionWithAnswers[] | null,
}

//Когда хотим обновить вопрос/ответ, (АДМИН)
export interface QuestionWithLatestAnswer {
    question: SelectQuestion,
    answer : SelectAnswer | null
}

export type rawCategoryWithQuestions = {
    id : number;
    title : string | null;
    questions : {
        id: number,
        question : string | null,
        category_id : number | null,
        answer_id : number | null,
        answers : {
            id: number,
            answer : string | null,
            question_id : number
        }[] | null;
    }[] | null;
};

export type rawQuestionWithAnswers = {
    id: number,
    question : string | null,
    category_id : number | null,
    answer_id : number | null,
    answers : {
        id: number,
        answer : string | null,
        question_id : number
    }[] | null;
};

//Не отличается от предыдущего, но здесь всегда должен возвращаться только 1 ответ при вызове функции
//(НЕ УДАЛЯТЬ КОММЕНТАРИЙ)
export type rawQuestionWithLatestAnswer = {
    id: number,
    question : string | null,
    category_id : number | null,
    answer_id : number | null,
    answers : {
        id: number,
        answer : string | null,
        question_id : number
    }[] | null;
};