'use server'

import {getInjection} from "@/di/container";
import {cookies} from "next/headers";
import {jwtVerify, SignJWT} from "jose";
import {ReadonlyRequestCookies} from "next/dist/server/web/spec-extension/adapters/request-cookies";

export type Group = {
    id : number;
    title : string | null;
    image_src : string | null;
}
export type Category = {
    id : number;
    title : string | null;
    group_id : number | null;
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
export type GroupWithCategories = {
    group : Group;
    categories : CategoryWithQuestionsWithAnswer[] | null;
}

export async function checkAdmin(name : string, password : string) : Promise<boolean> {
    if (name !== process.env.ADMIN_NAME && password !== process.env.ADMIN_PASSWORD) {
        return false
    }else{
        const cookieStore : ReadonlyRequestCookies = await cookies();
        const secret  = new TextEncoder().encode(process.env.ADMIN_SECRET);
        const token = await new SignJWT({sub: name, password: password})
            .setProtectedHeader({alg: 'HS256'})
            .setIssuedAt()
            .setExpirationTime('3h')
            .sign(secret)
        cookieStore.set('jwt',token)
        return true;
    }
}
export async function isAuthorized() : Promise<boolean> {
    const cookieStore : ReadonlyRequestCookies = await cookies();
    const jwt : string | undefined = cookieStore.get('jwt')?.value
    if (jwt === undefined) return false;
    const secret  = new TextEncoder().encode(process.env.ADMIN_SECRET);
    const a = await jwtVerify(jwt, secret)
    return a.payload.sub === process.env.ADMIN_NAME!;
}

export async function getAllGroups (): Promise<Group[]> {
    const getAllGroupsController : () => Promise<Group[]> = getInjection('IGroupCachedGetAllController')
    return await getAllGroupsController();
}

export async function getDefaultCategoryWithQuestionsWithLatestAnswers() : Promise<CategoryWithQuestionsWithAnswer[]> {
    const getDefaultGroupController : (group_id : number) => Promise<GroupWithCategories> = getInjection('IGroupCachedGetWithCategoriesController')
    const groupWithCategories : GroupWithCategories = await getDefaultGroupController(1)
    return groupWithCategories.categories ? groupWithCategories.categories : [];
}

export async function getCategoryWithQuestionsWithLatestAnswers(group_id : number) : Promise<CategoryWithQuestionsWithAnswer[]> {
    const getGroupWithCategoriesController : (group_id : number) => Promise<GroupWithCategories> = getInjection('IGroupCachedGetWithCategoriesController')
    const groupWithCategories : GroupWithCategories = await getGroupWithCategoriesController(group_id)
    return groupWithCategories.categories ? groupWithCategories.categories : [];
}

export async function addEmptyGroup() : Promise<Group> {
    const addEmptyGroupController = getInjection('IGroupAddController')
    const result : Group = await addEmptyGroupController("Факультет")
    const updateCacheController = getInjection('IGroupUpdateCacheController')
    const res : boolean = await updateCacheController();
    if (res && result){
        return result
    }
    else{
        return { id : -1, title : 'Не пытайся сломать', image_src : null}
    }
}

export async function deleteGroup(group_id: number) : Promise<boolean> {
    const deleteGroupController = getInjection('IGroupDeleteController')
    const result : boolean = await deleteGroupController(group_id)
    const updateCacheWithCategoriesController = getInjection('IGroupUpdateCacheWithCategoriesController')
    await updateCacheWithCategoriesController(group_id)
    //Подумать куда деваются все привязанные категории и вопросы, поставить foreign_key
    const updateCacheController = getInjection('IGroupUpdateCacheController')
    await updateCacheController()
    return result
}

export async function updateGroup(group : Group) : Promise<boolean> {
    const updateGroupController : (group : Group) => Promise<boolean> = getInjection('IGroupUpdateController')
    const result : boolean = await updateGroupController(group)
    const updateCacheWithCategoriesController = getInjection('IGroupUpdateCacheWithCategoriesController')
    await updateCacheWithCategoriesController(group.id)
    const updateCacheController = getInjection('IGroupUpdateCacheController')
    await updateCacheController()
    return result
}

export async function addEmptyCategory(group_id : number) : Promise<CategoryWithQuestionsWithAnswer> {
    if (await isAuthorized()) {
        const addEmptyCategoryController : (group_id : number) => Promise<CategoryWithQuestionsWithAnswer> = getInjection('ICategoryAddEmptyController')
        const c : CategoryWithQuestionsWithAnswer = await addEmptyCategoryController(group_id);
        const updateCacheController : (group_id : number) => Promise<boolean> = getInjection('IGroupUpdateCacheWithCategoriesController')
        const res : boolean = await updateCacheController(group_id);
        if (res) {
            return c
        }
        else {
            throw new Error("Не получилось сохранить в кэш, обновление появится позже")
        }
    }
    return {category : {id : -1, title : "Не пытайся сломать", group_id : null}, questions : []}
}
export async function forceDeleteAnswer(id : number) : Promise<boolean> {
    if (await isAuthorized()) {
        const forceDeleteAnswerController : (answer_id : number) => Promise<boolean> = getInjection("IAnswerDeleteForceController")
        const res : boolean =  await forceDeleteAnswerController(id)
        if (res) {
            return true
        }
        throw new Error("Не получилось удалить, ошибка БД")
    }
    return false;
}
export async function deleteCategory(id : number, group_id : number) : Promise<boolean> {
    if (await isAuthorized()) {
        const deleteCategoryController : (category_id : number) => Promise<boolean> = getInjection('ICategoryDeleteController')
        const res : boolean = await deleteCategoryController(id)
        if (res) {
            const updateQuestionCacheController : () => Promise<boolean> = getInjection('IQuestionUpdateCacheController')
            const updateGroupCacheController : (group_id : number) => Promise<boolean> = getInjection('IGroupUpdateCacheWithCategoriesController')
            await updateGroupCacheController(group_id);
            await updateQuestionCacheController();
            return true
        }
        throw new Error("Не получилось удалить, ошибка БД")
    }
    return false
}
export async function changeTitleCategory(category : Category) : Promise<boolean> {
    if (await isAuthorized()) {
        const changeTitleCategoryController : (category : Category) => Promise<boolean> = getInjection('ICategoryChangeTitleController')
        const res : boolean = await changeTitleCategoryController(category)
        if (res) {
            const updateCacheController : (group_id : number) => Promise<boolean> = getInjection('IGroupUpdateCacheWithCategoriesController')
            const res : boolean = await updateCacheController(category.group_id!);
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
export async function updateQuestionOfQuestion(id : number, newQuestion : string, group_id : number | null) : Promise<QuestionWithAnswer> {
    if (await isAuthorized()) {
        const updateQuestionOfQuestionController : (question_id : number, question : string) => Promise<QuestionWithAnswer> = getInjection('IQuestionUpdateQuestionController')
        const question : QuestionWithAnswer = await updateQuestionOfQuestionController(id, newQuestion)
        const updateQuestionCacheController : () => Promise<boolean> = getInjection('IQuestionUpdateCacheController')
        if (group_id) {
            const updateGroupCacheController : (group_id : number) => Promise<boolean> = getInjection('IGroupUpdateCacheWithCategoriesController')
            await updateGroupCacheController(group_id);
        }
        await updateQuestionCacheController();
        return question
    }
    return {question : {question : 'Не трогай', id : -1, answer_id : null, category_id : null}, answer : null}
}
export async function updateAnswerOfQuestion(id : number, newAnswer : string, group_id : number | null) : Promise<QuestionWithAnswer> {
    if (await isAuthorized()) {
        const updateAnswerOfQuestionController : (question_id : number, answer : string)  => Promise<QuestionWithAnswer> = getInjection('IQuestionAddAnswerController')
        const question : QuestionWithAnswer = await updateAnswerOfQuestionController(id, newAnswer)
        const updateQuestionCacheController : () => Promise<boolean> = getInjection('IQuestionUpdateCacheController')
        if (group_id) {
            const updateGroupCacheController : (group_id : number) => Promise<boolean> = getInjection('IGroupUpdateCacheWithCategoriesController')
            await updateGroupCacheController(group_id);
        }
        await updateQuestionCacheController();
        return question
    }
    return {question : {question : 'Не трогай', id : -1, answer_id : null, category_id : null}, answer : null}
}
export async function addQuestion(question : string) : Promise<QuestionWithAnswer> {
    if (await isAuthorized()) {
        const addQuestionController : (question : string) => Promise<QuestionWithAnswer> = getInjection('IQuestionAddController')
        const _question : QuestionWithAnswer = await addQuestionController(question)
        const updateCacheController : () => Promise<boolean> = getInjection('IQuestionUpdateCacheController')
        await updateCacheController();
        return _question
    }
    return {question : {question : 'Не трогай', id : -1, answer_id : null, category_id : null}, answer : null}
}
export async function addQuestionWithAnswer(question : string, answer : string) : Promise<QuestionWithAnswer> {
    if (await isAuthorized()) {
        const addQuestionWithAnswerController = getInjection('IQuestionAddWithAnswerController')
        const _question : QuestionWithAnswer = await addQuestionWithAnswerController(question, answer)
        const updateCacheController : () => Promise<boolean> = getInjection('IQuestionUpdateCacheController')
        await updateCacheController();
        return _question
    }
    return {question : {question : 'Не трогай', id : -1, answer_id : null, category_id : null}, answer : null}
}
export async function deleteQuestion(id : number, group_id : number | null) : Promise<boolean> {
    if (await isAuthorized()) {
        const deleteQuestionController : (question_id : number) => Promise<boolean> = getInjection('IQuestionDeleteController')
        const result : boolean = await deleteQuestionController(id)
        const updateQuestionCacheController : () => Promise<boolean> = getInjection('IQuestionUpdateCacheController')
        if (group_id) {
            const updateGroupCacheController : (group_id : number) => Promise<boolean> = getInjection('IGroupUpdateCacheWithCategoriesController')
            await updateGroupCacheController(group_id);
        }
        await updateQuestionCacheController();
        return result
    }
    return false;
}
export async function addRelationQuestionWithCategory(question_id : number, category_id : number, group_id : number) : Promise<boolean> {
    if (await isAuthorized()) {
        const addRelationQuestionWithCategoryController = getInjection('IQuestionAddRelWithCategoriesController')
        const result : boolean = await addRelationQuestionWithCategoryController(question_id, category_id)
        if (result) {
            const updateQuestionCacheController : () => Promise<boolean> = getInjection('IQuestionUpdateCacheController')
            const updateGroupCacheController : (group_id : number) => Promise<boolean> = getInjection('IGroupUpdateCacheWithCategoriesController')
            await updateGroupCacheController(group_id);
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
export async function getCategoriesWithoutQuestions (group_id : number) : Promise<Category[]> {
    const getCategoriesWithoutQuestions : (group_id : number) => Promise<Category[]> = getInjection('ICategoryGetWithoutQuestionsController')
    return await getCategoriesWithoutQuestions(group_id)
}
