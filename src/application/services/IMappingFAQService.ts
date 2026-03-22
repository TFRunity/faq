import {
    CategoryWithQuestions,
    QuestionWithAnswers, QuestionWithLatestAnswer,
    rawCategoryWithQuestions,
    rawQuestionWithAnswers, rawQuestionWithLatestAnswer
} from "@/src/entities/models/view-models";

//Везде массив, но это не играет важной роли, если нужно только 1 , значит вытащим только 1 (Позже

export interface IMappingFAQService {
    convertRawCategoriesWithQuestions(raw : rawCategoryWithQuestions[]) : Promise<CategoryWithQuestions[]>;
    convertRawQuestionWithAnswers(raw : rawQuestionWithAnswers[]) : Promise<QuestionWithAnswers[]>;
    convertRawQuestionWithLatestAnswer(raw : rawQuestionWithLatestAnswer[]) : Promise<QuestionWithLatestAnswer[]>;
}