import {CategoryWithQuestions} from "@/src/entities/models/view-models";
import {ICategoryRepository} from "@/src/application/repositories/ICategoryRepository";

export type IGetAllCategoriesController = ReturnType<typeof getAllCategoriesController>;

export const getAllCategoriesController = (
        categoryService : ICategoryRepository
    )  => async () : Promise<CategoryWithQuestions[]> => {
            return await categoryService.getAll();
        }