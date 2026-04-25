'use client'

import {addEmptyCategory, CategoryWithQuestionsWithAnswer} from "@/app/_actions/faq-actions";
import {ActionDispatch, useContext, useState} from "react";
import {CategoriesDispatchContext} from "@/app/providers";
import {CategoryWithQuestionsWithAnswerActions} from "@/app/_hooks/faq-hooks";
import {createPortal} from "react-dom";
import {ModalAddFaq} from "@/app/_components/ui-with-logic/modal-add-faq";
import "@/app/global-styles.css"



export function AdminButtons() {

    const dispatchCategories : ActionDispatch<[CategoryWithQuestionsWithAnswerActions]> = useContext(CategoriesDispatchContext)
    const [showModalAddQuestion, setShowModalAddQuestion] = useState<boolean>(false);

    const AddEmptyCategory = async () => {
        const newCategory : CategoryWithQuestionsWithAnswer = await addEmptyCategory()
        dispatchCategories({
            type : "ADD_CATEGORY",
            category : newCategory.category
        })
    }

    const openModalAddQuestion = () => {
        setShowModalAddQuestion(true);
    }
    const closeModalAddQuestion = () => {
        setShowModalAddQuestion(false);
    }

    return (
        <div className='flex flex-row columns-10 ml-3 mr-3 mb-3 justify-around'>
            <button onClick={AddEmptyCategory}
                    className='w-[10%] cursor-pointer bg-slate-200 p-2 text rounded-lg p-3 hover:bg-sky-400 transition'>
                + Категория
            </button>
            <button onClick={openModalAddQuestion}
                    className='w-[10%] cursor-pointer bg-slate-200 p-2 text rounded-lg p-3 hover:bg-sky-400 transition'>
                + Вопрос
            </button>
            <button onClick={openModalAddQuestion}
                    className='w-[10%] cursor-pointer bg-slate-200 p-2 text rounded-lg p-3 hover:bg-sky-400 transition'>
                + Отдел
            </button>
            {showModalAddQuestion && createPortal(
                <ModalAddFaq exitAction={closeModalAddQuestion}/>,
                document.body
            )}
        </div>
    )

}