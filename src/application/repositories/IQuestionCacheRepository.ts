import {QuestionWithLatestAnswer} from "@/src/entities/models/view-models";

export interface IQuestionCacheRepository {
    getCachedData() : Promise<QuestionWithLatestAnswer[]>,
    updateCachedData() : Promise<boolean>,
}