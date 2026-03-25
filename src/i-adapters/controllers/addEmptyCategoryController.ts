import {ICategoryRepository} from "@/src/application/repositories/ICategoryRepository";
import {CategoryWithQuestions} from "@/src/entities/models/view-models";

export type IAddEmptyCategoryController = ReturnType<typeof addEmptyCategoryController>

export const addEmptyCategoryController = (
        categoryService : ICategoryRepository
    ) => async () : Promise<CategoryWithQuestions> => {
            return await categoryService.addEmpty()
        }