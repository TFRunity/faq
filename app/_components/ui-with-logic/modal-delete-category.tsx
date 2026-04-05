import {CategoryWithQuestionsWithAnswer, deleteCategory} from "@/app/_actions/faq-actions";
import Image from "next/image";
import "@/app/global-styles.css"
import {ActionDispatch, useContext} from "react";
import {CategoriesDispatchContext} from "@/app/providers";
import {CategoryWithQuestionsWithAnswerActions} from "@/app/_hooks/faq-hooks";


type ModalDeleteCategoryProps = {
    toDeleteCategory: CategoryWithQuestionsWithAnswer
    exitAction: () => void
}

export function ModalDeleteCategory({exitAction, toDeleteCategory} : ModalDeleteCategoryProps) {

    const dispatch : ActionDispatch<[action : CategoryWithQuestionsWithAnswerActions]> = useContext(CategoriesDispatchContext);

    const submit = async () => {
        const result = await deleteCategory(toDeleteCategory.category.id);
        if (result) {
            dispatch({
                type : "DELETE_CATEGORY",
                category_id : toDeleteCategory.category.id
            })
            alert("Успешно")
            exitAction()
        } else {
            alert("Не получилось")
        }
    }

    return(
        <div className='modal-bg'>
            <div className='modal-body'>
                <div className="text-lg text-slate-800 mb-7 modal-header flex justify-between">
                    <h3>Удаление категории</h3>
                    <div onClick={exitAction}>
                        <Image src='/icons/close.png'  width='15' height='15' alt='X' loading='lazy' />
                    </div>
                </div>
                <div className='w-1 bg-gray-300 cursor-col-resize' ></div>
                <div className='modal-content flex flex-col gap-3'>
                    <h4>У категории {toDeleteCategory.category.title} {toDeleteCategory.questions?.length} объектов.</h4>
                    <h4>Вы уверены, что хотите удалить эту категорию? (Все вопросы этой категории будут отправлены на модерацию)</h4>
                    <button onClick={submit} >Даю согласие</button>
                </div>
            </div>
        </div>
    )
}