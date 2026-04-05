import {addEmptyCategory, CategoryWithQuestionsWithAnswer} from "@/app/_actions/faq-actions";
import {ActionDispatch, useContext, useState} from "react";
import {CategoriesDispatchContext} from "@/app/providers";
import {CategoryWithQuestionsWithAnswerActions} from "@/app/_hooks/faq-hooks";
import {createPortal} from "react-dom";
import {ModalEditRelations} from "@/app/_components/ui-with-logic/modal-edit-relations";
import {ModalAddFaq} from "@/app/_components/ui-with-logic/modal-add-faq";

type AdminButtonsProps = {

}

export function AdminButtons({} : AdminButtonsProps) {

    const dispatchCategories : ActionDispatch<[CategoryWithQuestionsWithAnswerActions]> = useContext(CategoriesDispatchContext)
    const [showModalAddQuestion, setShowModalAddQuestion] = useState<boolean>(false);
    const [showModalEditRelations, setShowModalEditRelations] = useState<boolean>(false);

    const AddEmptyCategory = async () => {
        const newCategory : CategoryWithQuestionsWithAnswer = await addEmptyCategory()
        dispatchCategories({
            type : "ADD_CATEGORY",
            category : newCategory.category
        })
        //Это переделать
        alert("Добавилась пустая категория")
    }

    const openModalAddQuestion = () => {
        setShowModalAddQuestion(true);
    }
    const closeModalAddQuestion = () => {
        setShowModalAddQuestion(false);
    }

    const openModalRelations = () => {
        setShowModalEditRelations(true)
    }
    const closeModalRelations = () => {
        setShowModalEditRelations(false)
    }

    return (
        <div>
            <button onClick={AddEmptyCategory}>
                + Категория
            </button>
            <button onClick={openModalAddQuestion}>
                + Вопрос
            </button>
            <button onClick={openModalRelations}>
                Изменить связь
            </button>
            {showModalAddQuestion && createPortal(
                <ModalAddFaq exitAction={closeModalAddQuestion} />,
                document.body
            )}
            {showModalEditRelations && createPortal(
                <ModalEditRelations exitAction={closeModalRelations} />,
                document.body
            )}
        </div>
    )

}