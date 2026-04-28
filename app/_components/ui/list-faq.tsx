'use client'

import '@/app/global-styles.css'
import React, {Suspense, useContext, useEffect, useState} from "react";
import {CategoriesStateContext, QuestionsStateContext} from "@/app/providers";
import {
    CategoryWithQuestionsWithAnswer,
    getCategoriesWithoutQuestions,
    QuestionWithAnswer
} from "@/app/_actions/faq-actions";
import Questions from "@/app/_components/ui/questions-without-category";
import {Category as CategoryModel} from "@/app/_actions/faq-actions";
import Category from "@/app/_components/ui-with-logic/category-with-questions";
import Loading from "@/app/loading";


export interface ListProps {
    permission: boolean;
    groupId: number;
}

export default function ListFaq( { permission, groupId } : ListProps) {

    const categories : CategoryWithQuestionsWithAnswer[] = useContext(CategoriesStateContext)


    if (categories.length == 0) {
        return (
            <>
                {
                    <div className='text-center text-slate-400'>
                        <h1 className='text-[150%]'>Загрузка вопросов</h1>
                    </div>
                }
                {permission &&
                    <Questions groupId={groupId} permission={permission}/>
                }
            </>
        )
    }

    return (
        <div className='ml-7 mr-7 mb-4 mt-7'>
            {permission &&
                categories.map(category => (
                    <div key={category.category.id} >
                        <Category groupId={groupId} category={category} permission={permission}/>
                    </div>
                ))
            }
            {permission &&
                <Questions groupId={groupId} permission={permission}/>
            }
            {!permission &&
                categories.map(category => (
                    <div key={category.category.id}>
                        <Category groupId={groupId} category={category} permission={permission}/>
                    </div>
                ))
            }
        </div>
    )
}


