import {ICategoryRepository} from "@/src/application/repositories/ICategoryRepository";
import {CategoryWithQuestions, rawCategoryWithQuestionWithAnswer} from "@/src/entities/models/view-models";
import {Category} from "@/src/entities/models/category";
import {answers, categories, questions} from "@/drizzle/schema";
import {db} from "@/drizzle"
import {IMappingFAQService} from "@/src/application/services/IMappingFAQService";
import {eq} from "drizzle-orm";

export class CategoryRepository implements ICategoryRepository {

    constructor(
        private readonly mappingService : IMappingFAQService
    ) {}

    async addEmpty() : Promise<CategoryWithQuestions> {
        const category : Category[] = await db!.insert(categories).values({title : "Новая категория"}).returning();
        return {category : category![0], questions : []}
    }

    async changeTitle(category: Category) : Promise<boolean> {
        const c : Category[] = await db!.update(categories).set({title : category.title}).where(eq(categories.id, category.id)).returning()
        return c.length > 0;
    }

    async delete(category_id: number) : Promise<boolean> {
        const c : Category[] = await db!.delete(categories).where(eq(categories.id,category_id)).returning()
        return c.length > 0;
    }

    async getAll() : Promise<CategoryWithQuestions[]> {
        const raw : rawCategoryWithQuestionWithAnswer[]  = await db!.select()
            .from(categories)
            .innerJoin(questions, on => eq(categories.id, questions.category_id))
            .innerJoin(answers, on => eq(answers.id, questions.answer_id))
        return this.mappingService.convertRawCategoriesWithQuestions(raw);
    }
}