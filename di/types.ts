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
} from "@/src/i-adapters/controllers/Question_Cached_getAllWithoutCategoryController";
import {ICategoryCacheRepository} from "@/src/application/repositories/ICategoryCacheRepository";
import {
    ICategoryGetWithoutQuestionsController
} from "@/src/i-adapters/controllers/Category_getWithoutQuestionsController";
import {IQuestionCacheRepository} from "@/src/application/repositories/IQuestionCacheRepository";
import {ICategoryUpdateCacheController} from "@/src/i-adapters/controllers/Category_UpdateCache_Controller";
import {IQuestionUpdateCacheController} from "@/src/i-adapters/controllers/Question_UpdateCache_Controller";
import {IGroupRepository} from "@/src/application/repositories/IGroupRepository";
import {IGroupCacheRepository} from "@/src/application/repositories/IGroupCacheRepository";
import {ISmartSearchRepository} from "@/src/application/repositories/ISmartSearchRepository";
import {IGroupAddController} from "@/src/i-adapters/controllers/Group_addController";
import {IGroupCachedGetAllController} from "@/src/i-adapters/controllers/Group_Cached_getAllController";
import {IGroupGetWithCategoriesController} from "@/src/i-adapters/controllers/Group_Cached_getWithCategoriesController";
import {IGroupChangeTitleController} from "@/src/i-adapters/controllers/Group_changeTitleController";
import {IGroupDeleteController} from "@/src/i-adapters/controllers/Group_deleteController";
import {IGroupUpdateCacheController} from "@/src/i-adapters/controllers/Group_UpdateCache_Controller";
import {
    IGroupUpdateCacheWithCategoriesController
} from "@/src/i-adapters/controllers/Group_UpdateCache_WithCategoriesController";

export const DI_SYMBOLS = {
    //Repositories
    IAnswerRepository: Symbol.for("IAnswerRepository"),
    ICategoryRepository: Symbol.for("ICategoryRepository"),
    IQuestionRepository: Symbol.for("IQuestionRepository"),
    IGroupRepository: Symbol.for("IGroupRepository"),
    ICategoryCacheRepository: Symbol.for("ICategoryCacheRepository"),
    IQuestionCacheRepository: Symbol.for("IQuestionCacheRepository"),
    IGroupCacheRepository: Symbol.for("IGroupCacheRepository"),
    ISmartSearchRepository: Symbol.for("ISmartSearchRepository"),

    //Services
    IMappingFAQService: Symbol.for('IMappingFAQService'),

    //Controllers
    ICategoryGetAllController: Symbol.for("ICategoryGetAllController"),
    ICategoryAddEmptyController: Symbol.for("ICategoryAddEmptyController"),
    ICategoryDeleteController: Symbol.for("ICategoryDeleteController"),
    ICategoryChangeTitleController: Symbol.for("ICategoryChangeTitleController"),
    ICategoryGetWithoutQuestionsController : Symbol.for("ICategoryGetWithoutQuestionsController"),
    ICategoryUpdateCacheController : Symbol.for("ICategoryUpdateCacheController"),

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
    IQuestionUpdateCacheController : Symbol.for("IQuestionUpdateCacheController"),

    IGroupAddController : Symbol.for("IGroupAddController"),
    IGroupCachedGetAllController : Symbol.for("IGroupCachedGetAllController"),
    IGroupCachedGetWithCategoriesController : Symbol.for("IGroupCachedGetWithCategoriesController"),
    IGroupChangeTitleController : Symbol.for("IGroupChangeTitleController"),
    IGroupDeleteController : Symbol.for("IGroupDeleteController"),
    IGroupUpdateCacheController : Symbol.for("IGroupUpdateCacheController"),
    IGroupUpdateCacheWithCategoriesController : Symbol.for("IGroupUpdateCacheWithCategoriesController"),
}


export interface DI_RETURN_TYPES {
    //Repositories
    IAnswerRepository: IAnswerRepository;
    ICategoryRepository: ICategoryRepository;
    IQuestionRepository: IQuestionRepository;
    IGroupRepository: IGroupRepository;
    ICategoryCacheRepository: ICategoryCacheRepository;
    IQuestionCacheRepository: IQuestionCacheRepository;
    IGroupCacheRepository: IGroupCacheRepository;
    ISmartSearchRepository: ISmartSearchRepository;

    //Services
    IMappingFAQService : IMappingFAQService

    //Controllers
    ICategoryGetAllController: ICategoryGetAllController;
    ICategoryAddEmptyController : ICategoryAddEmptyController;
    ICategoryDeleteController : ICategoryDeleteController;
    ICategoryChangeTitleController : ICategoryChangeTitleController;
    ICategoryGetWithoutQuestionsController : ICategoryGetWithoutQuestionsController;
    ICategoryUpdateCacheController : ICategoryUpdateCacheController;

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
    IQuestionUpdateCacheController : IQuestionUpdateCacheController;

    IGroupAddController : IGroupAddController;
    IGroupCachedGetAllController : IGroupCachedGetAllController;
    IGroupCachedGetWithCategoriesController : IGroupGetWithCategoriesController;
    IGroupChangeTitleController : IGroupChangeTitleController;
    IGroupDeleteController : IGroupDeleteController;
    IGroupUpdateCacheController : IGroupUpdateCacheController;
    IGroupUpdateCacheWithCategoriesController : IGroupUpdateCacheWithCategoriesController;
}