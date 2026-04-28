import {IGroupCacheRepository} from "@/src/application/repositories/IGroupCacheRepository";

export type IGroupUpdateCacheWithCategoriesController = ReturnType<typeof group_UpdateCache_WithCategoriesController>

export const group_UpdateCache_WithCategoriesController = (
        groupService : IGroupCacheRepository,
    ) => async (groud_id : number) : Promise<boolean> => {
        return await groupService.updateCacheWithCategoriesData(groud_id)
    }