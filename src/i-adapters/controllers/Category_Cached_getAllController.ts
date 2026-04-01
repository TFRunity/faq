import {CategoryWithQuestions} from "@/src/entities/models/view-models";
import {ICacheRepository} from "@/src/application/repositories/ICacheRepository";

export type ICategoryGetAllController = ReturnType<typeof category_Cached_getAllController>;

export const category_Cached_getAllController = (
        cacheService : ICacheRepository
    )  => async () : Promise<CategoryWithQuestions[]> => {
            return await cacheService.getCachedData()
        }