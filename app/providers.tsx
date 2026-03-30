'use client'

import {Context, createContext, useEffect} from 'react'
import {useCategories} from "@/app/_hooks/faq-hooks";
import {CategoryWithQuestionsWithAnswer, getAllWithLatestAnswers} from "@/app/_actions/faq-actions";



const CategoriesStateContext = createContext<any>(null)
const CategoriesDispatchContext = createContext<any>(null)

export function AppProvider({ children }: { children: React.ReactNode }) {
    const {categories, dispatchCategories} = useCategories(null)

    useEffect(()=>{
        const fetchCategories = async () : Promise<void> => {
            const returned : CategoryWithQuestionsWithAnswer[] = await getAllWithLatestAnswers()
            dispatchCategories({type : "FILL_WITH_DATA", data : returned})
        }
        fetchCategories()
    }, [])

    if (categories === null) {
        return (
            <div>
                
            </div>
        )
    }

    if (!!categories) {
        return (
            <CategoriesStateContext.Provider value={categories}>
                <CategoriesDispatchContext.Provider value={dispatchCategories}>
                    {children}
                </CategoriesDispatchContext.Provider>
            </CategoriesStateContext.Provider>
        )
    }
}