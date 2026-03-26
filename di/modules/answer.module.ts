import {createModule, Module} from "@evyweb/ioctopus";
import {DI_SYMBOLS} from "@/di/types";
import {deleteForceAnswerController} from "@/src/i-adapters/controllers/deleteForceAnswerController";


export function createAnswerModule() : Module {
    const answerModule : Module = createModule()

    answerModule.bind(DI_SYMBOLS.IDeleteForceAnswerController)
        .toHigherOrderFunction(deleteForceAnswerController, [
            DI_SYMBOLS.IAnswerRepository
        ])

    return answerModule
}