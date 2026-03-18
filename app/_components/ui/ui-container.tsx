import '@/app/global-styles.css'
import {ReactElement} from "react";
import {AdminPanelProps} from "@/app/_components/ui/admin-panel";
import AdminPanel from "@/app/_components/ui/admin-panel"

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
    return (
        <div className='w-[98%] h-[98%] md:w-[95%] md:h-[80%]
        bg-white mt-[7%] rounded-[1em] md:rounded-[2em] flex flex-col
        justify-center align-center shadow-[0_2px_5px_1.5px_rgba(0,0,0,0.1)]
        md:shadow-[0_5px_15px_3px_rgba(0,0,0,0.1)] '>
            {path &&   }
            <h1 className='flex-auto flex justify-center' >{title}</h1>
            {isLogiIn && <ListFaq />}
            <AdminPanel givePermissions={}/>
        </div>
    )
}