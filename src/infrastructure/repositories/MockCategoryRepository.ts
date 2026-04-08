import {ICategoryRepository} from "@/src/application/repositories/ICategoryRepository";
import { Category } from "@/src/entities/models/category";
import { CategoryWithQuestions } from "@/src/entities/models/view-models";

export class MockCategoryRepository implements ICategoryRepository {
    getAll(): Promise<CategoryWithQuestions[]> {
        return Promise.resolve([{category : {id : 1, title : '1'}, questions : []},{category: {id : 2, title : null}, questions: []}])
    }

    addEmpty(): Promise<CategoryWithQuestions> {
        return Promise.resolve({category : {id : 1, title : 'Новая категория'}, questions : []})
    }

    delete(category_id: number): Promise<boolean> {
        return Promise.resolve(category_id > 0)
    }

    changeTitle(category: Category): Promise<boolean> {
        return Promise.resolve(category.id > 0)
    }

    getWithoutQuestions(): Promise<Category[]> {
        return Promise.resolve([])
    }

}