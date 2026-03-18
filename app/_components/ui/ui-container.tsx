import '@/app/global-styles.css'
import {ReactElement, useEffect, useState} from "react";
import {AdminPanelProps} from "@/app/_components/ui/admin-panel";
import AdminPanel from "@/app/_components/ui/admin-panel"
import ListFaq from "@/app/_components/ui-with-logic/list-faq";
import {createPortal} from "react-dom";

/**
 *
 * @remarks
 * Внутри рендерится весь faq
 * Будут компоненты:
 * <AdminPanel/>
 * <List/>
 *
 * @param title = Заголовок компонента
 * @param path = Адрес картинки, используемой в компоненте НАД заголовком
 *
 * @returns
 * Компонент
 *
 *
 */

export type ContainerProps = {
    title: string,
    path: string | null,
}

export function Container( {title, path}: ContainerProps  ) : ReactElement {

    const [permission, setPermission] = useState<boolean>(false)
    const [showModal, setShowModal] = useState<boolean>(false)

    const changePermission = () : void => {
        setPermission(true)
        setShowModal(false)
    }

    const openAdminPanel = () => {
        setShowModal(true)
    }

    return (
        <div className='w-[98%] h-[98%] md:w-[95%] md:h-[80%] bg-white mt-[7%] rounded-[1em] md:rounded-[2em] flex flex-col justify-center align-center shadow-[0_2px_5px_1.5px_rgba(0,0,0,0.1)] md:shadow-[0_5px_15px_3px_rgba(0,0,0,0.1)] '>
            {path &&  <h2>path</h2>}
            <h1 className='flex-auto flex justify-center' >{title}</h1>
            <ListFaq isLoggedIn={permission}/>
            {!permission && <div className='content-end' onClick={openAdminPanel}>Шестеренка</div>}
            {showModal && createPortal(
                <AdminPanel givePermissions={changePermission}/>,
                document.body
            )}
        </div>
    )
}