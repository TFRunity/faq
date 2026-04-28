
import {Group as GroupType, updateGroup} from "@/app/_actions/faq-actions"
import Image from "next/image";
import React, {ActionDispatch, useContext, useRef} from "react";
import {GroupsDispatchContext} from "@/app/providers";
import {GroupsActions} from "@/app/_hooks/faq-hooks";

export type ModalEditGroupProps = {
    group : GroupType
    exitAction : () => void
}

export function ModalEditGroup ({group, exitAction} : ModalEditGroupProps) {

    const dispatchGroups : ActionDispatch<[action : GroupsActions]> = useContext(GroupsDispatchContext)

    const titleInputRef = useRef<HTMLInputElement>(null);
    const image_srcInputRef = useRef<HTMLInputElement>(null);

    const submit = async () => {
        const title : string = titleInputRef.current!.value;
        const image_src : string = image_srcInputRef.current!.value;

        if (title !== group.title || image_src !== group.image_src) {
            const res : boolean = await updateGroup({...group, title : title, image_src : image_src});
            if (res) {
                dispatchGroups({
                    type : "UPDATE_GROUP",
                    group : {...group, title : title, image_src : image_src},
                })
            }
        }
        exitAction();
    }

    return (
        <div className="modal-bg">
            <div className="modal-body flex flex-col gap-1">
                <div className="text-lg text-slate-800 mb-7 modal-header flex justify-between">
                    <h3 className='p-2'>Изменение группы</h3>
                    <div className='cursor-pointer hover:bg-slate-200 md:p-2 rounded-md transition duration-200'
                         onClick={exitAction}>
                        <Image src='/icons/close.png' width='24' height='24' alt='close'/>
                    </div>
                </div>
                <div className="border-t-4 rounded-2xl w-auto border-gray-400 md:m-2"></div>
                <div className='modal-content flex flex-col gap-3 mt-2'>
                    <input className='border border-slate-400 rounded-md p-1' placeholder='Название группы' type='text'
                           defaultValue={group.title ? group.title : ""}
                           ref={titleInputRef}/>
                    <input className='border border-slate-400 rounded-md p-1' placeholder='Название картинки' type='text'
                           defaultValue={group.image_src ? group.image_src : ""}
                           ref={image_srcInputRef}/>
                    <button className='cursor-pointer mt-3 bg-slate-100 p-2 hover:bg-slate-200 transition duration-200'
                            onClick={submit}>Подтвердить
                    </button>
                </div>
            </div>
        </div>
    )

}