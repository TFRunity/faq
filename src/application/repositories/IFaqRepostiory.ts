import {Faq, FaqInsert} from "@/src/entities/models/faq";

export interface IFaqRepostiory {
    getFaq(id: number) : Promise<Faq>
    createFaq(faqToInsert : FaqInsert) : Promise<Faq>
    updateFaqQuestion(id : number, question : string) : Promise<Faq>
    updateFaqAnswer(id : number, answer : string) : Promise<Faq>
    deleteFaq(id: number) : Promise<void>
}