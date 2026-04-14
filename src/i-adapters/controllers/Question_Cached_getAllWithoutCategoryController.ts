import {QuestionWithLatestAnswer} from "@/src/entities/models/view-models";
import {IQuestionCacheRepository} from "@/src/application/repositories/IQuestionCacheRepository";

export type IQuestionGetAllWithoutCategoryController = ReturnType<typeof question_Cached_getAllWithoutCategoryController>

export const question_Cached_getAllWithoutCategoryController = (
    questionService : IQuestionCacheRepository
) => async () : Promise<QuestionWithLatestAnswer[]> => {
    return await questionService.getCachedData()
}