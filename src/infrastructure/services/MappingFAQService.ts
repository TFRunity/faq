import {IMappingFAQService} from "@/src/application/services/IMappingFAQService";
import { rawCategoryWithQuestions, CategoryWithQuestions, rawQuestionWithAnswers, QuestionWithAnswers, rawQuestionWithLatestAnswer, QuestionWithLatestAnswer } from "@/src/entities/models/view-models";


export class MappingFAQService implements IMappingFAQService {
    convertRawCategoriesWithQuestions(raw: rawCategoryWithQuestions[]): CategoryWithQuestions[] {
        const categories : CategoryWithQuestions[] = raw.map(c => ({
            category : {id : c.id, title : c.title},
            questions : c.questions!.map(j => ({
                question : c.questions![0],
                answers : j.answers!,
            })),
        }))
        return categories
    }
    convertRawQuestionWithAnswers(raw: rawQuestionWithAnswers[]): Promise<QuestionWithAnswers[]> {
        throw new Error("Method not implemented.");
    }
    convertRawQuestionWithLatestAnswer(raw: rawQuestionWithLatestAnswer[]): Promise<QuestionWithLatestAnswer[]> {
        throw new Error("Method not implemented.");
    }

}