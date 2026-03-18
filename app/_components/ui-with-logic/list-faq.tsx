//Компонент вызывается, просто показывает список всех faq, вызывает контроллер для получения всех FAQ, пока те грузятся - надо показать loading

/**
 *
 * @remarks
 * Возвращает список всех faq с возможностью изменения
 *
 * @returns
 * Компонент
 *
 * Примерная структура:
 * <div className = 'что-то своё, чтобы не выглядело совсем плохо'>
 *     {
 *         array.map(() => {
 *             <faq-item params = {что-то} />
 *         })
 *     }
 * </div>
 *
 */

'use client'

import React, {useEffect} from "react";
import {useState} from "react";
import { Faq, getFaqs } from '@/app/_actions/faqActions';
import FaqItem from "@/app/_components/ui/faq-item";

//Чтобы передавалось зашел ли админ в виде пропсов

export interface ListProps {
    isLoggedIn: boolean;
}

export default function ListFaq( { isLoggedIn } : ListProps) {

    const [faqs, setFaqs] = useState<Faq[]>([]);

    useEffect(() : void => {
        const fetchFaqs = async (): Promise<void> => {
            setFaqs(await getFaqs());
            //setFaqs([{id: 1, question : 'que1', answer : 'ans1'}, {id: 2, question : 'que2', answer : 'ans2'}])
        }
        fetchFaqs();
    }, [])

    useEffect(() => {

    }, [faqs])

    return (
        <div>
            {
                faqs.map((faq : Faq) => (
                    <div key={faq.id}>
                        <FaqItem faq={faq} isLoggedIn={isLoggedIn} />
                    </div>
                ))
            }
        </div>
    )
}