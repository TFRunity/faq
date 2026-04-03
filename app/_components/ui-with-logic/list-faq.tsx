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
import React, {useContext} from "react";
import {CategoriesStateContext, QuestionsStateContext} from "@/app/providers";
import {CategoryWithQuestionsWithAnswer, QuestionWithAnswer} from "@/app/_actions/faq-actions";


export interface ListProps {
    isLoggedIn: boolean;
}

export default function ListFaq( { isLoggedIn } : ListProps) {

    const categories : CategoryWithQuestionsWithAnswer[] = useContext(CategoriesStateContext)

    if (categories === null) {
        return (
            <h2>Нет категорий</h2>
        )
    }

    return (
        <div className='ml-7 mr-7'>
            {isLoggedIn &&
                categories.map(category => (
                    <Category category={category} permission={isLoggedIn}/>
                )) &&
                <Questions />
            }
            {!isLoggedIn &&
                categories.map(category => (
                    <Category category={category} permission={isLoggedIn}/>
                ))
            }
        </div>
    )
}


