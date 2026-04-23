import {IGroupRepository} from "@/src/application/repositories/IGroupRepository";

export type IGroupDeleteController = ReturnType<typeof group_deleteController>

export const group_deleteController = (
        groupService : IGroupRepository
    ) => async (group_id : number) : Promise<boolean> => {
        return await groupService.deleteGroup(group_id)
    }