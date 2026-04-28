import {CategoryWithQuestions, GroupWithCategories} from "@/src/entities/models/view-models";
import {Category} from "@/src/entities/models/category";

export interface ICategoryRepository {
    //Получение плоских данных категорий со всеми вопросами с ОТМЕЧЕННЫМИ ОТВЕТАМИ
    getAll() : Promise<CategoryWithQuestions[]>,
    //Добавление ПУСТОЙ КАТЕГОРИИ, title = НЕТ НАЗВАНИЯ, (или типо такого)
    addEmpty(group_id : number) : Promise<CategoryWithQuestions>,
    //Удаление категории из БД, автоматически зануляет для questions поле category_id
    delete(category_id : number) : Promise<boolean>,
    //Обновление title
    changeTitle(category : Category) : Promise<boolean>,
    getWithoutQuestions(group_id : number) : Promise<Category[]>,
    getAllOfGroup(group_id : number) : Promise<CategoryWithQuestions[]>,

}