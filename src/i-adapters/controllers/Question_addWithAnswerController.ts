import {IQuestionRepository} from "@/src/application/repositories/IQuestionRepository";
import {QuestionWithLatestAnswer} from "@/src/entities/models/view-models";

export type IQuestionAddWithAnswerController = ReturnType<typeof question_addWithAnswerController>

export const question_addWithAnswerController = (
    questionService : IQuestionRepository
) => async (question : string, answer : string) : Promise<QuestionWithLatestAnswer> => {
    return await questionService.addWithAnswer(question, answer);
}