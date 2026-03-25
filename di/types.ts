import {IMappingFAQService} from "@/src/application/services/IMappingFAQService";
import {IAnswerRepository} from "@/src/application/repositories/IAnswerRepository";
import {ICategoryRepository} from "@/src/application/repositories/ICategoryRepository";
import {IQuestionRepository} from "@/src/application/repositories/IQuestionRepository";
import {IAddEmptyCategoryController} from "@/src/i-adapters/controllers/addEmptyCategoryController";
import {IDeleteCategoryController} from "@/src/i-adapters/controllers/deleteCategoryController";
import {IChangeTitleCategoryController} from "@/src/i-adapters/controllers/changeTitleCategoryController";
import {IGetAllCategoriesController} from "@/src/i-adapters/controllers/getAllCategoriesController";


export const DI_SYMBOLS = {
    //Repositories
    IAnswerRepository: Symbol.for("IAnswerRepository"),
    ICategoryRepository: Symbol.for("ICategoryRepository"),
    IQuestionRepository: Symbol.for("IQuestionRepository"),

    //Services
    IMappingFAQService: Symbol.for('IMappingFAQService'),

    //Controllers
    IGetAllCategoriesController: Symbol.for("IGetAllCategoriesController"),
    IAddEmptyCategoryController: Symbol.for("IAddEmptyCategoryController"),
    IDeleteCategoryController: Symbol.for("IDeleteCategoryController"),
    IChangeTitleCategoryController: Symbol.for("IChangeTitleCategoryController"),
}


export interface DI_RETURN_TYPES {
    //Repositories
    IAnswerRepository: IAnswerRepository;
    ICategoryRepository: ICategoryRepository;
    IQuestionRepository: IQuestionRepository;

    //Services
    IMappingFAQService : IMappingFAQService

    //Controllers
    IGetAllCategoriesController: IGetAllCategoriesController;
    IAddEmptyCategoryController: IAddEmptyCategoryController;
    IDeleteCategoryController: IDeleteCategoryController;
    IChangeTitleCategoryController: IChangeTitleCategoryController;
}