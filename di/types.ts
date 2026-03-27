import {IMappingFAQService} from "@/src/application/services/IMappingFAQService";
import {IAnswerRepository} from "@/src/application/repositories/IAnswerRepository";
import {ICategoryRepository} from "@/src/application/repositories/ICategoryRepository";
import {IQuestionRepository} from "@/src/application/repositories/IQuestionRepository";
import {ICategoryGetAllController} from "@/src/i-adapters/controllers/Category_getAllController";
import {ICategoryAddEmptyController} from "@/src/i-adapters/controllers/Category_addEmptyController";
import {ICategoryDeleteController} from "@/src/i-adapters/controllers/Category_deleteController";
import {ICategoryChangeTitleController} from "@/src/i-adapters/controllers/Category_changeTitleController";
import {IAnswerDeleteForceController} from "@/src/i-adapters/controllers/Answer_deleteForceController";

export const DI_SYMBOLS = {
    //Repositories
    IAnswerRepository: Symbol.for("IAnswerRepository"),
    ICategoryRepository: Symbol.for("ICategoryRepository"),
    IQuestionRepository: Symbol.for("IQuestionRepository"),

    //Services
    IMappingFAQService: Symbol.for('IMappingFAQService'),

    //Controllers
    ICategoryGetAllController: Symbol.for("ICategoryGetAllController"),
    ICategoryAddEmptyController: Symbol.for("ICategoryAddEmptyController"),
    ICategoryDeleteController: Symbol.for("ICategoryDeleteController"),
    ICategoryChangeTitleController: Symbol.for("ICategoryChangeTitleController"),
    IAnswerDeleteForceController: Symbol.for("IAnswerDeleteForceController"),
}


export interface DI_RETURN_TYPES {
    //Repositories
    IAnswerRepository: IAnswerRepository;
    ICategoryRepository: ICategoryRepository;
    IQuestionRepository: IQuestionRepository;

    //Services
    IMappingFAQService : IMappingFAQService

    //Controllers
    ICategoryGetAllController: ICategoryGetAllController;
    ICategoryAddEmptyController : ICategoryAddEmptyController;
    ICategoryDeleteController : ICategoryDeleteController;
    ICategoryChangeTitleController : ICategoryChangeTitleController;
    IAnswerDeleteForceController : IAnswerDeleteForceController;
}