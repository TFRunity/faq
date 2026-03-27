import {createModule, Module} from "@evyweb/ioctopus";
import { DI_SYMBOLS } from "@/di/types";
import {MappingFAQService} from "@/src/infrastructure/services/MappingFAQService";
import {CategoryRepository} from "@/src/infrastructure/repositories/CategoryRepository";
import {AnswerRepository} from "@/src/infrastructure/repositories/AnswerRepository";
import {QuestionRepository} from "@/src/infrastructure/repositories/QuestionRepository";
import {MockAnswerRepository} from "@/src/infrastructure/repositories/MockAnswerRepository";
import {MockCategoryRepository} from "@/src/infrastructure/repositories/MockCategoryRepository";

export function createFaqModule() : Module {
    const faqModule : Module = createModule()

    // if ( process.env.NODE_ENV === "test" ) {
    //     faqModule.bind(DI_SYMBOLS.IFaqRepository)
    //         .toClass(FaqRepositoryMock)
    // }else{
    //     faqModule.bind(DI_SYMBOLS.IFaqRepository)
    //         .toClass(FaqRepository)
    // }

    if (process.env.NODE_ENV === "test") {
        faqModule.bind(DI_SYMBOLS.ICategoryRepository)
            .toClass(MockCategoryRepository)
    }else{
        faqModule.bind(DI_SYMBOLS.ICategoryRepository)
            .toClass(CategoryRepository, [
                DI_SYMBOLS.IMappingFAQService,
            ])
    }

    if (process.env.NODE_ENV === "test") {
        faqModule.bind(DI_SYMBOLS.IAnswerRepository)
            .toClass(MockAnswerRepository)
    }else{
        faqModule.bind(DI_SYMBOLS.IAnswerRepository)
            .toClass(AnswerRepository)
    }

    faqModule.bind(DI_SYMBOLS.IQuestionRepository)
        .toClass(QuestionRepository, [
            DI_SYMBOLS.IMappingFAQService,
        ])

    faqModule.bind(DI_SYMBOLS.IMappingFAQService)
        .toClass(MappingFAQService)

    return faqModule
}