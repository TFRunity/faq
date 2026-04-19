'use client'

import {
    Answer, forceDeleteAnswer,
    getQuestionAllAnswers,
    Question, QuestionWithAnswer,
    QuestionWithAnswers,
    updateAnswerOfQuestion
} from "@/app/_actions/faq-actions";
import React, {ActionDispatch, useContext, useEffect, useState} from "react";
import Image from "next/image";
import {CategoryWithQuestionsWithAnswerActions, QuestionWithAnswerActions} from "@/app/_hooks/faq-hooks";
import {CategoriesDispatchContext, QuestionsDispatchContext} from "@/app/providers";


type ModalHistoryAnswersProps = {
    questionToUpdate : Question,
    exitAction: () => void
}

export function ModalHistoryAnswers ({questionToUpdate, exitAction} : ModalHistoryAnswersProps) {

    const dispatchQuestions : ActionDispatch<[action : QuestionWithAnswerActions]> = useContext(QuestionsDispatchContext)
    const dispatchCategories : ActionDispatch<[action : CategoryWithQuestionsWithAnswerActions]> = useContext(CategoriesDispatchContext)
    const [question, setQuestion] = useState(questionToUpdate)
    const [answers, setAnswers] = useState<Answer[]>([])

    useEffect(() => {
        const fetchAnswers = async () => {
            const questionWithAnswers : QuestionWithAnswers = await getQuestionAllAnswers(question.id)
            setAnswers(questionWithAnswers.answers ? questionWithAnswers.answers : [])
        }
        fetchAnswers()
    }, [])

    const submit = async (answer : Answer) => {
        const resQuestion : QuestionWithAnswer = await updateAnswerOfQuestion(question.id, answer.answer!)
        if (questionToUpdate.category_id !== null) {
            dispatchCategories({
                type: "UPDATE_ANSWER",
                question_id : question.id,
                answer_id : answer.id,
                answer : answer.answer!,
                category_id : question.category_id!
            })
        }
        else {
            dispatchQuestions({
                type : "CHANGE_ANSWER",
                question_id : question.id,
                answer : answer
            })
        }
        exitAction()
    }

    // const deleteAnswer = async (answer_id : number) => {
    //     const res : boolean = await forceDeleteAnswer(answer_id)
    //     if (res && question.category_id !== null) {
    //
    //     }
    // }

    return (
        <div className='modal-bg'>
            <div className='modal-body flex flex-col gap-1'>
                <div className="text-lg text-slate-800 modal-header flex justify-between">
                    <h3 className='p-2'>Вся история ответов</h3>
                    <div onClick={exitAction} className='cursor-pointer hover:bg-slate-200 md:p-2 rounded-md transition duration-200'>
                        <Image src='/icons/close.png' width='24' height='24' alt='close' />
                    </div>
                </div>
                <div className="border-t-4 rounded-2xl w-auto border-gray-400 md:m-2"></div>
                <div className='modal-content flex flex-col gap-5'>
                        <>
                            {
                                answers.map((answer, index) => (
                                    <div className='flex flex-col columns-2 justify-between' key={index}>
                                        <div className='flex p-3 rounded-2xl justify-between cursor-pointer hover:bg-gray-200 transition duration-400 ' >
                                            <h4>{answer.answer}</h4>
                                            <Image src='/icons/rel.png' alt='rel' width='24' height='24' onClick={() => submit(answer)} ></Image>
                                        </div>
                                    </div>
                                ))
                            }
                        </>

                </div>
            </div>
        </div>
    )

}