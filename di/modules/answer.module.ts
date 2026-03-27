import {createModule, Module} from "@evyweb/ioctopus";
import {DI_SYMBOLS} from "@/di/types";
import {answer_deleteForceController} from "@/src/i-adapters/controllers/Answer_deleteForceController";


export function createAnswerModule() : Module {
    const answerModule : Module = createModule()

    answerModule.bind(DI_SYMBOLS.IAnswerDeleteForceController)
        .toHigherOrderFunction(answer_deleteForceController, [
            DI_SYMBOLS.IAnswerRepository
        ])

    return answerModule
}