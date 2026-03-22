import {ICategoryRepository} from "@/src/application/repositories/ICategoryRepository";
import {CategoryWithQuestions, rawCategoryWithQuestions} from "@/src/entities/models/view-models";
import {Category} from "@/src/entities/models/category";
import {answers, InsertCategory, questions} from "@/drizzle/schema";
import { db } from "@/drizzle/index"
import {Question} from "@/src/entities/models/question";
import {IMappingFAQService} from "@/src/application/services/IMappingFAQService";
import {eq} from "drizzle-orm";

export class CategoryRepository implements ICategoryRepository {

    constructor(
        private readonly mappingService : IMappingFAQService
    ) {}

    addClean(): Promise<CategoryWithQuestions> {
        throw new Error("Method not implemented.");
    }

    changeName(category: Category): Promise<boolean> {
        return Promise.resolve(false);
    }

    delete(category_id: number): Promise<boolean> {
        return Promise.resolve(false);
    }

    async getAll(): Promise<CategoryWithQuestions[]> {
        try{
            const raw : rawCategoryWithQuestions[] = await db!.query.categories.findMany({
                with : {
                    questions : {
                        with : {
                            answers : {
                                where : eq(questions.answer_id, answers.id),
                            }
                        }
                    }
                }
            });
            return this.mappingService.convertRawCategoriesWithQuestions(raw)
        }
        catch(error){
            throw new Error("Не получилось подключиться к БД");
        }
    }


}