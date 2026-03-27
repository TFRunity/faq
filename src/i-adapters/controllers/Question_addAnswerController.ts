import {QuestionWithLatestAnswer} from "@/src/entities/models/view-models";
import {IQuestionRepository} from "@/src/application/repositories/IQuestionRepository";

export type IQuestionAddAnswerController = ReturnType<typeof question_addAnswerController>

export const question_addAnswerController = (
    questionService : IQuestionRepository
) => async (question_id : number, answer : string) : Promise<QuestionWithLatestAnswer> => {
    return await questionService.addAnswer(question_id, answer);
}