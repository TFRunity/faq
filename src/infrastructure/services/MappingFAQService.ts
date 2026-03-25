import {IMappingFAQService} from "@/src/application/services/IMappingFAQService";
import {
    CategoryWithQuestions,
    QuestionWithAnswers,
    QuestionWithLatestAnswer,
    rawCategoryWithQuestionWithAnswer,
    rawQuestionWithAnswer
} from "@/src/entities/models/view-models";
import {Category} from "@/app/_actions/faq-actions";


export class MappingFAQService implements IMappingFAQService {
    convertRawQuestionWithAnswers(raw: rawQuestionWithAnswer[]): Promise<QuestionWithAnswers[]> {
        throw new Error("Method not implemented.");
    }

    convertRawQuestionWithLatestAnswer(raw: rawQuestionWithAnswer[]): Promise<QuestionWithLatestAnswer[]> {
        throw new Error("Method not implemented.");
    }

    convertRawCategoriesWithQuestions(raw: rawCategoryWithQuestionWithAnswer[]): CategoryWithQuestions[] {
        const categoriesWithRepeats : CategoryWithQuestions[] = raw.map(c => ({
            category : { ...c.categories },
            questions : []
        }))
        const uniqueCategories : CategoryWithQuestions[] = [...new Map(categoriesWithRepeats.map(c => [c.category.id, c])).values()]
        for (const c of uniqueCategories) {
            for (const r of raw){
                if (r.questions.category_id === c.category.id ) {
                    c.questions!.push({
                        question : { ...r.questions },
                        answer : { ...r.answers }}
                    )
                }
            }
        }
        return uniqueCategories;
    }



}