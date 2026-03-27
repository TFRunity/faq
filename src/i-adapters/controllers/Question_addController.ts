import {IQuestionRepository} from "@/src/application/repositories/IQuestionRepository";
import {QuestionWithLatestAnswer} from "@/src/entities/models/view-models";

export type IQuestionAddController = ReturnType<typeof question_addController>

export const question_addController = (
    questionService : IQuestionRepository
) => async (question : string) : Promise<QuestionWithLatestAnswer> => {
    return await questionService.add(question);
}