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
    //ОШИБКА, В ЭТОМ СЛУЧАЕ ToHigherFunction, т.к. используется зависимость на FaqRepository
    faqModule.bind(DI_SYMBOLS.IAddFaqController)
        .toHigherOrderFunction(addFaqController, [
            DI_SYMBOLS.IFaqRepository
        ])
    faqModule.bind(DI_SYMBOLS.IDeleteFaqController)
        .toHigherOrderFunction(deleteFaqController, [
            DI_SYMBOLS.IFaqRepository
        ])
    faqModule.bind(DI_SYMBOLS.IGetFaqController)
        .toHigherOrderFunction(getFaqController, [
            DI_SYMBOLS.IFaqRepository
        ])
    faqModule.bind(DI_SYMBOLS.IUpdateAnswerFaqController)
        .toHigherOrderFunction(updateAnswerFaqController, [
            DI_SYMBOLS.IFaqRepository
        ])
    faqModule.bind(DI_SYMBOLS.IUpdateQuestionFaqController)
        .toHigherOrderFunction(updateQuestionFaqController, [
            DI_SYMBOLS.IFaqRepository
        ])

    return faqModule
}