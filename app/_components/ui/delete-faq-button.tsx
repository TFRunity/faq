/**
 *
 * @remarks
 * Кнопочка удаляющая компонент, появляется рядом с карандашиком
 *
 * @param isLoggedIn = boolean, передает права на редактировать faq
 * @param deleleFaqPropMethod = func, для оповещения родителя
 *
 * @returns
 * Компонент
 *
 */


'use client'


import { deleteFaq, isResponsible } from '@/app/_actions/faqActions'
import '@/app/global-styles.css'
import {ReactElement} from "react";

interface deleteFaqButtonProps {
    deleteFaqPropMethod : (id : number) => void,
    id : number,
    isLoggedIn : boolean,
}

export default function DeleteFaqButton({deleteFaqPropMethod, id, isLoggedIn} : deleteFaqButtonProps) : ReactElement {

    const deleteFaqFunc = async () => {
        if (isLoggedIn && await isResponsible()) {
            try{
                const res : boolean = await deleteFaq(id);
                if (!res) {
                    console.error('Faq deleted error', res)
                }
                deleteFaqPropMethod(id)
            }catch(e){
                throw new Error('Не удалось удалить')
            }
        }
        else{
            alert("Отказано в доступе")
        }
    }

    return (
        <div onClick={deleteFaqFunc} className='btn' >
            <h3>крестик</h3>
        </div>
    )
}

