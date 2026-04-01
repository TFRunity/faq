import {ICacheRepository} from "@/src/application/repositories/ICacheRepository";
import {CategoryWithQuestions} from "@/src/entities/models/view-models";


export class CacheRepository implements ICacheRepository {
    getCachedData(): Promise<CategoryWithQuestions[]> {



        return Promise.resolve([]);
    }

    updateCachedData(categoryWithQuestions: CategoryWithQuestions[]): Promise<boolean> {



        return Promise.resolve(false);
    }

}