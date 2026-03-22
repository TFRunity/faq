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

import '@/app/global-styles.css'
import React, {useEffect} from "react";
import {useState} from "react";
import { Faq, getFaqs } from '@/app/_actions/faqActions';
import FaqItem from "@/app/_components/ui/faq-item";
import CreateFaqButton from "@/app/_components/ui-with-logic/create-faq-button";


export interface ListProps {
    isLoggedIn: boolean;
}

export default function ListFaq( { isLoggedIn } : ListProps) {

    const [faqs, setFaqs] = useState<Faq[]>([]);
    const [shouldRewrite, setShouldRewrite] = useState(false);

    useEffect(() : void => {
        const fetchFaqs = async (): Promise<void> => {
            setFaqs(await getFaqs());

        }
        fetchFaqs();
    }, [])

    useEffect(() => {

    }, [faqs]);

    const deleteFaqFunc = (id : number): void => {
        setFaqs(faqs.filter(faq  => faq.id !== id))
    }
    const createFaqFunc =  (newFaq : Faq):void => {
        const newFaqs : Faq[] = [...faqs, newFaq];
        setFaqs(newFaqs);
    }
    const updateFaqFunc = (updatedFaq : Faq) => {
        let oldFaqs : Faq[] = faqs.filter(faq => faq.id !== updatedFaq.id);
        oldFaqs = [...oldFaqs, updatedFaq];
        setFaqs(oldFaqs);
        setShouldRewrite(!shouldRewrite);
    }

    return (
        <div className='ml-7 mr-7'>
            {!shouldRewrite &&
                faqs.map((faq : Faq, index : number) => (
                    <div key={index}>
                        <FaqItem faq={faq} isLoggedIn={isLoggedIn} deleteFaqFunc={deleteFaqFunc} updateFaqFunc={updateFaqFunc}/>
                    </div>
                ))
            }
            {shouldRewrite &&
                faqs.map((faq : Faq, index : number) => (
                    <div key={index}>
                        <FaqItem faq={faq} isLoggedIn={isLoggedIn} deleteFaqFunc={deleteFaqFunc} updateFaqFunc={updateFaqFunc}/>
                    </div>
                ))
            }
            {isLoggedIn &&
                <CreateFaqButton createFaqPropMethod={createFaqFunc} isLoggedIn={isLoggedIn} />
            }
        </div>
    )
}