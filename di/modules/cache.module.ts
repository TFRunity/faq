import {createModule, Module} from "@evyweb/ioctopus";
import {DI_SYMBOLS} from "@/di/types";
import {category_Cached_getAllController} from "@/src/i-adapters/controllers/Category_Cached_getAllController";
import {
    question_Cached_getAllWithoutCategoryController
} from "@/src/i-adapters/controllers/Question_Cached_getAllWithoutCategoryController";
import {category_updateCache_Controller} from "@/src/i-adapters/controllers/Category_UpdateCache_Controller";
import {question_updateCache_Controller} from "@/src/i-adapters/controllers/Question_UpdateCache_Controller";
import {
    group_Cached_getWithCategoriesController
} from "@/src/i-adapters/controllers/Group_Cached_getWithCategoriesController";
import {group_Cached_getAllController} from "@/src/i-adapters/controllers/Group_Cached_getAllController";
import {group_UpdateCacheController} from "@/src/i-adapters/controllers/Group_UpdateCache_Controller";
import {
    group_UpdateCache_WithCategoriesController
} from "@/src/i-adapters/controllers/Group_UpdateCache_WithCategoriesController";


export function createCacheModule() : Module {
    const cacheModule : Module = createModule()

    cacheModule.bind(DI_SYMBOLS.ICategoryGetAllController)
        .toHigherOrderFunction(category_Cached_getAllController, [
            DI_SYMBOLS.ICategoryCacheRepository
        ]);
    cacheModule.bind(DI_SYMBOLS.ICategoryUpdateCacheController)
        .toHigherOrderFunction(category_updateCache_Controller, [
            DI_SYMBOLS.ICategoryCacheRepository
        ])

    cacheModule.bind(DI_SYMBOLS.IQuestionGetAllWithoutCategoryController)
        .toHigherOrderFunction(question_Cached_getAllWithoutCategoryController, [
            DI_SYMBOLS.IQuestionCacheRepository
        ]);
    cacheModule.bind(DI_SYMBOLS.IQuestionUpdateCacheController)
        .toHigherOrderFunction(question_updateCache_Controller, [
            DI_SYMBOLS.IQuestionCacheRepository
        ])

    cacheModule.bind(DI_SYMBOLS.IGroupCachedGetWithCategoriesController)
        .toHigherOrderFunction(group_Cached_getWithCategoriesController, [
            DI_SYMBOLS.IGroupCacheRepository
        ])
    cacheModule.bind(DI_SYMBOLS.IGroupCachedGetAllController)
        .toHigherOrderFunction(group_Cached_getAllController, [
            DI_SYMBOLS.IGroupCacheRepository
        ])
    cacheModule.bind(DI_SYMBOLS.IGroupUpdateCacheController)
        .toHigherOrderFunction(group_UpdateCacheController,[
            DI_SYMBOLS.IGroupCacheRepository
        ])
    cacheModule.bind(DI_SYMBOLS.IGroupUpdateCacheWithCategoriesController)
        .toHigherOrderFunction(group_UpdateCache_WithCategoriesController,[
            DI_SYMBOLS.IGroupCacheRepository
        ])

    return cacheModule
}