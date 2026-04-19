'use client'

import "@/app/global-styles.css"
import React, {ActionDispatch, useContext, useRef, useState} from "react";
import {addQuestion, addQuestionWithAnswer, QuestionWithAnswer} from "@/app/_actions/faq-actions";
import {QuestionWithAnswerActions} from "@/app/_hooks/faq-hooks";
import {QuestionsDispatchContext} from "@/app/providers";
import Image from "next/image";
import styles from "@/app/_components/ui-with-logic/searchbar.module.css";

type ModalAddFaqProps = {
    exitAction: () => void
}

export function ModalAddFaq({exitAction} : ModalAddFaqProps) {

    const dispatchQuestion : ActionDispatch<[action : QuestionWithAnswerActions]> = useContext(QuestionsDispatchContext)

    const answerInputRef = useRef<HTMLTextAreaElement>(null)
    const questionInputRef = useRef<HTMLTextAreaElement>(null)

    const submitChanges : () => Promise<void> = async () => {
        const question : string = questionInputRef.current!.value
        const answer : string = answerInputRef.current!.value
        if (question !== "") {
            const newQuestionWithAnswer : QuestionWithAnswer = await addQuestionWithAnswer(question, answer)
            dispatchQuestion({
                type : "ADD_QUESTION",
                questionWithAnswer : newQuestionWithAnswer
            })
            alert("Успешно добавился вопрос, (с ответом), на модерацию")
            exitAction()
        }
        else {
            alert("Пожалуйста, введите вопрос")
        }
    }

    return (
        <div className='modal-bg'>
            <div className='modal-body flex flex-col gap-1'>
                <div className="text-lg text-slate-800 mb-7 modal-header flex justify-between">
                    <h3 className='p-2'>Добавление FAQ</h3>
                    <div onClick={exitAction} className='cursor-pointer hover:bg-slate-200 md:p-2 rounded-md transition duration-200'>
                        <Image src='/icons/close.png' width='24' height='24' alt='close' />
                    </div>
                </div>
                <div className="border-t-4 rounded-2xl w-auto border-gray-400 md:m-2"></div>
                <div className='modal-content flex flex-col gap-3'>
                    <textarea placeholder='Вопрос' defaultValue=''
                              className='border border-slate-400 md:h-40 md:w-100 rounded-md p-1 resize '
                              ref={questionInputRef}/>
                    <textarea placeholder='Ответ' defaultValue=''
                              className='border border-slate-400 md:h-40 md:w-100 rounded-md p-1 resize '
                              ref={answerInputRef}/>
                    <div
                        className='rounded-md flex justify-center cursor-pointer bg-slate-200 p-3 hover:bg-slate-300 transition duration-200'>
                        <button onClick={submitChanges} className='cursor-pointer'>Сохранить</button>
                    </div>
                </div>
            </div>
        </div>
    )
}