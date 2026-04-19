'use client'

import Image from "next/image";
import {deleteQuestion, Question} from "@/app/_actions/faq-actions";
import React, {ActionDispatch, useContext} from "react";
import {CategoriesDispatchContext, QuestionsDispatchContext} from "@/app/providers";
import {CategoryWithQuestionsWithAnswerActions, QuestionWithAnswerActions} from "@/app/_hooks/faq-hooks";
import styles from "@/app/_components/ui-with-logic/searchbar.module.css";

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
            <div className='modal-body flex flex-col gap-1'>
                <div className="text-lg text-slate-800 mb-7 modal-header flex justify-between">
                    <h3 className='p-2'>Удаление вопроса</h3>
                    <div onClick={exitAction} className='cursor-pointer hover:bg-slate-200 md:p-2 rounded-md transition duration-200'>
                        <Image src='/icons/close.png' width='24' height='24' alt='close' />
                    </div>
                </div>
                <div className="border-t-4 rounded-2xl w-auto border-gray-400 md:m-2"></div>
                <div className='modal-content flex flex-col gap-3'>
                    <h4>Вопрос: {question.question}</h4>
                    <h4>Вы уверены, что хотите удалить этот вопрос? Это действие НЕОБРАТИМО</h4>
                    <div
                        className='rounded-md flex justify-center cursor-pointer bg-red-200 p-3 hover:bg-red-300 transition duration-200'>
                        <button onClick={submit} className='cursor-pointer'>Подтверждаю</button>
                    </div>
                </div>
            </div>
        </div>
    )

}