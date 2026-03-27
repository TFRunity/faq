import {CategoryWithQuestions} from "@/src/entities/models/view-models";
import {ICategoryRepository} from "@/src/application/repositories/ICategoryRepository";

export type ICategoryGetAllController = ReturnType<typeof category_getAllController>;

export const category_getAllController = (
        categoryService : ICategoryRepository
    )  => async () : Promise<CategoryWithQuestions[]> => {
            return await categoryService.getAll();
        }