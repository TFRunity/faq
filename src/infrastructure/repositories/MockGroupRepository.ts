import {IGroupRepository} from "@/src/application/repositories/IGroupRepository";
import {Group} from "@/src/entities/models/group";
import {GroupWithCategories} from "@/src/entities/models/view-models";


export class MockGroupRepository implements IGroupRepository {
    addGroup(title: string): Promise<boolean> {
        return Promise.resolve(true);
    }

    changeTitle(group: Group): Promise<boolean> {
        return Promise.resolve(group.id > 0);
    }

    deleteGroup(group_id: number): Promise<boolean> {
        return Promise.resolve(group_id > 0);
    }

    getAll(): Promise<Group[]> {
        return Promise.resolve([]);
    }

    getGroupWithCategories(group_id: number): Promise<GroupWithCategories> {
        return Promise.resolve({ group : {id : group_id, title : null, image_src : null}, categories : null });
    }

}