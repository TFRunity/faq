'use client'

import '@/app/global-styles.css'
import {ReactElement, useEffect, useRef, useState} from "react";
import React from "react";
import {checkAdmin} from "@/app/_actions/faq-actions";
import styles from "@/app/_components/ui-with-logic/searchbar.module.css";
import Image from "next/image";

export type AdminPanelProps = {
    givePermissionsAction: () => void
    exitAction: () => void
}

export default function AdminPanel({givePermissionsAction, exitAction} : AdminPanelProps) : ReactElement | null {

    const nameInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);

    const logIn = async ()=>{
        await exitF()
    }

    const exitF = async () => {
        const res : boolean = await checkAdmin(nameInputRef.current!.value,passwordInputRef.current!.value)
        console.log(name)
        // const res = true
        if (res) {
            givePermissionsAction()
            exitAction()
        }
    }

    return (
        <div className="modal-bg">
            <div className="modal-body flex flex-col gap-1">
                <div className="text-lg text-slate-800 mb-7 modal-header flex justify-between">
                    <h3 className='p-2'>Админ-панель</h3>
                    <div className='cursor-pointer hover:bg-slate-200 md:p-2 rounded-md transition duration-200' onClick={exitAction}>
                        <Image src='/icons/close.png' width='24' height='24' alt='close' />
                    </div>
                </div>
                <div className="border-t-4 rounded-2xl w-auto border-gray-400 md:m-2"></div>
                <div className='modal-content flex flex-col gap-3 mt-2'>
                <input className='border border-slate-400 rounded-md p-1' placeholder='Логин' type='text' defaultValue=''
                           ref={nameInputRef}/>
                    <input className='border border-slate-400 rounded-md p-1' placeholder='Пароль' type='text' defaultValue=''
                           ref={passwordInputRef}/>
                    <button className='cursor-pointer mt-3 bg-slate-100 p-2 hover:bg-slate-200 transition duration-200' onClick={logIn}>Войти</button>
                </div>
            </div>
        </div>
    )
}