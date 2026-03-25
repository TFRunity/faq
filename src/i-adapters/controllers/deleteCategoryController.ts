import {ICategoryRepository} from "@/src/application/repositories/ICategoryRepository";

export type IDeleteCategoryController = ReturnType<typeof deleteCategoryController>

export const deleteCategoryController = (
        categoryService : ICategoryRepository
    ) => async (category_id : number) : Promise<boolean> => {
            return await categoryService.delete(category_id);
        }