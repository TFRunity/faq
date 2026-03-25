import {IMappingFAQService} from "@/src/application/services/IMappingFAQService";
import {IAnswerRepository} from "@/src/application/repositories/IAnswerRepository";
import {ICategoryRepository} from "@/src/application/repositories/ICategoryRepository";
import {IQuestionRepository} from "@/src/application/repositories/IQuestionRepository";
import {IGetAllController} from "@/src/i-adapters/controllers/getAllController";


export const DI_SYMBOLS = {
    //Repositories
    IAnswerRepository: Symbol.for("IAnswerRepository"),
    ICategoryRepository: Symbol.for("ICategoryRepository"),
    IQuestionRepository: Symbol.for("IQuestionRepository"),

    //Services
    IMappingFAQService: Symbol.for('IMappingFAQService'),

    //Controllers
    IGetAllController: Symbol.for("IGetAllController"),

}


export interface DI_RETURN_TYPES {
    //Repositories
    IAnswerRepository: IAnswerRepository;
    ICategoryRepository: ICategoryRepository;
    IQuestionRepository: IQuestionRepository;

    //Services
    IMappingFAQService : IMappingFAQService

    //Controllers
    IGetAllController: IGetAllController;

}