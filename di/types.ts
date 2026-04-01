import {IMappingFAQService} from "@/src/application/services/IMappingFAQService";
import {IAnswerRepository} from "@/src/application/repositories/IAnswerRepository";
import {ICategoryRepository} from "@/src/application/repositories/ICategoryRepository";
import {IQuestionRepository} from "@/src/application/repositories/IQuestionRepository";
import {ICategoryGetAllController} from "@/src/i-adapters/controllers/Category_Cached_getAllController";
import {ICategoryAddEmptyController} from "@/src/i-adapters/controllers/Category_addEmptyController";
import {ICategoryDeleteController} from "@/src/i-adapters/controllers/Category_deleteController";
import {ICategoryChangeTitleController} from "@/src/i-adapters/controllers/Category_changeTitleController";
import {IAnswerDeleteForceController} from "@/src/i-adapters/controllers/Answer_deleteForceController";
import {IQuestionAddAnswerController} from "@/src/i-adapters/controllers/Question_addAnswerController";
import {IQuestionDeleteController} from "@/src/i-adapters/controllers/Question_deleteController";
import {IQuestionAddController} from "@/src/i-adapters/controllers/Question_addController";
import {IQuestionAddRelWithCategoriesController} from "@/src/i-adapters/controllers/Question_addRelWithCategoriesController";
import {IQuestionAddWithAnswerController} from "@/src/i-adapters/controllers/Question_addWithAnswerController";
import {
    IQuestionChangeAnswerToPreviousController
} from "@/src/i-adapters/controllers/Question_changeAnswerToPreviousController";
import {
    IQuestionDeleteRelWithCategoriesController
} from "@/src/i-adapters/controllers/Question_deleteRelWithCategoriesController";
import {
    IQuestionGetWithHistoryOfAnswersController
} from "@/src/i-adapters/controllers/Question_getWithHistoryOfAnswersController";
import {IQuestionUpdateQuestionController} from "@/src/i-adapters/controllers/Question_updateQuestionController";
import {
    IQuestionGetAllWithoutCategoryController
} from "@/src/i-adapters/controllers/Question_getAllWithoutCategoryController";
import {ICacheRepository} from "@/src/application/repositories/ICacheRepository";

export const DI_SYMBOLS = {
    //Repositories
    IAnswerRepository: Symbol.for("IAnswerRepository"),
    ICategoryRepository: Symbol.for("ICategoryRepository"),
    IQuestionRepository: Symbol.for("IQuestionRepository"),
    ICacheRepository: Symbol.for("ICacheRepository"),


    //Services
    IMappingFAQService: Symbol.for('IMappingFAQService'),

    //Controllers
    ICategoryGetAllController: Symbol.for("ICategoryGetAllController"),
    ICategoryAddEmptyController: Symbol.for("ICategoryAddEmptyController"),
    ICategoryDeleteController: Symbol.for("ICategoryDeleteController"),
    ICategoryChangeTitleController: Symbol.for("ICategoryChangeTitleController"),

    IAnswerDeleteForceController: Symbol.for("IAnswerDeleteForceController"),

    IQuestionAddAnswerController: Symbol.for("IQuestionAddAnswerController"),
    IQuestionAddController : Symbol.for("IQuestionAddController"),
    IQuestionAddRelWithCategoriesController : Symbol.for("IQuestionAddRelWithCategoriesController"),
    IQuestionAddWithAnswerController : Symbol.for("IQuestionAddWithAnswerController"),
    IQuestionChangeAnswerToPreviousController : Symbol.for("IQuestionChangeAnswerToPreviousController"),
    IQuestionDeleteController : Symbol.for("IQuestionDeleteController"),
    IQuestionDeleteRelWithCategoriesController : Symbol.for("IQuestionDeleteRelWithCategoriesController"),
    IQuestionGetAllWithoutCategoryController : Symbol.for("IQuestionGetAllWithoutCategoryController"),
    IQuestionGetWithHistoryOfAnswersController : Symbol.for("IQuestionGetWithHistoryOfAnswersController"),
    IQuestionUpdateQuestionController : Symbol.for("IQuestionUpdateQuestionController"),
}


export interface DI_RETURN_TYPES {
    //Repositories
    IAnswerRepository: IAnswerRepository;
    ICategoryRepository: ICategoryRepository;
    IQuestionRepository: IQuestionRepository;
    ICacheRepository: ICacheRepository;

    //Services
    IMappingFAQService : IMappingFAQService

    //Controllers
    ICategoryGetAllController: ICategoryGetAllController;
    ICategoryAddEmptyController : ICategoryAddEmptyController;
    ICategoryDeleteController : ICategoryDeleteController;
    ICategoryChangeTitleController : ICategoryChangeTitleController;

    IAnswerDeleteForceController : IAnswerDeleteForceController;

    IQuestionAddAnswerController : IQuestionAddAnswerController;
    IQuestionAddController : IQuestionAddController;
    IQuestionAddRelWithCategoriesController : IQuestionAddRelWithCategoriesController;
    IQuestionAddWithAnswerController : IQuestionAddWithAnswerController;
    IQuestionChangeAnswerToPreviousController : IQuestionChangeAnswerToPreviousController;
    IQuestionDeleteController : IQuestionDeleteController;
    IQuestionDeleteRelWithCategoriesController : IQuestionDeleteRelWithCategoriesController;
    IQuestionGetAllWithoutCategoryController : IQuestionGetAllWithoutCategoryController;
    IQuestionGetWithHistoryOfAnswersController : IQuestionGetWithHistoryOfAnswersController;
    IQuestionUpdateQuestionController : IQuestionUpdateQuestionController;
}