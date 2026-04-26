'use client'

import {addEmptyCategory, addEmptyGroup, CategoryWithQuestionsWithAnswer, Group} from "@/app/_actions/faq-actions";
import {ActionDispatch, useContext, useState} from "react";
import {CategoriesDispatchContext, GroupsDispatchContext} from "@/app/providers";
import {CategoryWithQuestionsWithAnswerActions, GroupsActions} from "@/app/_hooks/faq-hooks";
import {createPortal} from "react-dom";
import {ModalAddFaq} from "@/app/_components/ui-with-logic/modal-add-faq";
import "@/app/global-styles.css"

export type AdminButtonsProps = {
    groupId : number;
}

export function AdminButtons({groupId} : AdminButtonsProps) {

    const dispatchCategories : ActionDispatch<[action : CategoryWithQuestionsWithAnswerActions]> = useContext(CategoriesDispatchContext)
    const dispatchGroups : ActionDispatch<[action : GroupsActions]> = useContext(GroupsDispatchContext)
    const [showModalAddQuestion, setShowModalAddQuestion] = useState<boolean>(false);

    const AddEmptyCategory = async () => {
        const newCategory : CategoryWithQuestionsWithAnswer = await addEmptyCategory(groupId)
        dispatchCategories({
            type : "ADD_CATEGORY",
            category : newCategory.category
        })
    }
    const AddEmptyGroup = async () => {
        const newGroup : Group = await addEmptyGroup()
        dispatchGroups({
            type : "ADD_GROUP",
            group : newGroup
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
            <button onClick={AddEmptyGroup}
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