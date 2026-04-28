import {IGroupCacheRepository} from "@/src/application/repositories/IGroupCacheRepository";

export type IGroupUpdateCacheController = ReturnType<typeof group_UpdateCacheController>

export const group_UpdateCacheController = (
        groupService : IGroupCacheRepository,
    ) => async () : Promise<boolean> => {
        return await groupService.updateCachedData()
    }