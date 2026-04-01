import {CategoryWithQuestions} from "@/src/entities/models/view-models";

export interface ICacheRepository {
    getCachedData() : Promise<CategoryWithQuestions[]>,
    updateCachedData(categoryWithQuestions : CategoryWithQuestions[]) : Promise<boolean>
}