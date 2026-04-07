'use client'

import {QuestionWithAnswer} from "@/app/_actions/faq-actions";
import React, {useState} from "react";
import Image from "next/image";
import {createPortal} from "react-dom";
import ModalUpdateFaq from "@/app/_components/ui-with-logic/modal-update-faq";
import "@/app/global-styles.css"
import {ModalDeleteQuestion} from "@/app/_components/ui-with-logic/modal-delete-question";
import {ModalEditRelations} from "@/app/_components/ui-with-logic/modal-edit-relations";
import {create} from "node:domain";
import {ModalHistoryAnswers} from "@/app/_components/ui-with-logic/modal-history-answers";



export interface QuestionWithAnswerProps {
    questionWithAnswer: QuestionWithAnswer;
    permission : boolean;
}

export default function Question({questionWithAnswer, permission} : QuestionWithAnswerProps) {

    const [toggle, setToggle] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
    const [showModalRelationship, setShowModalRelationship] = useState<boolean>(false);
    const [showModalHistory, setShowModalHistory] = useState<boolean>(false);

    function toggleAnswer() {
        setToggle(!toggle);
    }

    function openModalChange() {
        setShowModal(true);
    }
    function closeModalChange() {
        setShowModal(false);
    }

    function openModalDelete() {
        setShowModalDelete(true);
    }
    function closeModalDelete() {
        setShowModalDelete(false);
    }
    
    function openModalRelationship() {
        setShowModalRelationship(true);
    }
    function closeModalRelationship() {
        setShowModalRelationship(false);
    }

    function openModalHistory() {
        setShowModalHistory(true);
    }
    function closeModalHistory() {
        setShowModalHistory(false);
    }

    return (
        <div className='flex flex-col columns-10'>
            <div className='m-1'>
                <div className='rounded-lg bg-slate-100 flex justify-between'>
                    <h3 className=' text-slate-900 text-[120%] mt-3 ml-3 mb-2'>{questionWithAnswer.question.question ? questionWithAnswer.question.question : "Пустой вопрос"}</h3>
                    <div className=' text-slate-600 text-[130%] cursor-pointer mt-3 mr-3 mb-2'>
                        {permission &&
                            <>
                                <div onClick={openModalChange}
                                     className='cursor-pointer content-end ml-auto mr-7 flex-row'>
                                    <Image src={"/icons/pencil.png"} width='30' height='30' alt={"Изменить"}
                                           loading="lazy"/>
                                </div>
                                <div onClick={openModalDelete}
                                     className='cursor-pointer content-end ml-auto mr-7 flex-row'>
                                    <Image src={"/icons/close.png"} width='30' height='30' alt={"X"}
                                           loading="lazy"/>
                                </div>
                                <div onClick={openModalRelationship}
                                     className='cursor-pointer content-end ml-auto mr-7 flex-row'>
                                    <Image src={"/icons/relation.png"} width='30' height='30' alt={"Связь"}
                                           loading="lazy"/>
                                </div>
                                <div onClick={openModalHistory} className='cursor-pointer content-end ml-auto mr-7 flex-row'>
                                    <Image src={"/icons/column.png"} width='30' height='30' alt={"История"}
                                           loading="lazy"/>
                                </div>
                            </>
                        }
                        <h2 onClick={toggleAnswer}>+</h2>
                    </div>
                </div>
                {showModalHistory && createPortal(
                    <ModalHistoryAnswers questionToUpdate={questionWithAnswer.question} exitAction={closeModalHistory} />,
                    document.body
                )}
                {showModal && createPortal(
                    <ModalUpdateFaq questionWithAnswer={questionWithAnswer} exitAction={closeModalChange} />,
                    document.body
                )}
                {showModalDelete && createPortal(
                    <ModalDeleteQuestion question={questionWithAnswer.question} exitAction={closeModalDelete} />,
                    document.body
                )}
                {showModalRelationship && createPortal(
                    <ModalEditRelations questionWithAnswer={questionWithAnswer} exitAction={closeModalRelationship} />,
                    document.body
                )}
            </div>
            <div className='text-slate-600 mt-3 ml-3 mb-2' style={{ display : toggle ? 'flex' : 'none' }}>
                <h3 className='text-slate-700 text-[120%] '>{questionWithAnswer.answer && questionWithAnswer.answer.answer ? questionWithAnswer.answer.answer : "Нет ответа"}</h3>
            </div>
        </div>
    )
}