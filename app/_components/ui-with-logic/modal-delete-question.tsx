'use client'

import Image from "next/image";
import {deleteQuestion, Question} from "@/app/_actions/faq-actions";
import {ActionDispatch, useContext} from "react";
import {CategoriesDispatchContext, QuestionsDispatchContext} from "@/app/providers";
import {CategoryWithQuestionsWithAnswerActions, QuestionWithAnswerActions} from "@/app/_hooks/faq-hooks";

type ModalDeleteQuestionProps = {
    question : Question,
    exitAction : () => void
}

export function ModalDeleteQuestion ({question, exitAction} : ModalDeleteQuestionProps) {

    const dispatchQuestions : ActionDispatch<[action : QuestionWithAnswerActions]> = useContext(QuestionsDispatchContext)
    const dispatchCategories : ActionDispatch<[action : CategoryWithQuestionsWithAnswerActions]> = useContext(CategoriesDispatchContext)

    const submit = async () => {
        const result = await deleteQuestion(question.id)
        if (result) {
            if (question.category_id) {
                dispatchCategories({
                    type : "DELETE_QUESTION",
                    question_id : question.id,
                    category_id : question.category_id
                })
                alert("Успешно")
                exitAction()
            } else {
                dispatchQuestions({
                    type : "REMOVE_QUESTION",
                    question_id : question.id
                })
                alert("Успешно")
                exitAction()
            }
        } else {
            alert("Не получилось")
        }
    }

    return (
        <div className='modal-bg'>
            <div className='modal-body'>
                <div className="text-lg text-slate-800 mb-7 modal-header flex justify-between">
                    <h3>Удаление вопроса</h3>
                    <div onClick={exitAction}>
                        <Image src='/icons/close.png'  width='15' height='15' alt='X' loading='lazy' />
                    </div>
                </div>
                <div className='w-1 bg-gray-300 cursor-col-resize' ></div>
                <div className='modal-content flex flex-col gap-3'>
                    <h4>Вы уверены, что хотите удалить этот вопрос? Это действие НЕОБРАТИМО</h4>
                    <button onClick={submit}>Даю согласие</button>
                </div>
            </div>
        </div>
    )

}