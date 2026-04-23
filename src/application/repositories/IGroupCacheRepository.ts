import {Group} from "@/src/entities/models/group";


export interface IGroupCacheRepository {
    getCachedData() : Promise<Group[]>,
    updateCachedData() : Promise<boolean>,
}