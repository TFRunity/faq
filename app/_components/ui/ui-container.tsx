'use client'

import '@/app/global-styles.css'
import React, {ActionDispatch, Suspense, useContext, useEffect, useState} from "react";
import Image from "next/image";
import {createPortal} from "react-dom";
import ListFaq from "@/app/_components/ui/list-faq";
import AdminPanel from "@/app/_components/ui/modal-admin-panel";
import {AdminButtons} from "@/app/_components/ui-with-logic/admin-buttons";
import {SearchBar} from "@/app/_components/ui-with-logic/searchbar";
import Loading from "@/app/loading";
import {
    CategoryWithQuestionsWithAnswer,
    getAllGroups,
    getCategoryWithQuestionsWithLatestAnswers,
    Group,
    isAuthorized
} from "@/app/_actions/faq-actions";
import {Groups} from "@/app/_components/ui/groups";
import {CategoryWithQuestionsWithAnswerActions, useCategories} from "@/app/_hooks/faq-hooks";
import {CategoriesDispatchContext} from "@/app/providers";


export type ContainerProps = {
    title: string
}

export function Container({title} : ContainerProps) {

    const dispatchCategories : ActionDispatch<[action : CategoryWithQuestionsWithAnswerActions]> = useContext(CategoriesDispatchContext)

    const [permission, setPermission] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [groupId, setGroupId] = useState<number>(1);
    const [groupName, setGroupName] = useState<string>('');

    const openAdminModal = () => {
        setShowModal(!showModal);
    }
    const givePermission = () => {
        setPermission(true);
    }

    useEffect(() => {
        const c = async () => {
            const res : Group[] = await getAllGroups()
            if (res) {
                const g : Group = res.filter(g => g.id === groupId)[0]
                setGroupName(g.title ? g.title : '')
            }
        }
        c()
        const b = async () => {
            const newCategories : CategoryWithQuestionsWithAnswer[] = await getCategoryWithQuestionsWithLatestAnswers(groupId)
            dispatchCategories({
                type : "FILL_WITH_DATA",
                data : newCategories
            })
        }
        b()
    }, [groupId]);

    const changeGroupAction = async (group_id : number) => {
        if (group_id > 0) {
            setGroupId(group_id)
        }
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
                className='mt-9 w-[98%] h-[98%] p-7 md:w-[1280px] bg-white rounded-[1em] md:rounded-[2em] flex flex-col justify-center align-center shadow-[0_2px_5px_1.5px_rgba(0,0,0,0.1)] md:shadow-[0_5px_15px_3px_rgba(0,0,0,0.1)]'>
                <h1 className='mt-[5%] text-slate-700 flex-auto flex justify-center text-[100%] md:text-[180%]'>{title}</h1>
                <Groups permission={permission} setActiveGroupAction={changeGroupAction}/>
                {groupId != 1 && <h3 className='mt-5 text-slate-700 mb-5 flex-auto flex justify-center text-[100%] md:text-[180%]'>{groupName}</h3>}
                {groupId == 1 && <h3 className='mt-5 text-slate-700 mb-5 flex-auto flex justify-center text-[100%] md:text-[180%]'>Общие вопросы</h3>}
                <Suspense fallback={<Loading/>}>
                    <SearchBar groupId={groupId.toString()}></SearchBar>
                </Suspense>
                <ListFaq groupId={groupId} permission={permission}/>
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
                    <AdminButtons groupId={groupId}/>
                }
            </div>
        </>
    );
}