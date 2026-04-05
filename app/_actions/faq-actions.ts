'use server'

//Функции работы с вопросами-ответами
//НЕ ДОЛЖНО БЫТЬ НИЧЕГО СВЯЗАНО С ONION-ARCH

// import { getInjection } from "@/di/container";
//
// export type InsertFaq = { question: string; answer: string };
// export type Faq = { id: number, question: string | null, answer: string | null };
//
// let isLoggedIn = false;
//
// export async function getFaqs() : Promise<Faq[]> {
//     const getFaqController = getInjection('IGetFaqController')
//     try {
//         const faqs : Faq[] = await getFaqController()
//         return faqs
//     }catch (error) {
//         throw new Error("Ошибка подключения к БД")
//     }
// }
//
//
// export async function createFaq( faqToInsert : InsertFaq ) : Promise<Faq> {
//     const addFaqController = getInjection('IAddFaqController')
//     try{
//         const faq : Faq = await addFaqController(faqToInsert)
//         return faq
//     }catch (error) {
//         throw new Error("Ошибка подключения к БД")
//     }
// }
//
// export async function updateAnswerFaq( faqToUpdate : Faq ) : Promise<Faq> {
//     const updateAnswerFaqController = getInjection('IUpdateAnswerFaqController')
//     try{
//         const faq : Faq = await updateAnswerFaqController(faqToUpdate)
//         return faq
//     }catch (error) {
//         throw new Error("Ошибка подключения к БД")
//     }
// }
//
// export async function updateQuestionFaq( faqToUpdate : Faq ) : Promise<Faq> {
//     const updateQuestionFaqController = getInjection('IUpdateQuestionFaqController')
//     try{
//         const faq : Faq = await updateQuestionFaqController(faqToUpdate)
//         return faq
//     }catch (error) {
//         throw new Error("Ошибка подключения к БД")
//     }
// }
//
//
// export async function deleteFaq( id : number ) : Promise<boolean> {
//     //const deleteFaqController = getInjection('IDeleteFaqController')
//     try{
//         // const result : boolean = await deleteFaqController(id)
//         // return result
//     }catch (error) {
//         throw new Error("Ошибка подключения к БД")
//     }
// }

export async function checkAdmin(name : string, password : string) : Promise<boolean> {
    if (name == process.env.ADMIN_NAME && password == process.env.ADMIN_PASSWORD) {
        isLoggedIn = true
        return true;
    }
    return false;
}

export async function isResponsible() : Promise<boolean> {
    return isLoggedIn;
}

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

export type CategoryWithQuestionsWithAnswer = {
    category : Category;
    questions : QuestionWithAnswer[] | null;
};

//МЕХАНИЗМ С БЕЗОПАСНОСТЬЮ, МНОГО ДУМАТЬ НАДО
let isLoggedIn : boolean = false;

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

