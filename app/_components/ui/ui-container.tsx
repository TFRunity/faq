'use client'

import '@/app/global-styles.css'
import React, {Suspense, useEffect, useState} from "react";
import Image from "next/image";
import {createPortal} from "react-dom";
import ListFaq from "@/app/_components/ui/list-faq";
import AdminPanel from "@/app/_components/ui/modal-admin-panel";
import {AdminButtons} from "@/app/_components/ui-with-logic/admin-buttons";
import {SearchBar} from "@/app/_components/ui-with-logic/searchbar";
import Loading from "@/app/loading";
import {isAuthorized} from "@/app/_actions/faq-actions";


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
    useEffect(() => {
        const a = async () => {
            const g = await isAuthorized()
            if (g) givePermission()
        }
        a()
    }, [])

    return (
        <>
            <div
                className=' ml-70 mr-70 mt-9 w-[98%] h-[98%] md:w-[95%] md:h-[80%] bg-white rounded-[1em] md:rounded-[2em] flex flex-col justify-center align-center shadow-[0_2px_5px_1.5px_rgba(0,0,0,0.1)] md:shadow-[0_5px_15px_3px_rgba(0,0,0,0.1)]'>
                <h1 className='mt-10 text-slate-700 mb-15 flex-auto flex justify-center text-[150%] md:text-[180%]'>{title}</h1>
                {!permission &&
                    <Suspense fallback={<Loading/>}>
                        <SearchBar></SearchBar>
                    </Suspense>
                }
                <ListFaq permission={permission}/>
                {!permission &&
                    <div className='cursor-pointer content-end mb-8 mt-7 ml-auto mr-8' onClick={openAdminModal}>
                        <Image src='/icons/admin.png' width='24' height='24' alt='admin' />
                    </div>
                }
                {showModal && createPortal(
                    <AdminPanel exitAction={openAdminModal} givePermissionsAction={givePermission}/>,
                    document.body
                )}
                {permission &&
                    <AdminButtons/>
                }
                {

                }
            </div>
        </>
    );
}