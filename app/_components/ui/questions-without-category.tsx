'use client'

import {useContext} from "react";
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
            {
                state.map(q => (
                    <Question questionWithAnswer={q} permission={permission}/>
                ))
            }
        </>
    )
}