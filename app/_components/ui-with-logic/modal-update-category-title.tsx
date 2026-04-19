'use client'

import {Category, changeTitleCategory} from "@/app/_actions/faq-actions";
import "@/app/global-styles.css"
import React, {ActionDispatch, useContext, useRef, useState} from "react";
import {CategoriesDispatchContext} from "@/app/providers";
import {CategoryWithQuestionsWithAnswerActions} from "@/app/_hooks/faq-hooks";
import Image from "next/image";
import styles from "@/app/_components/ui-with-logic/searchbar.module.css";


type ModalUpdateCategoryTitleProps = {
    toUpdateCategory: Category,
    exitAction: () => void
}

export function ModalUpdateCategoryTitle({toUpdateCategory, exitAction}: ModalUpdateCategoryTitleProps) {

    const dispatch : ActionDispatch<[action : CategoryWithQuestionsWithAnswerActions]> = useContext(CategoriesDispatchContext)

    const updateInputRef = useRef<HTMLInputElement>(null)

    const update = async () => {
        const title : string = updateInputRef.current!.value
        const result : boolean = await changeTitleCategory({...toUpdateCategory, title : title})
        if (result) {
            dispatch({
                type : "CHANGE_CATEGORY_NAME",
                category_id : toUpdateCategory.id,
                title : title
            })
            exitAction()
        }
    }

    return (
        <div className='modal-bg'>
            <div className='modal-body flex flex-col gap-1'>
                <div className="text-lg text-slate-800 mb-7 modal-header flex justify-between">
                    <h3 className='p-2'>Изменение категории</h3>
                    <div onClick={exitAction} className='cursor-pointer hover:bg-slate-200 md:p-2 rounded-md transition duration-200'>
                        <Image src='/icons/close.png' width='24' height='24' alt='close' />
                    </div>
                </div>
                <div className="border-t-4 rounded-2xl w-auto border-gray-400 md:m-2"></div>
                <div className='modal-content flex flex-col gap-3'>
                    <input defaultValue={toUpdateCategory.title!} className='p-2 m-2 border-2 rounded-md' type='text' ref={updateInputRef}/>
                    <div className='rounded-md flex justify-center cursor-pointer bg-slate-200 p-3 hover:bg-slate-300 transition duration-200'>
                        <button onClick={update} className='cursor-pointer'>Обновить</button>
                    </div>
                </div>
            </div>
        </div>
    )

}