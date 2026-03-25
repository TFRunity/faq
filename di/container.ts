import {Container, createContainer} from "@evyweb/ioctopus"

import { DI_RETURN_TYPES, DI_SYMBOLS} from "@/di/types";
import {createFaqModule} from "@/di/modules/faqs.module";
import {createCategoryModule} from "@/di/modules/categories.module";

const ApplicationContainer : Container = createContainer()

ApplicationContainer.load(Symbol('FaqModule'), createFaqModule())
ApplicationContainer.load(Symbol('CategoryModule'),createCategoryModule())

export function getInjection<K extends keyof typeof DI_SYMBOLS>(
    symbol: K,
) : DI_RETURN_TYPES[K] {
    return ApplicationContainer.get(DI_SYMBOLS[symbol])
}