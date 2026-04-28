import {createModule, Module} from "@evyweb/ioctopus";
import {DI_SYMBOLS} from "@/di/types";
import {group_addController} from "@/src/i-adapters/controllers/Group_addController";
import {group_deleteController} from "@/src/i-adapters/controllers/Group_deleteController";
import {group_updateGroupController} from "@/src/i-adapters/controllers/Group_updateGroupController";


export function createGroupModule() : Module {
    const groupModule : Module = createModule()

    groupModule.bind(DI_SYMBOLS.IGroupAddController)
        .toHigherOrderFunction(group_addController, [
            DI_SYMBOLS.IGroupRepository
        ])
    groupModule.bind(DI_SYMBOLS.IGroupUpdateController)
        .toHigherOrderFunction(group_updateGroupController,[
            DI_SYMBOLS.IGroupRepository
        ])
    groupModule.bind(DI_SYMBOLS.IGroupDeleteController)
        .toHigherOrderFunction(group_deleteController, [
            DI_SYMBOLS.IGroupRepository
        ])

    return groupModule
}