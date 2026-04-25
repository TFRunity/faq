import {IGroupCacheRepository} from "@/src/application/repositories/IGroupCacheRepository";
import {Group} from "@/src/entities/models/group";
import {IGroupRepository} from "@/src/application/repositories/IGroupRepository";
import redis from "@/redis";
import {GroupWithCategories} from "@/src/entities/models/view-models";
import {ISmartSearchRepository} from "@/src/application/repositories/ISmartSearchRepository";


export class GroupCacheRepository implements IGroupCacheRepository {

    constructor(private readonly groupService : IGroupRepository, private readonly searchService : ISmartSearchRepository) {
    }

    async getCachedData(): Promise<Group[]> {
        const groups = await redis.get("groups:all");
        if (groups) return JSON.parse(groups);
        const result : Group[] = await this.groupService.getAll()
        await redis.set("groups:all", JSON.stringify(groups), {EX : 300});
        return result;
    }

    async getCachedWithCategoriesData(group_id : number) : Promise<GroupWithCategories>  {
        const group = await redis.get("groups:" + group_id);
        if (group) return JSON.parse(group);
        const result : GroupWithCategories = await this.groupService.getGroupWithCategories(group_id);
        await redis.set("groups:" + group_id, JSON.stringify(result), {EX : 300});
        await this.searchService.syncByGroup(group_id);
        return result;
    }

    async updateCachedData(): Promise<boolean> {
        const groups = await this.groupService.getAll();
        const result = await redis.set("groups:all", JSON.stringify(groups), {EX : 300});
        return result === "OK";
    }

    async updateCacheWithCategoriesData(group_id: number) : Promise<boolean> {
        const result : GroupWithCategories = await this.groupService.getGroupWithCategories(group_id);
        const res = await redis.set("groups:" + group_id, JSON.stringify(result), {EX : 300});
        await this.searchService.syncByGroup(group_id);
        return res === "OK";
    }

}