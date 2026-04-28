import {SelectCategory, SelectQuestion, SelectAnswer, SelectGroup} from "@/drizzle/schema";


export interface CategoryWithQuestions {
    category : SelectCategory,
    questions : QuestionWithLatestAnswer[] | null
}


export interface QuestionWithLatestAnswer {
    question: SelectQuestion,
    answer : SelectAnswer | null
}


export interface QuestionWithAnswers {
    question : SelectQuestion,
    answers : SelectAnswer[] | null,
}


export interface GroupWithCategories {
    group : SelectGroup,
    categories : CategoryWithQuestions[] | null
}

export type rawCategoryWithQuestionWithAnswer = {
    categories : {
        id : number,
        title : string | null
        group_id : number | null,
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