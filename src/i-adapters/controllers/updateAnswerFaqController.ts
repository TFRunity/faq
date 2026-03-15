import {IFaqRepository} from "@/src/application/repositories/IFaqRepository";
import {Faq} from "@/src/entities/models/faq";


export type IUpdateAnswerFaqController = ReturnType<typeof updateAnswerFaqController>;

/**
 * @remarks
 * Убрали sentry => сильно меньше кода, но и меньше отслеживается
 *
 * @param faqService = зависимость из контейнера
 *
 * @returns
 * Обновленный Faq
 *
 */
export const updateAnswerFaqController =
    (
        faqService : IFaqRepository
    ) =>
        async (faq : Faq) : Promise<Faq> => {
            try{
                const _faq : Faq = await faqService.updateFaqAnswer(faq!.id, faq!.answer!)
                return _faq
            }catch(e){
                throw new Error("Не удалось присоединиться к БД")
            }
        }