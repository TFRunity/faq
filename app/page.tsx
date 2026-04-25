'use client'

import {ReactElement} from "react";
import {Container} from "@/app/_components/ui/ui-container";

export default function Home()  : ReactElement{

    return (
        <div className='justify-center'>
            <Container title={"Часто задаваемые вопросы ЧГУ"}/>
        </div>
    )
}
