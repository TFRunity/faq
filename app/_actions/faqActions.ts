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
//
// export async function checkAdmin(name : string, password : string) : Promise<boolean> {
//     if (name == process.env.ADMIN_NAME && password == process.env.ADMIN_PASSWORD) {
//         isLoggedIn = true
//         return true;
//     }
//     return false;
// }
//
// export async function isResponsible() : Promise<boolean> {
//     return isLoggedIn;
// }
