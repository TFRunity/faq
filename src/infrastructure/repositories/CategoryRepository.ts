import {ICategoryRepository} from "@/src/application/repositories/ICategoryRepository";
import {CategoryWithQuestions, rawCategoryWithQuestionWithAnswer} from "@/src/entities/models/view-models";
import {Category} from "@/src/entities/models/category";
import {answers, categories, questions} from "@/drizzle/schema";
import {db} from "@/drizzle/index"
import {IMappingFAQService} from "@/src/application/services/IMappingFAQService";
import {eq} from "drizzle-orm";

export class CategoryRepository implements ICategoryRepository {

    constructor(
        private readonly mappingService : IMappingFAQService
    ) {}

    addEmpty(): Promise<CategoryWithQuestions> {
        throw new Error("Method not implemented.");
    }

    changeTitle(category: Category): Promise<boolean> {
        return Promise.resolve(false);
    }

    delete(category_id: number): Promise<boolean> {
        return Promise.resolve(false);
    }

    async getAll() : Promise<CategoryWithQuestions[]> {
            const raw : rawCategoryWithQuestionWithAnswer[]  = await db!.select()
                .from(categories)
                .innerJoin(questions, on => eq(categories.id, questions.category_id))
                .innerJoin(answers, on => eq(answers.id, questions.answer_id))
            const mapped : CategoryWithQuestions[] = this.mappingService.convertRawCategoriesWithQuestions(raw);
            return mapped
    }


}