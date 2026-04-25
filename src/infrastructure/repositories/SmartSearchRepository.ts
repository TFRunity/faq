import {ISmartSearchRepository} from "@/src/application/repositories/ISmartSearchRepository";
import {db as pgClient} from "@/drizzle"
import {client as typeSenseClient, client} from "@/typesense/typesenseAdapter";
import {answers, questions} from "@/drizzle/schema";
import {eq} from "drizzle-orm";

const setupSchema = async (group_id : number, schema : any) => {
    try{
        await client.collections('faq_search' + group_id.toString()).delete();
    } catch(err){

    }
    await client.collections().create(schema)
}

export class SmartSearchRepository implements ISmartSearchRepository {

    async syncByGroup(group_id: number): Promise<void> {
        try{
            const schema : any = {
                'name': 'faq_search' + group_id.toString(),
                'fields': [
                    { name: 'id', type: 'string', locale: "ru" },
                    { name: 'question', type: 'string', locale: "ru" },
                    { name: 'answer', type: 'string', locale: "ru" },
                ],
            }
            await setupSchema(group_id, schema);

            const res = await pgClient
                .select({
                    id: questions.id,
                    question: questions.question,
                    answer: answers.answer,
                })
                .from(questions)
                .innerJoin(answers, on => eq(questions.answer_id, answers.id));

            const documents = res.map(row => ({
                id: row.id.toString(),
                question: row.question || "",
                answer: row.answer || "",
            }))

            const response = await typeSenseClient
                .collections("faq_search" + group_id.toString())
                .documents()
                .import(documents, {action: 'upsert'})
        } catch (e) {
            throw e
        }
    }

}