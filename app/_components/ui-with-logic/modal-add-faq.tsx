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

    const answerInputRef = useRef<HTMLInputElement>(null)
    const questionInputRef = useRef<HTMLInputElement>(null)
    const [answer, setAnswer] = useState<string>("")
    const [question, setQuestion] = useState<string>("")

    const submitChanges = async () => {
        setQuestion(questionInputRef.current!.value)
        setAnswer(answerInputRef.current!.value)
        if (question === "" && answer === "") {
            alert("Пожалуйста, введите вопрос")
        }
        if (question !== "" && answer !== "") {
            const newQuestionWithAnswer : QuestionWithAnswer = await addQuestionWithAnswer(questionInputRef.current!.value!, answerInputRef.current!.value!)
            dispatchQuestion({
                type : "ADD_QUESTION",
                questionWithAnswer : newQuestionWithAnswer
            })
            alert("Успешно добавился вопрос, (с ответом), на модерацию")
        }
        if (question !== "") {
            const newQuestion : QuestionWithAnswer = await addQuestion(questionInputRef.current!.value!)
            dispatchQuestion({
                type : "ADD_QUESTION",
                questionWithAnswer : newQuestion
            })
            alert("Успешно добавился вопрос на модерацию")
        }
        exitAction()
    }

    return (
        <div className='modal-bg'>
            <div className='modal-body'>
                <div className="text-lg text-slate-800 mb-7 modal-header flex justify-between">
                    <h3>Обновление Faq</h3>
                    <div onClick={exitAction}>
                        <Image src='/icons/close.png' width='24' height='24' alt='close' />
                    </div>
                </div>
                <div className='w-1 bg-gray-300 cursor-col-resize'></div>
                <div className='modal-content flex flex-col gap-3'>
                    <input defaultValue={question} type='text' ref={questionInputRef}/>
                    <input defaultValue={answer} type='text' ref={answerInputRef}/>
                    <button onClick={submitChanges}>Сохранить</button>
                </div>
            </div>
        </div>
    )
}