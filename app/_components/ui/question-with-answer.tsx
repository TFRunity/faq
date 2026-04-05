import {QuestionWithAnswer} from "@/app/_actions/faq-actions";
import React, {useState} from "react";
import Image from "next/image";
import {createPortal} from "react-dom";
import ModalUpdateFaq from "@/app/_components/ui-with-logic/modal-update-faq";


export interface QuestionWithAnswerProps {
    questionWithAnswer: QuestionWithAnswer;
    permission : boolean;
}

export default function Question({questionWithAnswer, permission} : QuestionWithAnswerProps) {

    const [toggle, setToggle] = useState(false);
    const [showModal, setShowModal] = useState(false);

    function toggleAnswer() {
        setToggle(!toggle);
    }
    function openModalChange() {
        setShowModal(true);
    }
    function closeModalChange() {
        setShowModal(false);
    }

    return (
        <div className='flex flex-col columns-10'>
            <div className='m-1'>
                <div className='rounded-lg bg-slate-100 flex justify-between'>
                    <h3 className=' text-slate-900 text-[120%] mt-3 ml-3 mb-2'>{questionWithAnswer.question.question ? questionWithAnswer.question.question : "Пустой вопрос"}</h3>
                    <div className=' text-slate-600 text-[130%] cursor-pointer mt-3 mr-3 mb-2' onClick={toggleAnswer}>
                        {permission &&
                            <div onClick={openModalChange} className='cursor-pointer content-end ml-auto mr-7 flex-row'>
                                <Image src={"/icons/pencil.png"} width='30' height='30' alt={"Изменить"}
                                       loading="lazy"/>
                            </div>
                        }
                        <h2>+</h2>
                    </div>
                </div>
                {showModal && createPortal(
                    <ModalUpdateFaq questionWithAnswer={questionWithAnswer} exitAction={closeModalChange} />,
                    document.body
                )}
            </div>
            <div className='text-slate-600 mt-3 ml-3 mb-2' style={{ display : toggle ? 'flex' : 'none' }}>
                <h3 className='text-slate-700 text-[120%] '>{questionWithAnswer.answer && questionWithAnswer.answer.answer ? questionWithAnswer.answer.answer : "Нет ответа"}</h3>
            </div>
        </div>
    )
}