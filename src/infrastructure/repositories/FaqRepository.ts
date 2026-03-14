import {IFaqRepostiory} from "@/src/application/repositories/IFaqRepostiory";
import { Faq, FaqInsert } from "@/src/entities/models/faq";
import { db } from "@/drizzle/index"
import {dbFaq, dbFaqToInsert, faqs} from "@/drizzle/schema";
import { eq } from 'drizzle-orm'

export class FaqRepository implements IFaqRepostiory {
    constructor() {
    }

    /**
     *
     * @remarks
     * Этот метод используется для получения всех faq
     *
     * @returns
     * dbFaq[]
     *
     */
    async getAllFaq(): Promise<dbFaq[]> {
        try{
            const connection = db!;
            const all : dbFaq[] = await connection.select().from(faqs)
            return all
        }
        catch(error){
            throw error;
        }
    }


    /**
     *
     * @remarks
     * Этот метод используется для создания faq
     *
     * @param faqToInsert = { question : string, answer: string }
     *
     * @returns
     * Возвращает новый faq
     *
     */
    async createFaq(faqToInsert: FaqInsert): Promise<Faq> {
        try{
            const connection = db!;
            const _dbFaq : dbFaqToInsert = { question : faqToInsert.question, answer : faqToInsert.answer }
            const returning : Faq[] = await connection
                .insert(faqs)
                .values(_dbFaq)
                .returning()
            if (returning[0]) {
                return returning[0]
            }
            else{
                throw Error(`Не удалось создать`)
            }
        }catch(error){
            throw Error(`Не удалось создать`)
        }
    }

    /**
     *
     * @remarks
     * Этот метод обновляет faq
     *
     * @param id = id
     * @param question = string
     *
     * @returns
     * Возвращает обновленный faq
     *
     */
    async updateFaqQuestion(id: number, question: string): Promise<Faq> {
        try{
            const connection = db!;
            const returning : Faq[] = await connection
                .update(faqs)
                .set({question: question})
                .where(eq(faqs.id, id))
                .returning()
            if (returning[0]) {
                return returning[0]
            }
            else{
                throw Error('Не удалось обновить вопрос')
            }
        }catch(error){
            throw Error('Не удалось обновить вопрос')
        }
    }

    /**
     *
     * @remarks
     * Этот метод обновляет faq
     *
     * @param id = id
     * @param answer = string
     *
     * @returns
     * Возвращает обновленный faq
     *
     */
    async updateFaqAnswer(id: number, answer: string): Promise<Faq> {
        try{
            const connection = db!;
            const returning : Faq[] = await connection
                .update(faqs)
                .set({answer: answer})
                .where(eq(faqs.id, id))
                .returning()
            if (returning[0]) {
                return returning[0]
            }
            else{
                throw Error('Не удалось обновить ответ')
            }
        }catch(error){
            throw Error('Не удалось обновить ответ')
        }
    }


    /**
     *
     * @remarks
     * Этот метод удаляет faq
     *
     */
    async deleteFaq(id: number): Promise<void> {
        try{
            const connection = db!;
            const returning = connection
                .delete(faqs)
                .where(eq(faqs.id, id))
                .returning({ id : faqs.id })
            if (!returning) {
                throw Error("Не удалось удалить элемент с id" + id.toString())
            }
        }catch (error){
            throw Error("Не удалось удалить элемент с id" + id.toString())
        }
    }

}