//Вся реализация вывода Faq
/**
 *
 * @remarks
 * Вывод основной информации о faq + рендер карандашика
 *
 * @returns
 * Компонент
 *
 * @param faq = Faq
 *
 *Примерная структура:
 *
 * <div>
 *     {faq!.question && faq!.answer &&
 *     <div>
 *       <h3>{faq!.question}</h3>
 *      <h4>{faq!.answer}
 *     </div>
 *     <div>
 *         <Pencil faq={faq} />
 *     </div>
 *     }
 * </div>
 *
 */

'use client'

import {Faq} from "@/app/_actions/faqActions";
import {ReactElement, useEffect, useState} from "react";
import '@/app/global-styles.css'
import {createPortal} from "react-dom";
import ModalUpdateFaq from "@/app/_components/ui-with-logic/modal-update-faq";
import DeleteFaqButton from "@/app/_components/ui/delete-faq-button";

interface FaqProps {
    faq : Faq,
    isLoggedIn : boolean,
    deleteFaqFunc : (idtodelete : number) => void,
}

export default function FaqItem ({faq, isLoggedIn, deleteFaqFunc} : FaqProps): ReactElement | null {

    const [question, setQuestion] = useState<string | null>(faq.question)
    const [answer, setAnswer] = useState<string | null>(faq.answer)
    const [toggle, setToggle] = useState<boolean>(false)
    const [showModal, setShowModal] = useState<boolean>(false)

    const changeFaq = (faq : Faq) : void  => {
        if (faq.answer !== answer) {
            setAnswer(answer)
        }
        if (faq.question !== question) {
            setQuestion(question)
        }
        setShowModal(false)
    }
    const toggleAnswer = () : void => {
        setToggle(!toggle)
    }
    const toggleModal = () : void => {
        setShowModal(true)
    }
    const setDestruct = (_id_to_delete : number) : void => {
        deleteFaqFunc(_id_to_delete)
    }

    return (
        <div className='flex flex-col columns-10'>
            <div>
                <div className='bg-amber-50 columns-9'>
                    <h3>{question}</h3>
                    <div onClick={toggleAnswer}>
                        <h2>+</h2>
                    </div>
                </div>
                {isLoggedIn &&
                    <div>
                        <div className='columns-1'>
                            <h1 onClick={toggleModal}>Изменить</h1>
                        </div>
                        <DeleteFaqButton deleteFaqPropMethod={setDestruct} id={faq.id} isLoggedIn={isLoggedIn} />
                    </div>
                }
                {showModal && createPortal(
                    <ModalUpdateFaq faq={faq} changeFaq={changeFaq} />,
                    document.body
                )}
            </div>
            <div className='columns-10' style={{ display : toggle ? 'flex' : 'none' }}>
                <h3>{answer}</h3>
            </div>
        </div>
    )
}
