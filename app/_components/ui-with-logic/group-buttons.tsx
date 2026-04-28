'use client'

import {deleteGroup, Group as GroupType} from "@/app/_actions/faq-actions"
import Image from "next/image";
import React, {ActionDispatch, useContext, useState} from "react";
import {GroupsDispatchContext} from "@/app/providers";
import {GroupsActions} from "@/app/_hooks/faq-hooks";
import {createPortal} from "react-dom";
import {ModalEditGroup} from "@/app/_components/ui-with-logic/modal-edit-group";

export type GroupButtonsProps = {
    group : GroupType
}

export function GroupButtons({ group } : GroupButtonsProps) {

    const dispatchGroups : ActionDispatch<[action : GroupsActions]> = useContext(GroupsDispatchContext)
    const [showModal, setShowModal] = useState(false);

    const deleteG = async (group_id : number) => {
        const res : boolean = await deleteGroup(group_id)
        if (res) {
            dispatchGroups({
                type : "REMOVE_GROUP",
                group_id : group_id,
            })
        }
    }

    const openModal = () => {
        setShowModal(true);
    }
    const closeModal = () => {
        setShowModal(false);
    }



    return (
        <div className='grid grid-cols-2 w-[100px] gap-0.5'>
            <div onClick={openModal}
                 className='flex items-center cursor-pointer hover:bg-slate-200 md:p-2 rounded-md transition duration-200'>
                <Image src='/icons/edit.png' width='24' height='24' alt='close'/>
            </div>
            <div onClick={() => deleteG(group.id)}
                 className='flex items-center cursor-pointer hover:bg-slate-200 md:p-2 rounded-md transition duration-200'>
                <Image src='/icons/delete.png' width='24' height='24' alt='close'/>
            </div>
            {showModal && createPortal(
                <ModalEditGroup group={group} exitAction={closeModal} />,
                document.body
            )}
        </div>
    )

}