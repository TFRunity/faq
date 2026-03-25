import {IMappingFAQService} from "@/src/application/services/IMappingFAQService";
import {
    CategoryWithQuestions,
    QuestionWithAnswers,
    QuestionWithLatestAnswer,
    rawCategoryWithQuestionWithAnswer,
    rawQuestionWithAnswer
} from "@/src/entities/models/view-models";

export class MappingFAQService implements IMappingFAQService {
    convertRawQuestionWithAnswers(raw: rawQuestionWithAnswer[]): QuestionWithAnswers[] {
        const questionsWithRepeats : QuestionWithAnswers[] = raw.map(q => ({
            question : { ...q.questions },
            answers : []
        }))
        const uniqueQuestions : QuestionWithAnswers[] = [...new Map(questionsWithRepeats.map(q => [q.question.id, q])).values()];
        for (const q of uniqueQuestions) {
            for (const r of raw) {
                if (r.answers.question_id === q.question.id) {
                    q.answers!.push(r.answers);
                }
            }
        }
        return uniqueQuestions;
    }

    convertRawQuestionWithLatestAnswer(raw: rawQuestionWithAnswer[]): QuestionWithLatestAnswer[] {
        return raw.map(q => ({
            question : { ...q.questions },
            answer : { ...q.answers }
        }))
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