import {CategoryWithQuestions} from "@/src/entities/models/view-models";

export interface ICategoryCacheRepository {
    getCachedData() : Promise<CategoryWithQuestions[]>,
    updateCachedData() : Promise<boolean>,
}