import {IGroupRepository} from "@/src/application/repositories/IGroupRepository";
import {Group} from "@/src/entities/models/group";

export type IGroupUpdateController = ReturnType<typeof group_updateGroupController>

export const group_updateGroupController = (
        groupService : IGroupRepository
    ) => async (group : Group) : Promise<boolean> => {
        return await groupService.updateGroup(group)
    }