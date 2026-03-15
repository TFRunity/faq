import {IFaqRepository} from "@/src/application/repositories/IFaqRepository";
import {IGetFaqController} from "@/src/i-adapters/controllers/getFaqController";
import {IAddFaqController} from "@/src/i-adapters/controllers/addFaqController";
import {IDeleteFaqController} from "@/src/i-adapters/controllers/deleteFaqController";
import {IUpdateQuestionFaqController} from "@/src/i-adapters/controllers/updateQuestionFaqController";
import {IUpdateAnswerFaqController} from "@/src/i-adapters/controllers/updateAnswerFaqController";


export const DI_SYMBOLS = {
    //Repositories
    IFaqRepository: Symbol.for('IFaqRepository'),


    //Controllers
    IGetFaqController: Symbol.for('IGetFaqController'),
    IAddFaqController: Symbol.for('IAddFaqController'),
    IDeleteFaqController: Symbol.for('IDeleteFaqController'),
    IUpdateQuestionFaqController: Symbol.for('IUpdateQuestionFaqController'),
    IUpdateAnswerFaqController: Symbol.for('IUpdateAnswerFaqController'),

}


export interface DI_RETURN_TYPES {
    //Repositories
    IFaqRepository: IFaqRepository

    //Controllers
    IGetFaqController: IGetFaqController
    IAddFaqController: IAddFaqController
    IDeleteFaqController: IDeleteFaqController
    IUpdateQuestionFaqController: IUpdateQuestionFaqController
    IUpdateAnswerFaqController: IUpdateAnswerFaqController
}