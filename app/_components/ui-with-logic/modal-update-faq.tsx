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
import {Faq, updateAnswerFaq, updateQuestionFaq} from '@/app/_actions/faqActions'
import {useRef, useState} from "react";
import '@/app/global-styles.css'

export interface UpdateFaqProps {
    faq : Faq
    changeFaq : (faq : Faq) => void
}

export default function ModalUpdateFaq({faq, changeFaq} : UpdateFaqProps) {

    const questionInputRef = useRef<HTMLInputElement>(null);
    const answerInputRef = useRef<HTMLInputElement>(null);
    const [question, setQuestion] = useState<string | null>(faq!.question);
    const [answer, setAnswer] = useState<string | null>(faq!.answer);
    const [destruct, setDestruct] = useState<boolean>(false);

    if (question === null) {
        setQuestion("")
    }
    if (answer === null) {
        setAnswer("")
    }

    const submitChanges = async () : Promise<void> => {
        setQuestion(questionInputRef.current!.value)
        setAnswer(answerInputRef.current!.value)

        if (question !== faq.question) {
            try{
                const updatedFaq : Faq = await updateQuestionFaq({id : faq.id, question : question, answer : faq.answer})
                if (updatedFaq) {
                    changeFaq(updatedFaq)
                }
            }catch(err){
                console.log("Произошла ошибка при попытке обновить вопрос для faq. Проверьте соединение с БД")
            }
        }

        if (answer !== faq.answer) {
            try{
                const updatedFaq : Faq = await updateAnswerFaq({id : faq.id, question : faq.question, answer : answer})
                if (updatedFaq) {
                    changeFaq(updatedFaq)
                }
            }catch(err){
                console.log("Произошла ошибка при попытке обновить ответ для faq. Проверьте соединение с БД")
            }
        }


    }

    const closeDialog = () => {
        setDestruct(true)
    }

    if (destruct) {
        return null
    }

    return (
        <div className='modal-bg'>
            <div className='modal-body'>
                <div className="text-lg text-slate-800 mb-7 modal-header flex justify-between">
                    <h3>Обновление Faq</h3>
                    <div onClick={closeDialog}>
                        <img src='/icons/close.png' />
                    </div>
                </div>
                <div className='w-1 bg-gray-300 cursor-col-resize' ></div>
                <div className='modal-content'>
                    {question && <input defaultValue={question} type='text' ref={questionInputRef} />}
                    {answer && <input defaultValue={answer} type='text' ref={answerInputRef} />}
                    {question && answer && <button onClick={submitChanges}>Сохранить</button>}
                </div>
            </div>
        </div>
    )
}