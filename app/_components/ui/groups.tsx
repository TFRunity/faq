"use client"

import {ReactElement, useContext, useState} from "react";
import {GroupsStateContext} from "@/app/providers";
import { Group as GroupType } from "@/app/_actions/faq-actions";
import {Group} from "@/app/_components/ui/group";

export type GroupsProps = {
    setActiveGroupAction : (group_id : number) => void;
}

export function Groups({} : GroupsProps) : ReactElement {

    const groups : GroupType[] = useContext(GroupsStateContext)

    const [activeId, setActiveId] = useState<number>(-1)
    const setActive = async (group_id : number) => {
        setActiveId(group_id)
    }

    if (!groups) {
        return (
            <h2>Факультетов не существует</h2>
        )
    }

    return (
        <div className='h-[20%] md:h-[15%] w-90% md:w-95 flex flex-col columns-8'>
            {
                groups.map(g => (
                    <Group group={g} isActive={activeId == g.id} setActiveAction={setActive} />
                ))
            }
        </div>
    )

}