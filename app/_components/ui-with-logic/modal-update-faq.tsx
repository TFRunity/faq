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
// import {Faq, updateAnswerFaq, updateQuestionFaq} from '@/app/_actions/faqActions'
import {ActionDispatch, useContext, useRef, useState} from "react";
import '@/app/global-styles.css'
import {
    QuestionWithAnswer,
    updateAnswerOfQuestion,
    updateQuestionOfQuestion
} from "@/app/_actions/faq-actions";
import {CategoriesDispatchContext} from "@/app/providers";
import {CategoryWithQuestionsWithAnswerActions} from "@/app/_hooks/faq-hooks";

export interface UpdateFaqProps {
    questionWithAnswer : QuestionWithAnswer
}


export default function ModalUpdateFaq({ questionWithAnswer } : UpdateFaqProps) {
    
    const dispatchCategories : ActionDispatch<[action : CategoryWithQuestionsWithAnswerActions]> = useContext(CategoriesDispatchContext)

    const questionWithoutNull : string = questionWithAnswer.question.question ? questionWithAnswer.question.question : "";
    const answerWithoutNull :  string = questionWithAnswer.answer && questionWithAnswer.answer.answer ? questionWithAnswer.answer.answer : "";
    
    const questionInputRef = useRef<HTMLInputElement>(null);
    const answerInputRef = useRef<HTMLInputElement>(null);
    const [question, setQuestion] = useState<string>(questionWithoutNull);
    const [answer, setAnswer] = useState<string>(answerWithoutNull);
    const [destruct, setDestruct] = useState<boolean>(false);

    const submitChanges = async () : Promise<void> => {
        setQuestion(questionInputRef.current!.value)
        setAnswer(answerInputRef.current!.value)

        if (question !== questionWithAnswer.question.question) {
            try{
                const updatedFaq : QuestionWithAnswer = await updateQuestionOfQuestion(questionWithAnswer.question.id, question)
                if (updatedFaq) {
                    dispatchCategories({
                        type: "UPDATE_QUESTION_QUESTION",
                        question: updatedFaq
                    })
                }
            }catch(err){
                console.log("Произошла ошибка при попытке обновить вопрос для faq. Проверьте соединение с БД")
            }
        }

        if (questionWithAnswer.answer === null || answer !== questionWithAnswer.answer!.answer) {
            try{
                const updatedFaq = await updateAnswerOfQuestion(questionWithAnswer.question.id, answer)
                if (updatedFaq) {
                    if (updatedFaq.question.category_id) {
                        dispatchCategories({
                            type: "UPDATE_ANSWER",
                            question_id: updatedFaq.question.id,
                            answer_id: updatedFaq.answer!.id,
                            answer: updatedFaq.answer!.answer!,
                            category_id: updatedFaq.question.category_id
                        })
                    }
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
                        <img src='/icons/close.png'  width='15' height='15' />
                    </div>
                </div>
                <div className='w-1 bg-gray-300 cursor-col-resize' ></div>
                <div className='modal-content flex flex-col gap-3'>
                    {question && <input defaultValue={question} type='text' ref={questionInputRef} />}
                    {answer && <input defaultValue={answer} type='text' ref={answerInputRef} />}
                    {question && answer && <button onClick={submitChanges}>Сохранить</button>}
                </div>
            </div>
        </div>
    )
}