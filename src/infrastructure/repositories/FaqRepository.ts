import {IFaqRepository} from "@/src/application/repositories/IFaqRepository";
import { Faq, FaqInsert } from "@/src/entities/models/faq";
import { db } from "@/drizzle/index"
import {dbFaq, dbFaqToInsert, faqs} from "@/drizzle/schema";
import { eq } from 'drizzle-orm'

export class FaqRepository implements IFaqRepository {
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
            throw Error(`Не удалось установить соединение`)
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
            if (id < 0) {
                throw Error('Не существует Faq с id < 0')
            }
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
            if (id < 0) {
                throw Error('Не существует Faq с id < 0')
            }
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
    async deleteFaq(id: number): Promise<boolean> {
        try{
            if (id < 0) {
                return false
            }
            const connection = db!;
            const returning = await connection
                .delete(faqs)
                .where(eq(faqs.id, id))
                .returning()
            if (!returning) {
                return false
            }
            else{
                return true
            }
        }catch (error){
            throw Error("Не удалось удалить элемент с id" + id.toString())
        }
    }

}