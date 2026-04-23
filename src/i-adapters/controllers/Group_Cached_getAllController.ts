import {IGroupCacheRepository} from "@/src/application/repositories/IGroupCacheRepository";
import {Group} from "@/src/entities/models/group";

export type IGroupCachedGetAllController = ReturnType<typeof group_Cached_getAllController>

export const group_Cached_getAllController= (
        groupCacheService : IGroupCacheRepository,
    ) => async () : Promise<Group[]> => {
        return await groupCacheService.getCachedData()
    }