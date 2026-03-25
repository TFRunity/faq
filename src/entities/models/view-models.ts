import { SelectCategory, SelectQuestion, SelectAnswer } from "@/drizzle/schema";

//Когда хотим всю бд получить, (Пользователь)
export interface CategoryWithQuestions {
    category : SelectCategory,
    questions : QuestionWithLatestAnswer[] | null
}

//Когда хотим обновить вопрос/ответ, (АДМИН)
export interface QuestionWithLatestAnswer {
    question: SelectQuestion,
    answer : SelectAnswer | null
}

//Когда хотим просмотреть историю (АДМИН)
export interface QuestionWithAnswers {
    question : SelectQuestion,
    answers : SelectAnswer[] | null,
}

export type rawCategoryWithQuestionWithAnswer = {
    categories : {
        id : number,
        title : string | null
    }
    questions : {
        id : number,
        question: string | null,
        category_id: number | null,
        answer_id: number | null
    }
    answers : {
        id : number,
        answer : string | null,
        question_id : number
    }
};

export type rawQuestionWithAnswer = {
    questions : {
        id : number,
        question: string | null,
        category_id: number | null,
        answer_id: number | null
    }
    answers : {
        id : number,
        answer : string | null,
        question_id : number
    }
}