import {createModule, Module} from "@evyweb/ioctopus";
import {DI_SYMBOLS} from "@/di/types";
import {group_addController} from "@/src/i-adapters/controllers/Group_addController";
import {group_changeTitleController} from "@/src/i-adapters/controllers/Group_changeTitleController";
import {group_deleteController} from "@/src/i-adapters/controllers/Group_deleteController";


export function createGroupModule() : Module {
    const groupModule : Module = createModule()

    groupModule.bind(DI_SYMBOLS.IGroupAddController)
        .toHigherOrderFunction(group_addController, [
            DI_SYMBOLS.IGroupRepository
        ])
    groupModule.bind(DI_SYMBOLS.IGroupChangeTitleController)
        .toHigherOrderFunction(group_changeTitleController,[
            DI_SYMBOLS.IGroupChangeTitleController
        ])
    groupModule.bind(DI_SYMBOLS.IGroupDeleteController)
        .toHigherOrderFunction(group_deleteController, [
            DI_SYMBOLS.IGroupDeleteController
        ])

    return groupModule
}