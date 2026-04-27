'use client'

import {CategoryWithQuestionsWithAnswer, deleteCategory} from "@/app/_actions/faq-actions";
import Image from "next/image";
import "@/app/global-styles.css"
import React, {ActionDispatch, useContext} from "react";
import {CategoriesDispatchContext, QuestionsDispatchContext} from "@/app/providers";
import {CategoryWithQuestionsWithAnswerActions, QuestionWithAnswerActions} from "@/app/_hooks/faq-hooks";


type ModalDeleteCategoryProps = {
    toDeleteCategory: CategoryWithQuestionsWithAnswer
    exitAction: () => void
}

export function ModalDeleteCategory({exitAction, toDeleteCategory} : ModalDeleteCategoryProps) {

    const dispatchCategories : ActionDispatch<[action : CategoryWithQuestionsWithAnswerActions]> = useContext(CategoriesDispatchContext);
    const dispatchQuestions : ActionDispatch<[action : QuestionWithAnswerActions]> = useContext(QuestionsDispatchContext)

    const submit = async () => {
        const result : boolean = await deleteCategory(toDeleteCategory.category.id, toDeleteCategory.category.group_id!);
        if (result) {
            dispatchCategories({
                type : "DELETE_CATEGORY",
                category_id : toDeleteCategory.category.id
            })
            dispatchQuestions({
                type : "ADD_QUESTIONS",
                questions : toDeleteCategory.questions!
            })
            exitAction()
        }
    }

    return(
        <div className='modal-bg'>
            <div className='modal-body flex flex-col gap-1'>
                <div className="text-lg text-slate-800 mb-7 modal-header flex justify-between">
                    <h3 className='p-2'>Удаление категории</h3>
                    <div onClick={exitAction} className='cursor-pointer hover:bg-slate-200 md:p-2 rounded-md transition duration-200'>
                        <Image src='/icons/close.png' width='24' height='24' alt='close' />
                    </div>
                </div>
                <div className="border-t-4 rounded-2xl w-auto border-gray-400 md:m-2"></div>
                <div className='modal-content flex flex-col  gap-3'>
                    <h4>У
                        категории {toDeleteCategory.category.title} {toDeleteCategory.questions?.length} объектов.</h4>
                    <h4>Вы уверены, что хотите удалить эту категорию? (Все вопросы сохранятся)</h4>
                    <div className='rounded-md flex justify-center cursor-pointer bg-red-200 p-3 hover:bg-red-300 transition duration-200'>
                        <button onClick={submit} className='cursor-pointer' >Подтверждаю</button>
                    </div>
                </div>
            </div>
        </div>
    )
}