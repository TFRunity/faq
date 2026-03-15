import {Faq} from "@/src/entities/models/faq";
import {IFaqRepository} from "@/src/application/repositories/IFaqRepository";


export type IGetFaqController = ReturnType<typeof getFaqController>;

/**
 * @remarks
 * Убрали sentry => сильно меньше кода, но и меньше отслеживается
 *
 * @param faqService = зависимость из контейнера
 *
 * @returns
 * Все Faq
 *
 */
export const getFaqController =
    (
        faqService : IFaqRepository
    ) =>
    async () : Promise<Faq[]> => {
    try{
        const faqs : Faq[] = await faqService.getAllFaq()
        return faqs
    }catch(e){
        throw new Error("Не удалось присоединиться к БД")
    }
}