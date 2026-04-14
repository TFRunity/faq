import {ICategoryCacheRepository} from "@/src/application/repositories/ICategoryCacheRepository";
import {CategoryWithQuestionsWithAnswer} from "@/app/_actions/faq-actions";

export type ICategoryUpdateCacheController = ReturnType<typeof category_updateCache_Controller>

export const category_updateCache_Controller = (
    cacheService : ICategoryCacheRepository
) => async () : Promise<boolean> => {
    return await cacheService.updateCachedData()
}