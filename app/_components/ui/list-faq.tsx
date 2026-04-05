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
import React, {useContext, useState} from "react";
import {CategoriesStateContext, QuestionsStateContext} from "@/app/providers";
import {CategoryWithQuestionsWithAnswer, QuestionWithAnswer} from "@/app/_actions/faq-actions";
import Questions from "@/app/_components/ui/questions-without-category";
import Category from "@/app/_components/ui-with-logic/category-with-questions";
import Image from "next/image";


export interface ListProps {
    permission: boolean;
}

export default function ListFaq( { permission } : ListProps) {

    const categories : CategoryWithQuestionsWithAnswer[] = useContext(CategoriesStateContext)

    if (categories === null) {
        return (
            <>
                <h2>Нет категорий</h2>
                {permission &&
                    <>
                        <h2>Вопросы на модерации</h2>
                        <Questions permission={permission}/>
                    </>
                }
            </>
        )
    }

    return (
        <div className='ml-7 mr-7'>
            {permission &&
                categories.map(category => (
                    <Category category={category} permission={permission}/>
                )) &&
                <Questions permission={permission}/>
            }
            {!permission &&
                categories.map(category => (
                    <Category category={category} permission={permission}/>
                ))
            }
        </div>
    )
}


