import {QuestionWithLatestAnswer} from "@/src/entities/models/view-models";
import redis from "@/redis";
import {IQuestionCacheRepository} from "@/src/application/repositories/IQuestionCacheRepository";
import {IQuestionRepository} from "@/src/application/repositories/IQuestionRepository";

export class QuestionCacheRepository implements IQuestionCacheRepository {

    constructor(private readonly questionService: IQuestionRepository) {
    }

    async getCachedData(): Promise<QuestionWithLatestAnswer[]> {

        const questions = await redis.get("question_a:all");
        if (questions) return JSON.parse(questions)
        const result : QuestionWithLatestAnswer[] = await this.questionService.getAllWithoutCategory()
        await redis.set("question_a:all", JSON.stringify(result), {EX : 300})
        return result
    }
    async updateCachedData(): Promise<boolean> {
        const questions : QuestionWithLatestAnswer[] = await this.questionService.getAllWithoutCategory()
        const result = await redis.set("question_a:all", JSON.stringify(questions), {EX : 300})
        return result === 'OK'
    }
}