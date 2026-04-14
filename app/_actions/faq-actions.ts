'use server'

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
        const addEmptyCategoryController : () => Promise<CategoryWithQuestionsWithAnswer> = getInjection('ICategoryAddEmptyController')
        const c : CategoryWithQuestionsWithAnswer = await addEmptyCategoryController();
        const updateCacheController : () => Promise<boolean> = getInjection('ICategoryUpdateCacheController')
        const res : boolean = await updateCacheController();
        if (res) {
            return c
        }
        else {
            throw new Error("Не получилось сохранить в кэш, обновление появится позже")
        }
    }
    return {category : {id : -1, title : "Не пытайся сломать"}, questions : []}
}
export async function forceDeleteAnswer(id : number) : Promise<boolean> {
    if (isLoggedIn) {
        const forceDeleteAnswerController : (answer_id : number) => Promise<boolean> = getInjection("IAnswerDeleteForceController")
        const res : boolean =  await forceDeleteAnswerController(id)
        if (res) {
            return true
        }
        throw new Error("Не получилось удалить, ошибка БД")
    }
    return false;
}
export async function deleteCategory(id : number) : Promise<boolean> {
    if (isLoggedIn) {
        const deleteCategoryController : (category_id : number) => Promise<boolean> = getInjection('ICategoryDeleteController')
        const res : boolean = await deleteCategoryController(id)
        if (res) {
            const updateQuestionCacheController : () => Promise<boolean> = getInjection('IQuestionUpdateCacheController')
            const updateCategoryCacheController : () => Promise<boolean> = getInjection('ICategoryUpdateCacheController')
            await updateCategoryCacheController();
            await updateQuestionCacheController();
            return true
        }
        throw new Error("Не получилось удалить, ошибка БД")
    }
    return false
}
export async function changeTitleCategory(category : Category) : Promise<boolean> {
    if (isLoggedIn) {
        const changeTitleCategoryController : (category : Category) => Promise<boolean> = getInjection('ICategoryChangeTitleController')
        const res : boolean = await changeTitleCategoryController(category)
        if (res) {
            const updateCacheController : () => Promise<boolean> = getInjection('ICategoryUpdateCacheController')
            const res : boolean = await updateCacheController();
            if (res) {
                return true
            }
            throw new Error("Не получилось сохранить в кэш, обновление появится позже")
        }
        throw new Error("Не получилось удалить, ошибка БД")
    }
    return false;
}
export async function getQuestionsWithoutCategory() : Promise<QuestionWithAnswer[]> {
    const getQuestionsController : () => Promise<QuestionWithAnswer[]> = getInjection('IQuestionGetAllWithoutCategoryController')
    return await getQuestionsController()
}
export async function updateQuestionOfQuestion(id : number, newQuestion : string) : Promise<QuestionWithAnswer> {
    if (isLoggedIn) {
        const updateQuestionOfQuestionController : (question_id : number, question : string) => Promise<QuestionWithAnswer> = getInjection('IQuestionUpdateQuestionController')
        const question : QuestionWithAnswer = await updateQuestionOfQuestionController(id, newQuestion)
        const updateQuestionCacheController : () => Promise<boolean> = getInjection('IQuestionUpdateCacheController')
        const updateCategoryCacheController : () => Promise<boolean> = getInjection('ICategoryUpdateCacheController')
        await updateCategoryCacheController();
        await updateQuestionCacheController();
        return question
    }
    return {question : {question : 'Не трогай', id : -1, answer_id : null, category_id : null}, answer : null}
}
export async function updateAnswerOfQuestion(id : number, newAnswer : string) : Promise<QuestionWithAnswer> {
    if (isLoggedIn) {
        const updateAnswerOfQuestionController : (question_id : number, answer : string)  => Promise<QuestionWithAnswer> = getInjection('IQuestionAddAnswerController')
        const question : QuestionWithAnswer = await updateAnswerOfQuestionController(id, newAnswer)
        const updateQuestionCacheController : () => Promise<boolean> = getInjection('IQuestionUpdateCacheController')
        const updateCategoryCacheController : () => Promise<boolean> = getInjection('ICategoryUpdateCacheController')
        await updateCategoryCacheController();
        await updateQuestionCacheController();
        return question
    }
    return {question : {question : 'Не трогай', id : -1, answer_id : null, category_id : null}, answer : null}
}
export async function addQuestion(question : string) : Promise<QuestionWithAnswer> {
    if (isLoggedIn) {
        const addQuestionController : (question : string) => Promise<QuestionWithAnswer> = getInjection('IQuestionAddController')
        const _question : QuestionWithAnswer = await addQuestionController(question)
        const updateCacheController : () => Promise<boolean> = getInjection('IQuestionUpdateCacheController')
        const res : boolean = await updateCacheController();
        return _question
    }
    return {question : {question : 'Не трогай', id : -1, answer_id : null, category_id : null}, answer : null}
}
export async function addQuestionWithAnswer(question : string, answer : string) : Promise<QuestionWithAnswer> {
    if (isLoggedIn) {
        const addQuestionWithAnswerController = getInjection('IQuestionAddWithAnswerController')
        const _question : QuestionWithAnswer = await addQuestionWithAnswerController(question, answer)
        const updateCacheController : () => Promise<boolean> = getInjection('IQuestionUpdateCacheController')
        const res : boolean = await updateCacheController();
        return _question
    }
    return {question : {question : 'Не трогай', id : -1, answer_id : null, category_id : null}, answer : null}
}
export async function deleteQuestion(id : number) : Promise<boolean> {
    if (isLoggedIn) {
        const deleteQuestionController : (question_id : number) => Promise<boolean> = getInjection('IQuestionDeleteController')
        const result : boolean = await deleteQuestionController(id)
        const updateQuestionCacheController : () => Promise<boolean> = getInjection('IQuestionUpdateCacheController')
        const updateCategoryCacheController : () => Promise<boolean> = getInjection('ICategoryUpdateCacheController')
        await updateCategoryCacheController();
        await updateQuestionCacheController();
        return result
    }
    return false;
}
export async function addRelationQuestionWithCategory(question_id : number, category_id : number) : Promise<boolean> {
    if (isLoggedIn) {
        const addRelationQuestionWithCategoryController = getInjection('IQuestionAddRelWithCategoriesController')
        const result : boolean = await addRelationQuestionWithCategoryController(question_id, category_id)
        if (result) {
            const updateQuestionCacheController : () => Promise<boolean> = getInjection('IQuestionUpdateCacheController')
            const updateCategoryCacheController : () => Promise<boolean> = getInjection('ICategoryUpdateCacheController')
            await updateCategoryCacheController();
            await updateQuestionCacheController();
            return result;
        }
        return false;
    }
    return false;
}
export async function getQuestionAllAnswers (question_id : number) : Promise<QuestionWithAnswers> {
    const getQuestionWithAnswerController : (question_id : number) => Promise<QuestionWithAnswers> = getInjection('IQuestionGetWithHistoryOfAnswersController')
    return await getQuestionWithAnswerController(question_id)
}
export async function getCategoriesWithoutQuestions () : Promise<Category[]> {
    const getCategoriesWithoutQuestions : () => Promise<Category[]> = getInjection('ICategoryGetWithoutQuestionsController')
    return await getCategoriesWithoutQuestions()
}
