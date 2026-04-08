import {createModule, Module} from "@evyweb/ioctopus";
import {DI_SYMBOLS} from "@/di/types";
import {category_addEmptyController} from "@/src/i-adapters/controllers/Category_addEmptyController";
import {category_deleteController} from "@/src/i-adapters/controllers/Category_deleteController";
import {category_changeTitleController} from "@/src/i-adapters/controllers/Category_changeTitleController";
import {
    category_getWithoutQuestionsController,
} from "@/src/i-adapters/controllers/Category_getWithoutQuestionsController";

export function createCategoryModule() : Module {
    const categoryModule = createModule();

    categoryModule.bind(DI_SYMBOLS.ICategoryAddEmptyController)
        .toHigherOrderFunction(category_addEmptyController, [
            DI_SYMBOLS.ICategoryRepository
        ]);
    categoryModule.bind(DI_SYMBOLS.ICategoryDeleteController)
        .toHigherOrderFunction(category_deleteController, [
            DI_SYMBOLS.ICategoryRepository
        ]);
    categoryModule.bind(DI_SYMBOLS.ICategoryChangeTitleController)
        .toHigherOrderFunction(category_changeTitleController, [
            DI_SYMBOLS.ICategoryRepository
        ]);
    categoryModule.bind(DI_SYMBOLS.ICategoryGetWithoutQuestionsController)
        .toHigherOrderFunction(category_getWithoutQuestionsController, [
            DI_SYMBOLS.ICategoryRepository
        ])

    return categoryModule;
}