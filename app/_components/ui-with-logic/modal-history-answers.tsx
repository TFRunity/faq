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
    }, [])

    return (
        <div className='modal-bg'>
            <div className='modal-body'>
                <div className="text-lg text-slate-800 mb-7 modal-header flex justify-between">
                    <h3>Обновление Faq</h3>
                    <div onClick={exitAction}>
                        <img src='/icons/close.png' width='15' height='15'/>
                    </div>
                </div>
                <div className='w-1 bg-gray-300 cursor-col-resize'></div>
                <div className='modal-content flex flex-col gap-3'>

                </div>
            </div>
        </div>
    )

}