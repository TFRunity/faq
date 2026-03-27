import {IAnswerRepository} from "@/src/application/repositories/IAnswerRepository";

export type IAnswerDeleteForceController = ReturnType<typeof answer_deleteForceController>;

export const answer_deleteForceController = (
            answerService : IAnswerRepository
    ) => async (answer_id : number) : Promise<boolean> => {
            return await answerService.forceDelete(answer_id);
        }