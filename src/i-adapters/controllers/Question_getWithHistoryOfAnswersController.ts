import {QuestionWithAnswers} from "@/src/entities/models/view-models";
import {IQuestionRepository} from "@/src/application/repositories/IQuestionRepository";

export type IQuestionGetWithHistoryOfAnswersController = ReturnType<typeof question_getWithHistoryOfAnswersController>

export const question_getWithHistoryOfAnswersController = (
    questionService : IQuestionRepository
) => async (question_id : number) : Promise<QuestionWithAnswers> => {
    return await questionService.getWithHistoryOfAnswers(question_id);
}