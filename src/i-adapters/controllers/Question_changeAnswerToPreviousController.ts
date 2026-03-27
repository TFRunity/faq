import {IQuestionRepository} from "@/src/application/repositories/IQuestionRepository";
import {QuestionWithLatestAnswer} from "@/src/entities/models/view-models";

export type IQuestionChangeAnswerToPreviousController = ReturnType<typeof question_changeAnswerToPreviousController>

export const question_changeAnswerToPreviousController = (
    questionService : IQuestionRepository
) => async (question_id : number, previous_answer_id : number) : Promise<QuestionWithLatestAnswer> => {
    return await questionService.changeAnswerToPrevious(question_id, previous_answer_id);
}