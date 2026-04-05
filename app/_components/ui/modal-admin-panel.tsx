//шестеренка, лежит без логики потому что просто вызывается модальное окно, нет связи с контроллерами

/**
 * @remarks
 * Метод вызывает createPortal, в котором описывается форма.
 * Вызывается авторизация, ставится флаг в true, позже когда перейдем на весь ui, то получим доступ к БД и к ролям, =>
 * Вход будет синхронизирован с БД, пока просто заглушку ставим
 *
 * @returns
 * Компонент
 *
 */

'use client'

import '@/app/global-styles.css'
import {ReactElement, useEffect, useRef, useState} from "react";
import React from "react";
import {checkAdmin} from "@/app/_actions/faq-actions";

export type AdminPanelProps = {
    givePermissionsAction: () => void
    exitAction: () => void
}

export default function AdminPanel({givePermissionsAction, exitAction} : AdminPanelProps) : ReactElement | null {

    const nameInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const [name, setName] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const logIn = async () => {
        setName(nameInputRef.current!.value)
        setPassword(passwordInputRef.current!.value)
        const res : boolean = await checkAdmin(name, password)
        if (res) {
            givePermissionsAction()
            exitAction()
        }
    }

    return (
        <div className="modal-bg">
            <div className="modal-body">
                <div className="text-lg text-slate-800 mb-7 modal-header flex justify-between">
                    <h3>Админ-панель</h3>
                    <div className='cursor-pointer mt-1' onClick={exitAction}>
                        <img src='/icons/close.png' width='15' height='15'></img>
                    </div>
                </div>
                <div className='w-1 bg-gray-300 cursor-col-resize'></div>
                <div className='modal-content flex flex-col gap-3'>
                    <input className='border border-slate-400 rounded-md p-1' type='text' defaultValue={name} ref={nameInputRef} />
                    <input className='border border-slate-400 rounded-md p-1' type='text' defaultValue={password} ref={passwordInputRef} />
                    <button className='cursor-pointer mt-3 bg-slate-100 p-2' onClick={logIn} >Войти</button>
                </div>
            </div>
        </div>
    )
}