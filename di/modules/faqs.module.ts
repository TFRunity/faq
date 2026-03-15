import {createModule, Module} from "@evyweb/ioctopus";
import { FaqRepository } from "@/src/infrastructure/repositories/FaqRepository";
import { DI_SYMBOLS } from "@/di/types";

export function createFaqModule() : Module {
    const faqModule : Module = createModule()

    faqModule.bind(DI_SYMBOLS.IFaqRepository)
        .toClass(FaqRepository)

    return faqModule
}