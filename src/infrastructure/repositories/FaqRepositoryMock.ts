import {IFaqRepository} from "@/src/application/repositories/IFaqRepository";
import { Faq, FaqInsert } from "@/src/entities/models/faq";
import { db } from "@/drizzle/index"
import {dbFaq, dbFaqToInsert, faqs} from "@/drizzle/schema";
import { eq } from 'drizzle-orm'

export class FaqRepositoryMock implements IFaqRepository {

    private faqs : Faq[] = [];
    private dbFaqs : dbFaq[] =[];

    constructor() {
        this.faqs = [ { id: 1, question: '', answer: '' } ]
        this.dbFaqs = [ { id: 1, question: '', answer: '' } ]
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
        return (this.dbFaqs)
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
        return ({ id: 2, question: faqToInsert.question, answer: faqToInsert.answer })
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
        return ({ id: 2, question: question, answer: '' })
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
        return ({ id: 2, question: '', answer: answer })
    }


    /**
     *
     * @remarks
     * Этот метод удаляет faq
     *
     */
    async deleteFaq(id: number): Promise<boolean> {
        if (id < 0) {
            return (false)
        }
        return (true)
    }

}