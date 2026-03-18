//Вся реализация вывода Faq
/**
 *
 * @remarks
 * Вывод основной информации о faq + рендер карандашика
 *
 * @returns
 * Компонент
 *
 * @param faq = Faq
 *
 *Примерная структура:
 *
 * <div>
 *     {faq!.question && faq!.answer &&
 *     <div>
 *       <h3>{faq!.question}</h3>
 *      <h4>{faq!.answer}
 *     </div>
 *     <div>
 *         <Pencil faq={faq} />
 *     </div>
 *     }
 * </div>
 *
 */

'use client'

import {Faq} from "@/app/_actions/faqActions";
import {ReactElement, useEffect, useState} from "react";
import '@/app/global-styles.css'

interface FaqProps {
    faq : Faq
}

export default function FaqItem ({faq} : FaqProps): ReactElement {

    const [question, setQuestion] = useState(faq.question)
    const [answer, setAnswer] = useState(faq.answer)

    function changeQuestion(text: string) : void {
        setQuestion(text)
    }
    function changeAnswer(text: string) : void {
        setAnswer(text)
    }

    return (
        <div>
            <div>
                <h3>{question}</h3>
            </div>
            <div className='hidden'>
                <h3>{answer}</h3>
            </div>
        </div>
    )
}
