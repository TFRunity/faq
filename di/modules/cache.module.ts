import {createModule, Module} from "@evyweb/ioctopus";
import {DI_SYMBOLS} from "@/di/types";
import {category_Cached_getAllController} from "@/src/i-adapters/controllers/Category_Cached_getAllController";


export function createCacheModule() : Module {
    const cacheModule : Module = createModule()

    cacheModule.bind(DI_SYMBOLS.ICategoryGetAllController)
        .toHigherOrderFunction(category_Cached_getAllController, [
            DI_SYMBOLS.ICacheRepository
        ]);

    return cacheModule
}