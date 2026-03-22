import {Faq, FaqInsert} from "@/src/entities/models/view-models";
import {IFaqRepository} from "@/src/application/repositories/IFaqRepository";


export type IAddFaqController = ReturnType<typeof addFaqController>;

/**
 * @remarks
 * Убрали sentry => сильно меньше кода, но и меньше отслеживается
 *
 * @param faqService = зависимость из контейнера
 *
 * @returns
 * Новый Faq
 *
 */
export const addFaqController =
    (
        faqService : IFaqRepository
    ) =>
        async (faqToInsert : FaqInsert) : Promise<Faq> => {
            try{
                const faq : Faq = await faqService.createFaq(faqToInsert);
                return faq
            }catch(e){
                throw new Error("Не удалось присоединиться к БД")
            }
        }