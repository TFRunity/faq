import {Group} from "@/src/entities/models/group";
import {GroupWithCategories} from "@/src/entities/models/view-models";


export interface IGroupRepository {
    getAll() : Promise<Group[]>
    updateGroup(group : Group): Promise<boolean>
    addGroup(title: string) : Promise<Group>
    deleteGroup(group_id: number): Promise<boolean>
    getGroupWithCategories(group_id: number) : Promise<GroupWithCategories>
}