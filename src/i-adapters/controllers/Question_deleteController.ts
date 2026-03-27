import {IQuestionRepository} from "@/src/application/repositories/IQuestionRepository";

export type IQuestionDeleteController = ReturnType<typeof question_deleteController>

export const question_deleteController = (
    questionService : IQuestionRepository
) => async (question_id : number) : Promise<boolean> => {
    return await questionService.delete(question_id);
}