import {IGroupRepository} from "@/src/application/repositories/IGroupRepository";
import {db} from "@/drizzle"
import {groups} from "@/drizzle/schema";
import {Group} from "@/src/entities/models/group";
import {eq} from "drizzle-orm";
import {CategoryWithQuestions, GroupWithCategories} from "@/src/entities/models/view-models";
import {ICategoryRepository} from "@/src/application/repositories/ICategoryRepository";


export class GroupRepository implements IGroupRepository {

    constructor(private readonly categoryService : ICategoryRepository) {
    }

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

    async getGroupWithCategories(group_id: number): Promise<GroupWithCategories> {
        const _groups : Group[] = await db!.select().from(groups).where(eq(groups.id, group_id))
        const categories : CategoryWithQuestions[] = await this.categoryService.getAllOfGroup(group_id)
        return {group : _groups[0], categories : categories}
    }


}