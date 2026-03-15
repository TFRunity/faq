import {IFaqRepository} from "@/src/application/repositories/IFaqRepository";
import {Faq} from "@/src/entities/models/faq";


export type IUpdateQuestionFaqController = ReturnType<typeof updateQuestionFaqController>;

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
export const updateQuestionFaqController =
    (
        faqService : IFaqRepository
    ) =>
        async (faq : Faq) : Promise<Faq> => {
            try{
                const _faq : Faq = await faqService.updateFaqQuestion(faq!.id, faq!.question!)
                return _faq
            }catch(e){
                throw new Error("Не удалось присоединиться к БД")
            }
        }