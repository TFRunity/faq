import {createModule, Module} from "@evyweb/ioctopus";
import { FaqRepository } from "@/src/infrastructure/repositories/FaqRepository";
import { FaqRepositoryMock } from "@/src/infrastructure/repositories/FaqRepositoryMock";
import { DI_SYMBOLS } from "@/di/types";
import {addFaqController} from "@/src/i-adapters/controllers/addFaqController";
import {deleteFaqController} from "@/src/i-adapters/controllers/deleteFaqController";
import {getFaqController} from "@/src/i-adapters/controllers/getFaqController";
import {updateAnswerFaqController} from "@/src/i-adapters/controllers/updateAnswerFaqController";
import {updateQuestionFaqController} from "@/src/i-adapters/controllers/updateQuestionFaqController";

export function createFaqModule() : Module {
    const faqModule : Module = createModule()

    if ( process.env.NODE_ENV === "test" ) {
        faqModule.bind(DI_SYMBOLS.IFaqRepository)
            .toClass(FaqRepositoryMock)
    }else{
        faqModule.bind(DI_SYMBOLS.IFaqRepository)
            .toClass(FaqRepository)
    }

    //ToHigherFunction => Если функция использует ещё и зависимости
    //В этом случае просто toFunction, т.к. контроллер не использует другие зависимости
    faqModule.bind(DI_SYMBOLS.IAddFaqController)
        .toFunction(addFaqController)
    faqModule.bind(DI_SYMBOLS.IDeleteFaqController)
        .toFunction(deleteFaqController)
    faqModule.bind(DI_SYMBOLS.IGetFaqController)
        .toFunction(getFaqController)
    faqModule.bind(DI_SYMBOLS.IUpdateAnswerFaqController)
        .toFunction(updateAnswerFaqController)
    faqModule.bind(DI_SYMBOLS.IUpdateQuestionFaqController)
        .toFunction(updateQuestionFaqController)


    return faqModule
}