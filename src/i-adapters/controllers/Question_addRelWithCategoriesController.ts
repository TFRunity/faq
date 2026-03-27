import {IQuestionRepository} from "@/src/application/repositories/IQuestionRepository";

export type IQuestionAddRelWithCategoriesController = ReturnType<typeof question_addRelWithCategoriesController>

export const question_addRelWithCategoriesController = (
    questionService : IQuestionRepository
) => async (question_id : number, category_id : number) : Promise<boolean> => {
    return await questionService.addRelWithCategories(question_id, category_id);
}