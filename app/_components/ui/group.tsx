'use client'

import {Group as GroupType} from "@/app/_actions/faq-actions"
import {ReactElement, useEffect, useState} from "react";
import Image from "next/image";

export type GroupProps = {
    group : GroupType
    isActive : boolean
    setActiveAction : (group_id : number) => void
}

export function Group({ group, isActive, setActiveAction }: GroupProps) : ReactElement {

    return (
        <div onClick={() => setActiveAction(group.id)} className={`md:m-3 m-2 md:p-4 p-2 rounded-lg col-1 flex flex-col ${isActive ? 'border-4 border-sky-300 transition-all duration-200' : ''}`}>
            <Image src={`${group.image_src ? group.image_src : ''}`} width='24' height='24' alt="group" />
            <h3 className='flex flex-wrap'>{group.title ? group.title : 'Нет названия'}</h3>
        </div>
    )

}
