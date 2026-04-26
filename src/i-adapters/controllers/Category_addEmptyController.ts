import {ICategoryRepository} from "@/src/application/repositories/ICategoryRepository";
import {CategoryWithQuestions} from "@/src/entities/models/view-models";

export type ICategoryAddEmptyController = ReturnType<typeof category_addEmptyController>

export const category_addEmptyController = (
        categoryService : ICategoryRepository
    ) => async (group_id : number) : Promise<CategoryWithQuestions> => {
            return await categoryService.addEmpty(group_id)
        }






























































