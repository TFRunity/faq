import {
    CategoryWithQuestions,
    QuestionWithAnswers, QuestionWithLatestAnswer, rawCategoryWithQuestionWithAnswer, rawQuestionWithAnswer
} from "@/src/entities/models/view-models";

//Везде массив, но это не играет важной роли, если нужно только 1 , значит вытащим только 1 (Позже

export interface IMappingFAQService {
    convertRawCategoriesWithQuestions(raw : rawCategoryWithQuestionWithAnswer[]) : CategoryWithQuestions[];
    convertRawQuestionWithAnswers(raw : rawQuestionWithAnswer[]) : QuestionWithAnswers[];
    convertRawQuestionWithLatestAnswer(raw : rawQuestionWithAnswer[]) : QuestionWithLatestAnswer[];
}