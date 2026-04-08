'use client'

import {Answer, getQuestionAllAnswers, Question, QuestionWithAnswers} from "@/app/_actions/faq-actions";
import {useEffect, useState} from "react";


type ModalHistoryAnswersProps = {
    questionToUpdate : Question,
    exitAction: () => void
}

export function ModalHistoryAnswers ({questionToUpdate, exitAction} : ModalHistoryAnswersProps) {

    const [question, setQuestion] = useState(questionToUpdate)
    const [answers, setAnswers] = useState<Answer[]>([])

    useEffect(() => {
        const fetchAnswers = async () => {
            const questionWithAnswers : QuestionWithAnswers = await getQuestionAllAnswers(question.id)
            setAnswers(questionWithAnswers.answers ? questionWithAnswers.answers : [])
        }
        fetchAnswers()
    }, [])

    return (
        <div className='modal-bg'>
            <div className='modal-body'>
                <div className="text-lg text-slate-800 mb-7 modal-header flex justify-between">
                    <h3>Просмотр прошлых ответов</h3>
                    <div onClick={exitAction}>
                        <img src='/icons/close.png' width='15' height='15'/>
                    </div>
                </div>
                <div className='w-1 bg-gray-300 cursor-col-resize'></div>
                <div className='modal-content flex flex-col gap-3'>

                        <>
                            <h3>Вся история ответов</h3>
                            {
                                answers.map((answer, index) => (
                                    <div className='w-1 bg-gray-300 cursor-col-resize' key={index}>
                                        <h4>{index+1}</h4>
                                        <h4>{answer.answer}</h4>
                                    </div>
                                ))
                            }
                        </>

                </div>
            </div>
        </div>
    )

}