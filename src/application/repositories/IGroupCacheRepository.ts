import {Group} from "@/src/entities/models/group";
import {GroupWithCategories} from "@/src/entities/models/view-models";


export interface IGroupCacheRepository {
    getCachedData() : Promise<Group[]>,
    getCachedWithCategoriesData(group_id : number) : Promise<GroupWithCategories>,
    updateCachedData() : Promise<boolean>,
    updateCacheWithCategoriesData(group_id: number) : Promise<boolean>
}