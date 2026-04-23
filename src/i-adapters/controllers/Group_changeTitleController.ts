import {IGroupRepository} from "@/src/application/repositories/IGroupRepository";
import {Group} from "@/src/entities/models/group";

export type IGroupChangeTitleController = ReturnType<typeof group_changeTitleController>

export const group_changeTitleController = (
        groupService : IGroupRepository
    ) => async (group : Group) : Promise<boolean> => {
        return await groupService.changeTitle(group)
    }