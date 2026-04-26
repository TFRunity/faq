'use client'

import {Group as GroupType} from "@/app/_actions/faq-actions"
import {ReactElement, useEffect, useState} from "react";
import Image from "next/image";
import {GroupButtons} from "@/app/_components/ui-with-logic/group-buttons";

export type GroupProps = {
    group : GroupType
    isActive : boolean
    setActiveAction : (group_id : number) => void
    permission : boolean
}

export function Group({ group, isActive, setActiveAction, permission }: GroupProps) : ReactElement {

    return (
        <div onClick={() => setActiveAction(group.id)} className={`h-22 cursor-pointer hover:bg-slate-50 duration-100 p-2 border-2 m-0.5 rounded-lg justify-between flex  ${isActive ? 'border-sky-300 transition duration-100' : ''}`}>
            <div className='place-content-center'>
                <Image src={`${group.image_src ? "/icons/groups/" + group.image_src + ".png" : "/icons/close.png"}`} width='36' height='36' alt="group" />
            </div>
            <h3 className='place-content-center p-2'>{group.title ? group.title : ''}</h3>
            {permission && <GroupButtons group={group}/>}
        </div>
    )

}
