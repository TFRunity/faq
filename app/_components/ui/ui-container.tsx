'use client'

import '@/app/global-styles.css'
import React, {createContext, Suspense, useContext, useState} from "react";
import Image from "next/image";
import {createPortal} from "react-dom";
import ListFaq from "@/app/_components/ui/list-faq";
import AdminPanel from "@/app/_components/ui/modal-admin-panel";
import {AdminButtons} from "@/app/_components/ui-with-logic/admin-buttons";
import {SearchBar} from "@/app/_components/ui-with-logic/searchbar";
// import {ReactElement, useEffect, useState} from "react";
// import {AdminPanelProps} from "@/app/_components/ui/admin-panel";
// import AdminPanel from "@/app/_components/ui/admin-panel"
// import ListFaq from "@/app/_components/ui-with-logic/list-faq";
// import {createPortal} from "react-dom";

/**
 *
 * @remarks
 * Внутри рендерится весь faq
 * Будут компоненты:
 * <AdminPanel/>
 * <List/>
 *
 * @param title Заголовок компонента
 * @param path Адрес картинки, используемой в компоненте НАД заголовком
 *
 * @returns
 * Компонент
 *
 *
 */


export type ContainerProps = {
    title: string
}

export function Container({title} : ContainerProps) {

    const [permission, setPermission] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);

    const openAdminModal = () => {
        setShowModal(!showModal);
    }
    const givePermission = () => {
        setPermission(true);
    }

    return (
        <>
            <div
                className=' ml-70 mr-70 mt-9 w-[98%] h-[98%] md:w-[95%] md:h-[80%] bg-white rounded-[1em] md:rounded-[2em] flex flex-col justify-center align-center shadow-[0_2px_5px_1.5px_rgba(0,0,0,0.1)] md:shadow-[0_5px_15px_3px_rgba(0,0,0,0.1)]'>
                <h1 className='mt-10 text-slate-700 mb-15 flex-auto flex justify-center text-[150%] md:text-[180%]'>{title}</h1>

                <Suspense>
                    <SearchBar></SearchBar>
                </Suspense>

                <ListFaq permission={permission}/>
                {!permission &&
                    <div className='cursor-pointer content-end mb-5 mt-5 ml-auto mr-7' onClick={openAdminModal}>
                        <Image src='/icons/admin.png' width='30' height='30' alt={'Админ'} loading='eager'/>
                    </div>
                }
                {showModal && createPortal(
                    <AdminPanel exitAction={openAdminModal} givePermissionsAction={givePermission}/>,
                    document.body
                )}
                {permission &&
                    <AdminButtons/>
                }
            </div>
        </>
    );
}