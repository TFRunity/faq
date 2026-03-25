import {Question} from "@/src/entities/models/question";
import {CategoryWithQuestions} from "@/src/entities/models/view-models";
import {ICategoryRepository} from "@/src/application/repositories/ICategoryRepository";

export type IGetAllController = ReturnType<typeof getAllController>;

export const getAllController = (
        categoryService : ICategoryRepository
    )  => async () : Promise<CategoryWithQuestions[]> => {
                const all : CategoryWithQuestions[] = await categoryService.getAll();
                return all
        }