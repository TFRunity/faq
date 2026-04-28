import {IGroupRepository} from "@/src/application/repositories/IGroupRepository";
import {Group} from "@/src/entities/models/group"

export type IGroupAddController = ReturnType<typeof group_addController>

export const group_addController = (
        groupService : IGroupRepository
    ) => async  (title : string) : Promise<Group> => {
            return await groupService.addGroup(title)
        }