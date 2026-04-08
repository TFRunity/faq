import {ICacheRepository} from "@/src/application/repositories/ICacheRepository";
import {CategoryWithQuestions} from "@/src/entities/models/view-models";
import redis from "@/redis";
import {NextResponse} from "next/server";
import {ICategoryRepository} from "@/src/application/repositories/ICategoryRepository";
import sync from "@/typesense/typesenseSyncScript";

export class CacheRepository implements ICacheRepository {

    constructor(private readonly categoryService: ICategoryRepository) {
    }

    async getCachedData(): Promise<CategoryWithQuestions[]> {

        const categories = await redis.get("category:all");
        if (categories) return JSON.parse(categories)
        const result : CategoryWithQuestions[] = await this.categoryService.getAll()
        await redis.set("category:all", JSON.stringify(result), {EX : 300})
        await sync()
        return result
    }

    async updateCachedData(categoryWithQuestions: CategoryWithQuestions[]): Promise<boolean> {

        const res = await redis.set("category:all", JSON.stringify(categoryWithQuestions), {EX : 300})
        return res === "OK"
    }
}