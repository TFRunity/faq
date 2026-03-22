import {createModule, Module} from "@evyweb/ioctopus";
import { DI_SYMBOLS } from "@/di/types";
import {MappingFAQService} from "@/src/infrastructure/services/MappingFAQService";
import {CategoryRepository} from "@/src/infrastructure/repositories/CategoryRepository";

export function createFaqModule() : Module {
    const faqModule : Module = createModule()

    // if ( process.env.NODE_ENV === "test" ) {
    //     faqModule.bind(DI_SYMBOLS.IFaqRepository)
    //         .toClass(FaqRepositoryMock)
    // }else{
    //     faqModule.bind(DI_SYMBOLS.IFaqRepository)
    //         .toClass(FaqRepository)
    // }

    faqModule.bind(DI_SYMBOLS.ICategoryRepository)
        .toClass(CategoryRepository)
    faqModule.bind(DI_SYMBOLS.IMappingFAQService)
        .toClass(MappingFAQService)

    //ToHigherFunction => Если функция использует ещё и зависимости
    //В этом случае просто toFunction, т.к. контроллер не использует другие зависимости
    //ОШИБКА, В ЭТОМ СЛУЧАЕ ToHigherFunction, т.к. используется зависимость на FaqRepository
    // faqModule.bind(DI_SYMBOLS.IAddFaqController)
    //     .toHigherOrderFunction(addFaqController, [
    //         DI_SYMBOLS.IFaqRepository
    //     ])

    return faqModule
}