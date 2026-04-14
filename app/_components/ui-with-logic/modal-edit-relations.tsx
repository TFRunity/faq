'use client'

import "@/app/global-styles.css"
import React, {ActionDispatch, useContext, useEffect, useState} from "react";
import {CategoryWithQuestionsWithAnswerActions, QuestionWithAnswerActions} from "@/app/_hooks/faq-hooks";
import {CategoriesDispatchContext, QuestionsDispatchContext} from "@/app/providers";
import Image from "next/image";
import {
    addRelationQuestionWithCategory,
    Category,
     getCategoriesWithoutQuestions,
    QuestionWithAnswer
} from "@/app/_actions/faq-actions";
import styles from "@/app/_components/ui-with-logic/searchbar.module.css";

type ModalEditRelationsProps = {
    questionWithAnswer : QuestionWithAnswer,
    exitAction: () => void
}

export function ModalEditRelations ({exitAction, questionWithAnswer} : ModalEditRelationsProps) {

    const dispatchQuestions : ActionDispatch<[action : QuestionWithAnswerActions]> = useContext(QuestionsDispatchContext)
    const dispatchCategories : ActionDispatch<[action : CategoryWithQuestionsWithAnswerActions]> = useContext(CategoriesDispatchContext)
    const [categoriesMapped, setCategoriesMapped] = useState<Category[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const categories : Category[] = await getCategoriesWithoutQuestions()
            setCategoriesMapped(categories)
        }
        fetchCategories()
    })
    
    const categoryInUse : Category | null = categoriesMapped.filter(c => c.id === questionWithAnswer.question.category_id)[0]

    const submit = async (category_id : number) => {
        const result : boolean = await addRelationQuestionWithCategory(questionWithAnswer.question.id, category_id)
        if(result) {
            if(categoryInUse) {
                dispatchCategories({
                    type : "DELETE_QUESTION",
                    question_id : questionWithAnswer.question.id,
                    category_id : category_id
                })
                questionWithAnswer.question.category_id = category_id
                dispatchCategories({
                    type : "ADD_QUESTION",
                    question : questionWithAnswer
                })
                alert("Успешно")
            } else {
                dispatchQuestions({
                    type : "REMOVE_QUESTION",
                    question_id : questionWithAnswer.question.id
                })
                questionWithAnswer.question.category_id = category_id
                dispatchCategories({
                    type : "ADD_QUESTION",
                    question : questionWithAnswer
                })
                alert("Успешно")
            }
        } else {
            alert("Не получилось")
        }
    }

    return (
        <div className='modal-bg'>
            <div className='modal-body'>
                <div className="text-lg text-slate-800 mb-7 modal-header flex justify-between">
                    <h3>Привязка вопроса к категории</h3>
                    <div onClick={exitAction}>
                        <Image src='/icons/close.png' width='24' height='24' alt='close' />
                    </div>
                </div>
                <div className='w-1 bg-gray-300 cursor-col-resize'></div>
                <div className='modal-content flex flex-col gap-3'>
                    <div>
                        <h4>Вопрос: {questionWithAnswer.question.question}</h4>
                        {categoryInUse && <h4>Сейчас находится в категории {categoryInUse.title}</h4>}
                    </div>
                    <div className='w-1 bg-gray-300 cursor-col-resize'></div>
                    <div>
                        <h3>Категории</h3>
                        {
                            categoriesMapped.map(c => (
                                <div key={c.id} >
                                    <h4>{c.title ? c.title : ""}</h4>
                                    <h2 onClick={() => submit(c.id)}>+</h2>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}