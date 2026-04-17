'use client'

import {CategoryWithQuestionsWithAnswer} from "@/app/_actions/faq-actions";
import React, { useState} from "react";
import Question from "@/app/_components/ui/question-with-answer";
import Image from "next/image";
import {createPortal} from "react-dom";
import {ModalUpdateCategoryTitle} from "@/app/_components/ui-with-logic/modal-update-category-title";
import {ModalDeleteCategory} from "@/app/_components/ui-with-logic/modal-delete-category";
import "@/app/global-styles.css"
import styles from "@/app/_components/ui-with-logic/searchbar.module.css";


export interface CategoryProps {
    category : CategoryWithQuestionsWithAnswer,
    permission : boolean,
}

export default function Category({category, permission} : CategoryProps) {

    const [modalChange, setModalChange] = useState<boolean>(false)
    const [modalDelete, setModalDelete] = useState<boolean>(false)

    function openModalChange() {
        setModalChange(true)
    }
    function closeModalChange() {
        setModalChange(false)
    }

    function openModalDelete() {
        setModalDelete(true)
    }
    function closeModalDelete() {
        setModalDelete(false)
    }

    return (
        <div className="mb-7 ">
            <div className="flex justify-between">
                <h3 className='text-slate-600 mb-1 ml-1'>{category.category.title}</h3>
                {permission &&
                    <div className='flex ml-7 mb-1'>
                        <div onClick={openModalChange} className='cursor-pointer content-end ml-auto mr-7 flex-row rounded-md hover:bg-slate-100 transition duration-300 p-1.5'>
                            <Image src='/icons/edit.png' alt='edit' width='24' height='24'/>
                        </div>
                        <div onClick={openModalDelete} className='cursor-pointer content-end ml-auto mr-7 flex-row rounded-md hover:bg-slate-100 transition duration-300 p-1.5'>
                            <Image src='/icons/delete.png' alt='delete' width='24' height='24'/>
                        </div>
                    </div>

                }
                {modalChange && createPortal(
                    <ModalUpdateCategoryTitle exitAction={closeModalChange} toUpdateCategory={category.category}/>,
                    document.body
                )}
                {modalDelete && createPortal(
                    <ModalDeleteCategory exitAction={closeModalDelete} toDeleteCategory={category}/>,
                    document.body
                )}
            </div>
            <div>
                {category.questions &&
                    category.questions.map(question => (
                        <div key={question.question.id}>
                            <Question questionWithAnswer={question} permission={permission}/>
                        </div>
                    ))
                }
            </div>
        </div>
    )

}