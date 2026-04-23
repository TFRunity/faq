import {IGroupRepository} from "@/src/application/repositories/IGroupRepository";
import {Group} from "@/src/entities/models/group";


export class MockGroupRepository implements IGroupRepository {
    async addGroup(title: string): Promise<boolean> {
        return true;
    }

    async changeTitle(group: Group): Promise<boolean> {
        return group.id > 0;
    }

    async deleteGroup(group_id: number): Promise<boolean> {
        return group_id > 0;
    }

    async getAll(): Promise<Group[]> {
        return Promise.resolve([]);
    }

}