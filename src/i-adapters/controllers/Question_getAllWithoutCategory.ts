import {QuestionWithLatestAnswer} from "@/src/entities/models/view-models";
import {IQuestionRepository} from "@/src/application/repositories/IQuestionRepository";

export type IQuestionGetAllWithoutCategoryController = ReturnType<typeof question_getAllWithoutCategoryController>

export const question_getAllWithoutCategoryController = (
    questionService : IQuestionRepository
) => async () : Promise<QuestionWithLatestAnswer[]> => {
    return await questionService.getAllWithoutCategory();
}