'use client'

import '@/app/global-styles.css'
import React, {useContext, useEffect, useState} from "react";
import {CategoriesStateContext, QuestionsStateContext} from "@/app/providers";
import {
    CategoryWithQuestionsWithAnswer,
    getCategoriesWithoutQuestions,
    QuestionWithAnswer
} from "@/app/_actions/faq-actions";
import Questions from "@/app/_components/ui/questions-without-category";
import {Category as CategoryModel} from "@/app/_actions/faq-actions";
import Category from "@/app/_components/ui-with-logic/category-with-questions";


export interface ListProps {
    permission: boolean;
    groupId: number;
}

export default function ListFaq( { permission, groupId } : ListProps) {

    const categories : CategoryWithQuestionsWithAnswer[] = useContext(CategoriesStateContext)
    const [emptyCategoriesMapped, setCategoriesMapped] = useState<CategoryModel[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const categories : CategoryModel[] = await getCategoriesWithoutQuestions(groupId)
            setCategoriesMapped(categories)
        }
        fetchCategories()
    }, [])



    if (categories.length == 0) {
        return (
            <>
                {
                    <div className='ml-7 mr-7 mb-4 mt-7'>
                        <h2>Пока что нет ни вопросов, ни категорий</h2>
                    </div>
                }
                {permission &&
                    <Questions permission={permission}/>
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
            {permission && emptyCategoriesMapped.length > 0 &&
                <div className='m-4'>
                    <h2>Все категории</h2>
                    {
                        emptyCategoriesMapped.map(c => (
                            <div key={c.id}>
                                <h3 className='text-slate-600 mb-1 ml-1'>{c.title}</h3>
                            </div>
                        ))
                    }
                </div>
            }
            {permission &&
                <Questions permission={permission}/>
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


