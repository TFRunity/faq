import {createModule, Module} from "@evyweb/ioctopus";
import {DI_SYMBOLS} from "@/di/types";
import {getAllCategoriesController} from "@/src/i-adapters/controllers/getAllCategoriesController";
import {addEmptyCategoryController} from "@/src/i-adapters/controllers/addEmptyCategoryController";
import {deleteCategoryController} from "@/src/i-adapters/controllers/deleteCategoryController";
import {changeTitleCategoryController} from "@/src/i-adapters/controllers/changeTitleCategoryController";

export function createCategoryModule() : Module {
    const categoryModule = createModule();

    categoryModule.bind(DI_SYMBOLS.IGetAllCategoriesController)
        .toHigherOrderFunction(getAllCategoriesController, [
            DI_SYMBOLS.ICategoryRepository
        ]);
    categoryModule.bind(DI_SYMBOLS.IAddEmptyCategoryController)
        .toHigherOrderFunction(addEmptyCategoryController, [
            DI_SYMBOLS.ICategoryRepository
        ]);
    categoryModule.bind(DI_SYMBOLS.IDeleteCategoryController)
        .toHigherOrderFunction(deleteCategoryController, [
            DI_SYMBOLS.ICategoryRepository
        ]);
    categoryModule.bind(DI_SYMBOLS.IChangeTitleCategoryController)
        .toHigherOrderFunction(changeTitleCategoryController, [
            DI_SYMBOLS.ICategoryRepository
        ]);

    return categoryModule;
}