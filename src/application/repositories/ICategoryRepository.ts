import { CategoryWithQuestions } from "@/src/entities/models/view-models";
import {Category} from "@/src/entities/models/category";

export interface ICategoryRepository {
    getAll() : Promise<CategoryWithQuestions[]>,
    addClean() : Promise<CategoryWithQuestions>,
    delete(category_id: number) : Promise<boolean>,
    changeName(category : Category) : Promise<boolean>,
}