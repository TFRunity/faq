'use client'

import {CategoryWithQuestionsWithAnswer, QuestionWithAnswer, Answer, Question, getAllWithLatestAnswers} from '@/app/_actions/faq-actions'
import {ReactElement, useEffect, useState} from "react";
import {useCategories} from "@/app/_hooks/faq-hooks";

export default function Home()  : ReactElement | null{

    const {categories, dispatchCategories} = useCategories(null);

    useEffect(()=>{
        const fetchCategories = async () : Promise<void> => {
            const returned : CategoryWithQuestionsWithAnswer[] = await getAllWithLatestAnswers()
            dispatchCategories({type : "FILL_WITH_DATA", data : returned})
        }
        fetchCategories()
    }, [])

    //При объявлении, пока выполняется запрос из useEffect
    if (categories === null) {
        return null;
    }

    return (
        <div>
            {categories[0].category.title}
        </div>
    )
}
