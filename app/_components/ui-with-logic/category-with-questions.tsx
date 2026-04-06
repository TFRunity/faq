import {CategoryWithQuestionsWithAnswer} from "@/app/_actions/faq-actions";
import React, {useContext, useState} from "react";
import {CategoriesDispatchContext} from "@/app/providers";
import Question from "@/app/_components/ui/question-with-answer";
import Image from "next/image";
import {createPortal} from "react-dom";
import {ModalUpdateCategoryTitle} from "@/app/_components/ui-with-logic/modal-update-category-title";
import {ModalDeleteCategory} from "@/app/_components/ui-with-logic/modal-delete-category";
import "@/app/global-styles.css"


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
        <>
            <div>
                <h3>{category.category.title}</h3>
                {permission &&
                    <>
                        <div onClick={openModalChange} className='cursor-pointer content-end ml-auto mr-7 flex-row'>
                            <Image src={"/icons/pencil.png"} width='30' height='30' alt={"Изменить"}
                                   loading="lazy"/>
                        </div>
                        <div onClick={openModalDelete} className='cursor-pointer content-end ml-auto mr-7 flex-row'>
                            <Image src={"/icons/close.png"} width='30' height='30' alt={"Удалить"}
                                   loading="lazy"/>
                        </div>
                    </>

                }
                {modalChange && createPortal(
                    <ModalUpdateCategoryTitle exitAction={closeModalChange} toUpdateCategory={category.category} />,
                    document.body
                )}
                {modalDelete && createPortal(
                    <ModalDeleteCategory exitAction={closeModalDelete} toDeleteCategory={category} />,
                    document.body
                )}
            </div>
            <div>
                {category.questions &&
                    category.questions.map(question => (
                        <Question questionWithAnswer={question} permission={permission} />
                    ))
                }
            </div>
        </>
    )

}