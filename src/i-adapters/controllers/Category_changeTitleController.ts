import {ICategoryRepository} from "@/src/application/repositories/ICategoryRepository";
import {Category} from "@/src/entities/models/category"

export type ICategoryChangeTitleController = ReturnType<typeof category_changeTitleController>

export const category_changeTitleController = (
        categoryService : ICategoryRepository
    ) => async (category : Category) : Promise<boolean> =>{
            return await categoryService.changeTitle(category);
        }