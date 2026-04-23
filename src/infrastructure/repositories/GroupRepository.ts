import {IGroupRepository} from "@/src/application/repositories/IGroupRepository";
import {db} from "@/drizzle"
import {groups} from "@/drizzle/schema";
import {Group} from "@/src/entities/models/group";
import {eq} from "drizzle-orm";


export class GroupRepository implements IGroupRepository {

    async addGroup(title: string): Promise<boolean> {
        const created_group : Group[] = await db!.insert(groups)
            .values({title : title})
            .returning()
        return created_group.length > 0;
    }

    async changeTitle(group : Group): Promise<boolean> {
        const updated_group : Group[] = await db!.update(groups)
            .set({title : group.title})
            .where(eq(groups.id, group.id))
            .returning()
        return updated_group.length > 0;
    }

    async deleteGroup(group_id: number): Promise<boolean> {
        const deleted_group : Group[] = await db!.delete(groups)
            .where(eq(groups.id, group_id))
            .returning()
        return deleted_group.length > 0;
    }

    async getAll(): Promise<Group[]> {
        return db!.select().from(groups);
    }

}