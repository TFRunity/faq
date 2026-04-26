"use client"

import {ReactElement, useContext, useState} from "react";
import {GroupsStateContext} from "@/app/providers";
import { Group as GroupType } from "@/app/_actions/faq-actions";
import {Group} from "@/app/_components/ui/group";

export type GroupsProps = {
    setActiveGroupAction : (group_id : number) => void;
    permission : boolean
}

export function Groups({setActiveGroupAction, permission} : GroupsProps) : ReactElement {

    const groups : GroupType[] = useContext(GroupsStateContext)

    const [activeId, setActiveId] = useState<number>(-1)
    const setActive = async (group_id : number) => {
        setActiveId(group_id)
        setActiveGroupAction(group_id)
    }

    if (!groups) {
        return (
            <h2>Факультетов не существует</h2>
        )
    }

    return (
        <div className='grid-cols-4 grid gap-1 mt-4'>
            {
                groups.map(g => (
                    <div key={g.id}>
                        <Group group={g} isActive={activeId == g.id} permission={permission} setActiveAction={setActive} />
                    </div>
                ))
            }
        </div>
    )

}