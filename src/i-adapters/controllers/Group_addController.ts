import {IGroupRepository} from "@/src/application/repositories/IGroupRepository";

export type IGroupAddController = ReturnType<typeof group_addController>

export const group_addController = (
        groupService : IGroupRepository
    ) => async  (title : string) : Promise<boolean> => {
            return await groupService.addGroup(title)
        }