import {ICategoryCacheRepository} from "@/src/application/repositories/ICategoryCacheRepository";
import {CategoryWithQuestions} from "@/src/entities/models/view-models";
import redis from "@/redis";
import {ICategoryRepository} from "@/src/application/repositories/ICategoryRepository";
import {ISmartSearchRepository} from "@/src/application/repositories/ISmartSearchRepository";

export class CategoryCacheRepository implements ICategoryCacheRepository {

    constructor(private readonly categoryService: ICategoryRepository, private readonly searchService : ISmartSearchRepository) {
    }

    async getCachedData(): Promise<CategoryWithQuestions[]> {

        const categories = await redis.get("category:all");
        if (categories) return JSON.parse(categories)
        const result : CategoryWithQuestions[] = await this.categoryService.getAll()
        await redis.set("category:all", JSON.stringify(result), {EX : 300})
        return result
    }
    async updateCachedData(): Promise<boolean> {
        const categories : CategoryWithQuestions[] = await this.categoryService.getAll()
        const result = await redis.set("category:all", JSON.stringify(categories), {EX : 300})
        return result === 'OK';
    }
}
//Не использовать