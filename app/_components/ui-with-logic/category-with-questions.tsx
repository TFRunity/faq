import {CategoryWithQuestionsWithAnswer} from "@/app/_actions/faq-actions";
import React, {useContext, useState} from "react";
import {CategoriesDispatchContext} from "@/app/providers";
import Question from "@/app/_components/ui-with-logic/question-with-answer";
import Image from "next/image";
import {createPortal} from "react-dom";

export interface CategoryProps {
    category : CategoryWithQuestionsWithAnswer,
    permission : boolean,
}

export default function Category({category, permission} : CategoryProps) {

    const dispatch = useContext(CategoriesDispatchContext)
    const [modal, setModal] = useState<boolean>(false)

    function toggleModal() {
        setModal(!modal)
    }

    return (
        <>
            <div>
                <h3>{category.category.title}</h3>
                {permission &&
                    <div onClick={toggleModal} className='cursor-pointer content-end ml-auto mr-7 flex-row'>
                        <Image src={"/icons/pencil.png"} width='30' height='30' alt={"Изменить"}
                               loading="lazy"/>
                    </div>
                }
                {modal && createPortal(
                    <ModalUpdateCategoryTitle />,
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