'use client'

import React, {useContext} from "react";
import {QuestionsStateContext} from "@/app/providers";
import {QuestionWithAnswer} from "@/app/_actions/faq-actions";
import Question from "@/app/_components/ui/question-with-answer";
import "@/app/global-styles.css"


export type QuestionsProps = {
    permission : boolean
}

export default function Questions({permission} : QuestionsProps) {

    const state : QuestionWithAnswer[]  = useContext(QuestionsStateContext)

    return (
        <>
            {state.length > 0 && <h2>Вопросы на модерации</h2>}
            {state.length == 0 && <h2>Вопросов на модерации нет</h2>}
            {
                state.map(q => (
                    <div key={q.question.id}>
                        <Question questionWithAnswer={q} permission={permission}/>
                    </div>
                ))
            }
        </>
    )
}