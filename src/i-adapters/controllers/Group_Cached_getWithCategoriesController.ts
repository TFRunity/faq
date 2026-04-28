import {IGroupCacheRepository} from "@/src/application/repositories/IGroupCacheRepository";
import {GroupWithCategories} from "@/src/entities/models/view-models";

export type IGroupGetWithCategoriesController = ReturnType<typeof group_Cached_getWithCategoriesController>

export const group_Cached_getWithCategoriesController = (
        groupService : IGroupCacheRepository,
    ) => async (group_id : number) : Promise<GroupWithCategories> => {
        return await groupService.getCachedWithCategoriesData(group_id)
    }