import {IQuestionCacheRepository} from "@/src/application/repositories/IQuestionCacheRepository";
import {QuestionWithLatestAnswer} from "@/src/entities/models/view-models";

export type IQuestionUpdateCacheController = ReturnType<typeof question_updateCache_Controller>

export const question_updateCache_Controller = (
    cacheService : IQuestionCacheRepository
) => async () : Promise<boolean> => {
    return await cacheService.updateCachedData()
}