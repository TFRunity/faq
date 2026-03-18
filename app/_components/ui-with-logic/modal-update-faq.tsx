//модальное окно для обновления faq, делать через createportal
/**
 *
 * @remarks
 * Модальное окно для карандашика
 *
 * @returns
 * Компонент
 *
 * @param faq = Faq для обработки данных
 * Вызывает 2 метода в зависимости от того, что именно было изменено. Если и вопрос и ответ, значит меняются оба, вызывается 2 метода.
 *
 * Примерная структура:
 *
 * <div>
 *     
 * </div>
 *
 */
import {Faq} from '@/app/_actions/faqActions'

export interface UpdateFaqProps {
    faq : Faq
}

export default function ModalUpdateFaq({faq} : UpdateFaqProps) {

    return (
        <div>

        </div>
    )
}