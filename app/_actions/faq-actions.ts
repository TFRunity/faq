'use server'

//Функции работы с вопросами-ответами
//НЕ ДОЛЖНО БЫТЬ НИЧЕГО СВЯЗАНО С ONION-ARCH

import {id} from "zod/locales";



import {getInjection} from "@/di/container";

export type Category = {
    id : number;
    title : string | null;
}
export type Question = {
    id : number;
    question : string | null;
    category_id : number | null;
    answer_id : number | null;
}
export type Answer = {
    id : number;
    answer : string | null;
    question_id : number;
}
export type QuestionWithAnswer = {
    question : Question;
    answer : Answer | null;
}
export type QuestionWithAnswers = {
    question : Question;
    answers : Answer[] | null;
}
export type CategoryWithQuestionsWithAnswer = {
    category : Category;
    questions : QuestionWithAnswer[] | null;
};

//МЕХАНИЗМ С БЕЗОПАСНОСТЬЮ, МНОГО ДУМАТЬ НАДО
let isLoggedIn : boolean = false;

export async function checkAdmin(name : string, password : string) : Promise<boolean> {
    if (name !== process.env.ADMIN_NAME && password !== process.env.ADMIN_PASSWORD) {
        return false
    }else{
       isLoggedIn = true;
    }
    return true
}

export async function getAllWithLatestAnswers() : Promise<CategoryWithQuestionsWithAnswer[]> {
    const getAllController = getInjection('ICategoryGetAllController')
    return await getAllController();
}
export async function addEmptyCategory() : Promise<CategoryWithQuestionsWithAnswer> {
    if (isLoggedIn) {
        const addEmptyCategoryController = getInjection('ICategoryAddEmptyController')
        return await addEmptyCategoryController();
    } else {
        return {category : {id : -1, title : "Не пытайся сломать"}, questions : []}
    }
}
export async function forceDeleteAnswer(id : number) : Promise<boolean> {
    const forceDeleteAnswerController = getInjection("IAnswerDeleteForceController")
    return await forceDeleteAnswerController(id)
}
export async function deleteCategory(id : number) : Promise<boolean> {
    const deleteCategoryController = getInjection('ICategoryDeleteController')
    return await deleteCategoryController(id)
}
export async function changeTitleCategory(category : Category) : Promise<boolean> {
    const changeTitleCategoryController = getInjection('ICategoryChangeTitleController')
    return await changeTitleCategoryController(category)
}
export async function getQuestionsWithoutCategory() : Promise<QuestionWithAnswer[]> {
    const getQuestionsController = getInjection('IQuestionGetAllWithoutCategoryController')
    return await getQuestionsController()
}
export async function updateQuestionOfQuestion(id : number, newQuestion : string) : Promise<QuestionWithAnswer> {
    const updateQuestionOfQuestionController = getInjection('IQuestionUpdateQuestionController')
    return await updateQuestionOfQuestionController(id, newQuestion)
}
export async function updateAnswerOfQuestion(id : number, newAnswer : string) : Promise<QuestionWithAnswer> {
    const updateAnswerOfQuestionController = getInjection('IQuestionAddAnswerController')
    return await updateAnswerOfQuestionController(id, newAnswer)
}
export async function addQuestion(question : string) : Promise<QuestionWithAnswer> {
    const addQuestionController = getInjection('IQuestionAddController')
    return await addQuestionController(question)
}
export async function addQuestionWithAnswer(question : string, answer : string) : Promise<QuestionWithAnswer> {
    const addQuestionWithAnswerController = getInjection('IQuestionAddWithAnswerController')
    return await addQuestionWithAnswerController(question, answer)
}
export async function deleteQuestion(id : number) : Promise<boolean> {
    const deleteQuestionController = getInjection('IQuestionDeleteController')
    return await deleteQuestionController(id)
}
export async function addRelationQuestionWithCategory(question_id : number, category_id : number) : Promise<boolean> {
    const addRelationQuestionWithCategoryController = getInjection('IQuestionAddRelWithCategoriesController')
    return await addRelationQuestionWithCategoryController(question_id, category_id)
}
export async function getQuestionAllAnswers (question_id : number) : Promise<QuestionWithAnswers> {
    const getQuestionWithAnswerController = getInjection('IQuestionGetWithHistoryOfAnswersController')
    return await getQuestionWithAnswerController(question_id)
}
export async function getCategoriesWithoutQuestions () : Promise<Category[]> {
    const getCategoriesWithoutQuestions = getInjection('ICategoryGetWithoutQuestionsController')
    return await getCategoriesWithoutQuestions()
}
