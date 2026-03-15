import {IFaqRepository} from "@/src/application/repositories/IFaqRepository";


export type IDeleteFaqController = ReturnType<typeof deleteFaqController>;

/**
 * @remarks
 * Убрали sentry => сильно меньше кода, но и меньше отслеживается
 *
 * @param faqService = зависимость из контейнера
 *
 * @returns
 * Если не вернул ошибку - всё круто
 *
 */
export const deleteFaqController =
    (
        faqService : IFaqRepository
    ) =>
        async (id : number) : Promise<boolean> => {
            try{
                const res : boolean = await faqService.deleteFaq(id)
                return res
            }catch(e){
                throw new Error("Не удалось присоединиться к БД")
            }
        }