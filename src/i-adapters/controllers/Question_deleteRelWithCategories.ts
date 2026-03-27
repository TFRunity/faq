import {IQuestionRepository} from "@/src/application/repositories/IQuestionRepository";

export type IQuestionDeleteRelWithCategoriesController = ReturnType<typeof question_deleteRelWithCategoriesController>

export const question_deleteRelWithCategoriesController = (
    questionService : IQuestionRepository
) => async (question_id : number) : Promise<boolean> => {
    return await questionService.deleteRelWithCategories(question_id);
}