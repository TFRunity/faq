import {IAnswerRepository} from "@/src/application/repositories/IAnswerRepository";
import { db } from "@/drizzle"
import {answers, questions} from "@/drizzle/schema";
import {eq} from "drizzle-orm";

export class AnswerRepository implements IAnswerRepository {

    async forceDelete(answer_id: number): Promise<boolean> {
        if(answer_id <= 0) return false;
        const a  = await db!.delete(answers).where(eq(answers.id, answer_id)).returning({id : answers.question_id})
        if (a.length > 0) {
            //Очистка зависимости у вопроса, если такой есть
            const b = await db!.select({id : questions.id}).from(questions).where(eq(questions.answer_id, answer_id))
            if (b.length > 0) {
                await db!.update(questions).set({answer_id : null}).where(eq(questions.id, b[0].id))
            }
            return true
        }
        return false
    }

}