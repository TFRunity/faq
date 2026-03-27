import {IQuestionRepository} from "@/src/application/repositories/IQuestionRepository";
import {answers, questions} from "@/drizzle/schema";
import {QuestionWithLatestAnswer, rawQuestionWithAnswer, QuestionWithAnswers} from "@/src/entities/models/view-models";
import {db} from "@/drizzle";
import {IMappingFAQService} from "@/src/application/services/IMappingFAQService";
import {eq, isNull} from "drizzle-orm";
import { Question } from "@/src/entities/models/question";

export class QuestionRepository implements IQuestionRepository {

    constructor(
        private readonly mappingService : IMappingFAQService
    ) {}

    async add(question : string) : Promise<QuestionWithLatestAnswer> {
        const [newQuestion] = await db!
            .insert(questions)
            .values({question: question})
            .returning();
        return {
            question: newQuestion,
            answer: null
        };
    }

    async addWithAnswer(question : string, answer : string) : Promise<QuestionWithLatestAnswer> {
            const [newQuestion] = await db!
                .insert(questions)
                .values({question: question})
                .returning();
            const [newAnswer] = await db!
                .insert(answers)
                .values({answer: answer, question_id: newQuestion.id})
                .returning();
            const [updatedQuestion] = await db!
                .update(questions)
                .set({answer_id: newAnswer.id})
                .where(eq(questions.id, newQuestion.id))
                .returning();
        return{
            question: updatedQuestion,
            answer: newAnswer,
        }
    };

    async delete(question_id : number) : Promise<boolean>{
        if (question_id <= 0) return false
        const deleteRows : Question[] = await db!
            .delete(questions)
            .where(eq(questions.id,question_id))
            .returning()
        return deleteRows.length > 0;
    }

   async updateQuestion(question_id : number, question : string) : Promise<QuestionWithLatestAnswer>
    {
        const [updatedQuestion] = await db!
            .update(questions)
            .set({question: question})
            .where(eq(questions.id, question_id))
            .returning();
        const [AnswerOfUpdatedQuestion] = await db!
            .select()
            .from(answers)
            .where(eq(answers.question_id, question_id));
        return{
            question: updatedQuestion,
            answer: AnswerOfUpdatedQuestion
        }
    }//Обновить вопрос 1 запрос

    async getAllWithoutCategory() : Promise<QuestionWithLatestAnswer[]> {
        const raw : rawQuestionWithAnswer[]  = await db!
            .select()
            .from(questions)
            .innerJoin(answers, eq(questions.id, answers.question_id))
            .where(isNull(questions.category_id))
        return this.mappingService.convertRawQuestionWithLatestAnswer(raw);
    }//Получение плоских данных вопросов, которые не относятся ни к какой категории, (ТЕ ЧТО НА МОДЕРАЦИИ)

    //Связанное с ответами

    async getWithHistoryOfAnswers(question_id : number) : Promise<QuestionWithAnswers>{
        const raw : rawQuestionWithAnswer[]  = await db!
            .select()
            .from(questions)
            .innerJoin(answers, eq(questions.id, answers.question_id))
            .where(eq(questions.id, question_id))
        return this.mappingService.convertRawQuestionWithAnswers(raw)[0];
    }; //Получение плоских данных 1 запрос : Получить вопрос со всеми связанными answers, (через inner join)

    async addAnswer(question_id : number, answer : string) : Promise<QuestionWithLatestAnswer>{
        const [newAnswer] = await db!
            .insert(answers)
            .values({answer: answer, question_id: question_id})
            .returning();
        const [updatedQuestion] = await db!
            .update(questions)
            .set({answer_id: newAnswer.id})
            .where(eq(questions.id, question_id))
            .returning()
        return{
            question: updatedQuestion,
            answer: newAnswer,
        }
    }; //Добавить ответ, сменить answer_id 2 запроса

    async changeAnswerToPrevious(question_id : number, previous_answer_id : number) : Promise<QuestionWithLatestAnswer>{
        const [updatedQuestion] = await db!
            .update(questions)
            .set({answer_id: previous_answer_id})
            .where(eq(questions.id, question_id))
            .returning();
        if (!updatedQuestion) {
            throw new Error("Вопрос не найден");
        }
        const [previousAnswer] = await db!
            .select()
            .from(answers)
            .where(eq(answers.id, previous_answer_id))
        return{
            question: updatedQuestion,
            answer: previousAnswer,
        }
    } //Сменить answer_id 1 запрос

    // Связанное с категориями

    async addRelWithCategories(question_id : number, category_id : number) : Promise<boolean>{
       const isInvalid : boolean = (question_id <= 0 || category_id <= 0)
        if(isInvalid){
            return false;
        }
        const [updatedQuestion] = await db!
            .update(questions)
            .set({category_id: category_id})
            .where(eq(questions.id, question_id))
            .returning();
        return !!updatedQuestion;
    }; //Изменить category_id

    async deleteRelWithCategories(question_id : number) : Promise<boolean>{
        if(question_id <= 0){
            return false;
        }
        const [updatedQuestion] = await db!
            .update(questions)
            .set({category_id: null})
            .where(eq(questions.id, question_id))
            .returning();
        return !!updatedQuestion;
    }; //Занулить category_id


}