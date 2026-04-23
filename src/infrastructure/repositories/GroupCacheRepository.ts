import {IGroupCacheRepository} from "@/src/application/repositories/IGroupCacheRepository";
import {Group} from "@/src/entities/models/group";
import {IGroupRepository} from "@/src/application/repositories/IGroupRepository";
import redis from "@/redis";
import sync from "@/typesense/typesenseSyncScript";


export class GroupCacheRepository implements IGroupCacheRepository {

    constructor(private readonly groupService : IGroupRepository) {
    }

    async getCachedData(): Promise<Group[]> {
        const groups = await redis.get("groups:all");
        if (groups) return JSON.parse(groups);
        const result : Group[] = await this.groupService.getAll()
        await redis.set("groups:all", JSON.stringify(groups), {EX : 300});
        await sync()
        return result;
    }

    async updateCachedData(): Promise<boolean> {
        const groups = await this.groupService.getAll();
        const result = await redis.set("groups:all", JSON.stringify(groups), {EX : 300});
        await sync()
        return result === "OK";
    }

}