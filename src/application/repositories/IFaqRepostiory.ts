import {Faq, FaqInsert} from "@/src/entities/models/faq";
import {dbFaq} from "@/drizzle/schema";

export interface IFaqRepostiory {
    getAllFaq() : Promise<dbFaq[]>
    createFaq(faqToInsert : FaqInsert) : Promise<Faq>
    updateFaqQuestion(id : number, question : string) : Promise<Faq>
    updateFaqAnswer(id : number, answer : string) : Promise<Faq>
    deleteFaq(id: number) : Promise<void>
}