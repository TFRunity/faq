import {createModule, Module} from "@evyweb/ioctopus";
import {DI_SYMBOLS} from "@/di/types";
import {category_getAllController} from "@/src/i-adapters/controllers/Category_getAllController";
import {category_addEmptyController} from "@/src/i-adapters/controllers/Category_addEmptyController";
import {category_deleteController} from "@/src/i-adapters/controllers/Category_deleteController";
import {category_changeTitleController} from "@/src/i-adapters/controllers/Category_changeTitleController";

export function createCategoryModule() : Module {
    const categoryModule = createModule();

    categoryModule.bind(DI_SYMBOLS.ICategoryGetAllController)
        .toHigherOrderFunction(category_getAllController, [
            DI_SYMBOLS.ICategoryRepository
        ]);
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

    return categoryModule;
}