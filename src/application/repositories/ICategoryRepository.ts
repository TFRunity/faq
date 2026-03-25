import {CategoryWithQuestions} from "@/src/entities/models/view-models";
import {Category} from "@/src/entities/models/category";

export interface ICategoryRepository {
    getAll() : Promise<CategoryWithQuestions[]>, //Получение плоских данных категорий со всеми вопросами с ОТМЕЧЕННЫМИ ОТВЕТАМИ
    addEmpty() : Promise<CategoryWithQuestions>, //Добавление ПУСТОЙ КАТЕГОРИИ, title = НЕТ НАЗВАНИЯ, (или типо такого)
    delete(category_id: number) : Promise<boolean>, //Удаление категории из БД, автоматически зануляет для questions поле category_id
    changeTitle(category : Category) : Promise<boolean>, //Обновление title
}