import {Question} from "@/src/entities/models/question";
import {CategoryWithQuestions} from "@/src/entities/models/view-models";
import {ICategoryRepository} from "@/src/application/repositories/ICategoryRepository";


export const getAllController = (
        categoryService : ICategoryRepository
    )  => async () : Promise<CategoryWithQuestions[]> => {
            try{
                const all : CategoryWithQuestions[] = await categoryService.getAll();
                return all
            }catch(error){
                throw new Error("Что-то пошло не так");
            }
        }