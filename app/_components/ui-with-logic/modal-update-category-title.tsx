import {Category, changeTitleCategory} from "@/app/_actions/faq-actions";
import "@/app/global-styles.css"
import {ActionDispatch, useContext, useRef, useState} from "react";
import {CategoriesDispatchContext} from "@/app/providers";
import {CategoryWithQuestionsWithAnswerActions} from "@/app/_hooks/faq-hooks";
import Image from "next/image";


type ModalUpdateCategoryTitleProps = {
    toUpdateCategory: Category,
    exitAction: () => void
}

export function ModalUpdateCategoryTitle({toUpdateCategory, exitAction}: ModalUpdateCategoryTitleProps) {

    const dispatch : ActionDispatch<[action : CategoryWithQuestionsWithAnswerActions]> = useContext(CategoriesDispatchContext)

    const updateInputRef = useRef<HTMLInputElement>(null)
    const [title, setTitle] = useState<string>(toUpdateCategory.title!)

    const update = async () => {
        setTitle(updateInputRef.current!.value!)
        const result : boolean = await changeTitleCategory(toUpdateCategory)
        if (result) {
            dispatch({
                type : "CHANGE_CATEGORY_NAME",
                category_id : toUpdateCategory.id,
                title : title
            })
            alert("Успешно")
            exitAction()
        } else {
            alert("Не получилось")
        }
    }

    return (
        <div className='modal-bg'>
            <div className='modal-body'>
                <div className="text-lg text-slate-800 mb-7 modal-header flex justify-between">
                    <h3>Изменение названия категории</h3>
                    <div onClick={exitAction}>
                        <Image src='/icons/close.png'  width='15' height='15' alt='X' loading='lazy' />
                    </div>
                </div>
                <div className='w-1 bg-gray-300 cursor-col-resize' ></div>
                <div className='modal-content flex flex-col gap-3'>
                    <input defaultValue={title} type='text' ref={updateInputRef} />
                    <button onClick={update}>Сохранить</button>
                </div>
            </div>
        </div>
    )

}