import {IMappingFAQService} from "@/src/application/services/IMappingFAQService";
import { rawCategoryWithQuestions, CategoryWithQuestions, rawQuestionWithAnswers, QuestionWithAnswers, rawQuestionWithLatestAnswer, QuestionWithLatestAnswer } from "@/src/entities/models/view-models";


export class MappingFAQService implements IMappingFAQService {
    convertRawCategoriesWithQuestions(raw: rawCategoryWithQuestions[]): Promise<CategoryWithQuestions[]> {
        //Процесс преобразования, допишу как приду
    }
    convertRawQuestionWithAnswers(raw: rawQuestionWithAnswers[]): Promise<QuestionWithAnswers[]> {
        throw new Error("Method not implemented.");
    }
    convertRawQuestionWithLatestAnswer(raw: rawQuestionWithLatestAnswer[]): Promise<QuestionWithLatestAnswer[]> {
        throw new Error("Method not implemented.");
    }

}