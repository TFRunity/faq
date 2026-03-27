import {QuestionWithLatestAnswer} from "@/src/entities/models/view-models";
import {IQuestionRepository} from "@/src/application/repositories/IQuestionRepository";

export type IQuestionUpdateQuestionController = ReturnType<typeof question_updateQuestionController>

export const question_updateQuestionController = (
    questionService : IQuestionRepository
) => async (question_id : number, question : string) : Promise<QuestionWithLatestAnswer> => {
    return await questionService.updateQuestion(question_id, question);
}