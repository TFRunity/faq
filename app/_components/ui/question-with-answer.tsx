'use client'

import {QuestionWithAnswer} from "@/app/_actions/faq-actions";
import React, {useState} from "react";
import Image from "next/image";
import {createPortal} from "react-dom";
import ModalUpdateFaq from "@/app/_components/ui-with-logic/modal-update-faq";
import "@/app/global-styles.css"
import {ModalDeleteQuestion} from "@/app/_components/ui-with-logic/modal-delete-question";
import {ModalEditRelations} from "@/app/_components/ui-with-logic/modal-edit-relations";
import {ModalHistoryAnswers} from "@/app/_components/ui-with-logic/modal-history-answers";
import styles from "@/app/_components/ui-with-logic/searchbar.module.css";



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
                    <div className='w-[80%] md:w-[60%] flex justify-between'>
                        <h3 className=' text-slate-900 text-[80%] md:text-[120%] mt-3 ml-6 mb-3 columns-1'>{questionWithAnswer.question.question ? questionWithAnswer.question.question : "Пустой вопрос"}</h3>
                    </div>
                    <div className='w-[20%] md:w-[40%] flex justify-end'>
                        <div className=' flex text-slate-600 text-[130%] cursor-pointer mt-3 mr-3 mb-2'>
                            {permission &&
                                <>
                                    <div onClick={openModalChange}
                                         className='cursor-pointer content-end ml-auto mr-7 mb-1 rounded-md hover:bg-slate-200 transition duration-300 p-0.5'>
                                        <Image src='/icons/edit.png' width='24' height='24' alt='edit'/>
                                    </div>
                                    <div onClick={openModalDelete}
                                         className='cursor-pointer content-end ml-auto mr-7 mb-1 rounded-md hover:bg-slate-200 transition duration-300 p-0.5'>
                                        <Image src='/icons/delete.png' width='24' height='24' alt='delete'/>
                                    </div>
                                    <div onClick={openModalRelationship}
                                         className='cursor-pointer content-end ml-auto mr-7 mb-1 rounded-md hover:bg-slate-200 transition duration-300 p-0.5'>
                                        <Image src='/icons/rel.png' width='24' height='24' alt='relation'/>
                                    </div>
                                    <div onClick={openModalHistory}
                                         className='cursor-pointer content-end ml-auto mr-7 mb-1 rounded-md hover:bg-slate-200 transition duration-300 p-0.5'>
                                        <Image src='/icons/history.png' width='24' height='24' alt='history'/>
                                    </div>
                                </>
                            }
                            <div onClick={toggleAnswer}
                                 className=' cursor-pointer content-end ml-auto mr-2 mb-1 rounded-md hover:bg-slate-200 transition duration-300 p-0.5'>{!toggle ?
                                <Image src='/icons/arrow-down.png' width='24' height='24' alt='+'/>
                                :
                                <Image src='/icons/arrow-up.png' width='24' height='24' alt='-'/>
                            }</div>
                        </div>
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
            <div className='text-slate-600 mt-3 ml-3 mb-3 ml-7' style={{ display : toggle ? 'flex' : 'none' }}>
                <h3 className='text-slate-700 text-[120%] '>{questionWithAnswer.answer && questionWithAnswer.answer.answer ? questionWithAnswer.answer.answer : "Нет ответа"}</h3>
            </div>
        </div>
    )
}