import {createModule, Module} from "@evyweb/ioctopus";
import { DI_SYMBOLS } from "@/di/types";
import {MappingFAQService} from "@/src/infrastructure/services/MappingFAQService";
import {CategoryRepository} from "@/src/infrastructure/repositories/CategoryRepository";
import {AnswerRepository} from "@/src/infrastructure/repositories/AnswerRepository";
import {QuestionRepository} from "@/src/infrastructure/repositories/QuestionRepository";
import {MockAnswerRepository} from "@/src/infrastructure/repositories/MockAnswerRepository";
import {MockCategoryRepository} from "@/src/infrastructure/repositories/MockCategoryRepository";
import {MockQuestionRepository} from "@/src/infrastructure/repositories/MockQuestionRepository";
import {CacheRepository} from "@/src/infrastructure/repositories/CacheRepository";

export function createFaqModule() : Module {
    const faqModule : Module = createModule()


    //Переписать
    if (process.env.NODE_ENV === "test") {
        faqModule.bind(DI_SYMBOLS.ICacheRepository)
            .toClass(CacheRepository, [
                DI_SYMBOLS.ICategoryRepository
            ])
    }else{
        faqModule.bind(DI_SYMBOLS.ICacheRepository)
            .toClass(CacheRepository, [
                DI_SYMBOLS.ICategoryRepository
            ])
    }

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

    if (process.env.NODE_ENV === "test") {
        faqModule.bind(DI_SYMBOLS.IQuestionRepository)
            .toClass(MockQuestionRepository)
    }
    else{
        faqModule.bind(DI_SYMBOLS.IQuestionRepository)
            .toClass(QuestionRepository, [
                DI_SYMBOLS.IMappingFAQService,
            ])
    }

    faqModule.bind(DI_SYMBOLS.IMappingFAQService)
        .toClass(MappingFAQService)

    return faqModule
}