import {IFaqRepostiory} from "@/src/application/repositories/IFaqRepostiory";
//Сделать контроллеры


export const DI_SYMBOLS = {
    //Repositories
    IFaqRepository: Symbol.for('IFaqRepository'),


    //Controllers
    //IGetFaqController: Symbol.for('IGetFaqController'),
}


export interface DI_RETURN_TYPES {
    //Repositories
    IFaqRepository: IFaqRepostiory

    //Controllers
    //IGetFaqController: IGetFaqController
}