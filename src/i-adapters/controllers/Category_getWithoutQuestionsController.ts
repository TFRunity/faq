import {ICategoryRepository} from "@/src/application/repositories/ICategoryRepository";
import {Category} from "@/src/entities/models/category"

export type ICategoryGetWithoutQuestionsController = ReturnType<typeof category_getWithoutQuestionsController>

export const category_getWithoutQuestionsController = (
        categoryService : ICategoryRepository,
    ) => async () : Promise<Category[]> => {
        return await categoryService.getWithoutQuestions()
    }