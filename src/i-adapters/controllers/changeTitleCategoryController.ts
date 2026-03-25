import {ICategoryRepository} from "@/src/application/repositories/ICategoryRepository";
import {Category} from "@/src/entities/models/category"

export type IChangeTitleCategoryController = ReturnType<typeof changeTitleCategoryController>

export const changeTitleCategoryController = (
        categoryService : ICategoryRepository
    ) => async (category : Category) : Promise<boolean> =>{
            return await categoryService.changeTitle(category);
        }