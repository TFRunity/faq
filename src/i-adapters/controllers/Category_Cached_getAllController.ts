import {CategoryWithQuestions} from "@/src/entities/models/view-models";
import {ICategoryCacheRepository} from "@/src/application/repositories/ICategoryCacheRepository";

export type ICategoryGetAllController = ReturnType<typeof category_Cached_getAllController>;

export const category_Cached_getAllController = (
        cacheService : ICategoryCacheRepository
    )  => async () : Promise<CategoryWithQuestions[]> => {
            return await cacheService.getCachedData()
        }