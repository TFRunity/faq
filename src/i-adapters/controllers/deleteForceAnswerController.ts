import {IAnswerRepository} from "@/src/application/repositories/IAnswerRepository";

export type IDeleteForceAnswerController = ReturnType<typeof deleteForceAnswerController>;

export const deleteForceAnswerController = (
            answerService : IAnswerRepository
    ) => async (answer_id : number) : Promise<boolean> => {
            return await answerService.forceDelete(answer_id);
        }