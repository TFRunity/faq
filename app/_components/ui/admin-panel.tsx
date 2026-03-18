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
import {checkAdmin} from "@/app/_actions/faqActions";

export type AdminPanelProps = {
    givePermissions: () => void
}

export default function AdminPanel({givePermissions} : AdminPanelProps) : ReactElement | null {

    const nameInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const [name, setName] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [destruct, setDestruct] = useState<boolean>(false);


    const closeDialog = () => {
        setDestruct(true)
    }

    const logIn = async () => {
        setName(nameInputRef.current!.value)
        setPassword(passwordInputRef.current!.value)
        const res : boolean = await checkAdmin(name, password)
        if (res === true) {
            givePermissions()
        }
    }

    if (destruct === true) {
        return null
    }

    return (
        <div className="modal-bg">
            <div className="modal-body">
                <div className="modal-header">
                    <h3>Админ-панель</h3>
                    <div onClick={closeDialog}>КРЕСТИК</div>
                </div>
                <div className='w-1 bg-gray-300 cursor-col-resize'></div>
                <div className='modal-content'>
                    <input type='text' defaultValue={name} ref={nameInputRef} />
                    <input type='text' defaultValue={password} ref={passwordInputRef} />
                    <button onClick={logIn} >Войти</button>
                </div>
            </div>
        </div>
    )
}