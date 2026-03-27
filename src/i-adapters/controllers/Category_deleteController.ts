import {ICategoryRepository} from "@/src/application/repositories/ICategoryRepository";

export type ICategoryDeleteController = ReturnType<typeof category_deleteController>

export const category_deleteController = (
        categoryService : ICategoryRepository
    ) => async (category_id : number) : Promise<boolean> => {
            return await categoryService.delete(category_id);
        }