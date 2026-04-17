'use client'

import React, {ActionDispatch, useContext, useRef, useState} from "react";
import '@/app/global-styles.css'
import {
    QuestionWithAnswer,
    updateAnswerOfQuestion,
    updateQuestionOfQuestion
} from "@/app/_actions/faq-actions";
import {CategoriesDispatchContext, QuestionsDispatchContext} from "@/app/providers";
import {CategoryWithQuestionsWithAnswerActions, QuestionWithAnswerActions} from "@/app/_hooks/faq-hooks";
import styles from "@/app/_components/ui-with-logic/searchbar.module.css";
import Image from "next/image";

export interface UpdateFaqProps {
    questionWithAnswer : QuestionWithAnswer,
    exitAction: () => void,
}


export default function ModalUpdateFaq({ questionWithAnswer, exitAction } : UpdateFaqProps) {
    
    const dispatchCategories : ActionDispatch<[action : CategoryWithQuestionsWithAnswerActions]> = useContext(CategoriesDispatchContext)
    const dispatchQuestions : ActionDispatch<[action : QuestionWithAnswerActions]> = useContext(QuestionsDispatchContext)

    const questionWithoutNull : string = questionWithAnswer.question.question ? questionWithAnswer.question.question : "";
    const answerWithoutNull :  string = questionWithAnswer.answer && questionWithAnswer.answer.answer ? questionWithAnswer.answer.answer : "";
    
    const questionInputRef = useRef<HTMLTextAreaElement>(null);
    const answerInputRef = useRef<HTMLTextAreaElement>(null);

    const submitChanges = async () : Promise<void> => {
        const question = questionInputRef.current!.value;
        const answer = answerInputRef.current!.value

        if (question !== questionWithAnswer.question.question) {
            try{
                const updatedFaq : QuestionWithAnswer = await updateQuestionOfQuestion(questionWithAnswer.question.id, question)
                if (updatedFaq.question.category_id) {
                    dispatchCategories({
                        type: "UPDATE_QUESTION_QUESTION",
                        question: updatedFaq
                    })
                }
                else{
                    dispatchQuestions({
                        type : "CHANGE_QUESTION",
                        question_id : updatedFaq.question.id,
                        question : updatedFaq.question
                    })
                }
            }catch(err){
                console.log("Произошла ошибка при попытке обновить вопрос для faq. Проверьте соединение с БД")
            }
        }

        if (answer !== questionWithAnswer.answer!.answer) {
            try{
                const updatedFaq = await updateAnswerOfQuestion(questionWithAnswer.question.id, answer)
                if (updatedFaq.question.category_id) {
                    dispatchCategories({
                        type: "UPDATE_ANSWER",
                        question_id: updatedFaq.question.id,
                        answer_id: updatedFaq.answer!.id,
                        answer: updatedFaq.answer!.answer!,
                        category_id: updatedFaq.question.category_id
                    })
                }
                else{
                    dispatchQuestions({
                        type: "CHANGE_ANSWER",
                        question_id: updatedFaq.question.id,
                        answer: updatedFaq.answer!
                    })
                }
            }catch(err){
                console.log("Произошла ошибка при попытке обновить ответ для faq. Проверьте соединение с БД")
            }
        }
    }


    return (
        <div className='modal-bg'>
            <div className='modal-body flex flex-col gap-1'>
                <div className="text-lg text-slate-800 modal-header flex justify-between">
                    <h3 className='p-2'>Обновление FAQ</h3>
                    <div onClick={exitAction} className='cursor-pointer hover:bg-slate-200 md:p-2 rounded-md transition duration-200'>
                        <Image src='/icons/close.png' width='24' height='24' alt='close' />
                    </div>
                </div>
                <div className="border-t-4 rounded-2xl w-auto border-gray-400 md:m-2"></div>
                <div className='modal-content flex flex-col gap-3 p-4'>
                    <textarea placeholder='Вопрос' defaultValue={questionWithoutNull} className='border border-slate-400 md:h-40 md:w-100 rounded-md p-1 resize ' ref={questionInputRef}/>
                    <textarea placeholder='Ответ' defaultValue={answerWithoutNull} className='border border-slate-400 md:h-40 md:w-100 rounded-md p-1 resize ' ref={answerInputRef}/>
                    <button onClick={submitChanges} className='cursor-pointer mt-3 rounded-md bg-gray-50 p-2 hover:bg-slate-200 transition duration-200'>Сохранить</button>
                </div>
            </div>
        </div>
    )
}