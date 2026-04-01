import {Container, createContainer} from "@evyweb/ioctopus"

import { DI_RETURN_TYPES, DI_SYMBOLS} from "@/di/types";
import {createFaqModule} from "@/di/modules/faqs.module";
import {createCategoryModule} from "@/di/modules/categories.module";
import {createAnswerModule} from "@/di/modules/answers.module";
import {createQuestionModule} from "@/di/modules/questions.module";
import {createCacheModule} from "@/di/modules/cache.module";

const ApplicationContainer : Container = createContainer()

ApplicationContainer.load(Symbol('FaqModule'), createFaqModule())
ApplicationContainer.load(Symbol('CategoryModule'),createCategoryModule())
ApplicationContainer.load(Symbol('AnswerModule'), createAnswerModule())
ApplicationContainer.load(Symbol('QuestionModule'), createQuestionModule())
ApplicationContainer.load(Symbol('CacheModule'), createCacheModule())

export function getInjection<K extends keyof typeof DI_SYMBOLS>(
    symbol: K,
) : DI_RETURN_TYPES[K] {
    return ApplicationContainer.get(DI_SYMBOLS[symbol])
}