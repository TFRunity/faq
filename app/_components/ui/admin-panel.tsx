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
import {ReactElement, useEffect, useState} from "react";
import React from "react";

export type AdminPanelProps = {
    givePermissions: () => void
}

export default function AdminPanel({givePermissions} : AdminPanelProps) : ReactElement {

    const [name, setName] = useState("")
    const [password, setPassword] = useState("")

    function compare() : boolean {
        if (process.env.PASSWORD === password && process.env.NAME === name) {
            return true
        }
        return false
    }

    useEffect(() => {
        const res : boolean = compare()
        if (res === true) {
            givePermissions()
        }
    }, [name, password])


    return (
        <div className="modal">

        </div>
    )
}