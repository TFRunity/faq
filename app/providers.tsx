'use client'

import {createContext, useEffect} from 'react'
import {useCategories, useQuestionsWithAnswer} from "@/app/_hooks/faq-hooks";
import {
    CategoryWithQuestionsWithAnswer,
    getAllWithLatestAnswers,
    getQuestionsWithoutCategory,
    QuestionWithAnswer,
} from "@/app/_actions/faq-actions";
import Loading from "@/app/loading";



export const CategoriesStateContext = createContext<any>(null)
export const CategoriesDispatchContext = createContext<any>(null)
export const QuestionsStateContext = createContext<any>(null)
export const QuestionsDispatchContext = createContext<any>(null)

export function AppProvider({ children }: { children: React.ReactNode }) {
    const {categories, dispatchCategories} = useCategories(null)
    const {questions, dispatchQuestions} = useQuestionsWithAnswer(null)

    useEffect(()=>{
        const fetchCategories = async () : Promise<void> => {
            const returned : CategoryWithQuestionsWithAnswer[] = await getAllWithLatestAnswers()
            dispatchCategories({type : "FILL_WITH_DATA", data : returned})
        }
        fetchCategories()
        const fetchQuestionsWithoutCategory = async () : Promise<void> => {
            const returned : QuestionWithAnswer[] = await getQuestionsWithoutCategory()
            dispatchQuestions({type : "FILL_WITH_DATA", data : returned})
        }
        fetchQuestionsWithoutCategory()
    }, [])

    if (categories === null && questions === null) {
        return (
            <Loading/>
        )
    }

    if (!!categories) {
        return (
            <CategoriesStateContext.Provider value={categories}>
                <CategoriesDispatchContext.Provider value={dispatchCategories}>
                    <QuestionsStateContext value={questions} >
                        <QuestionsDispatchContext value={dispatchQuestions}>
                            {children}
                        </QuestionsDispatchContext>
                    </QuestionsStateContext>
                </CategoriesDispatchContext.Provider>
            </CategoriesStateContext.Provider>
        )
    }
}