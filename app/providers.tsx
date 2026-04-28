'use client'

import {createContext, useEffect} from 'react'
import {useCategories, useGroups, useQuestionsWithAnswer} from "@/app/_hooks/faq-hooks";
import {
    CategoryWithQuestionsWithAnswer, getAllGroups, getDefaultCategoryWithQuestionsWithLatestAnswers,
    getQuestionsWithoutCategory, Group,
    QuestionWithAnswer,
} from "@/app/_actions/faq-actions";
import Loading from "@/app/loading";



export const CategoriesStateContext = createContext<any>(null)
export const CategoriesDispatchContext = createContext<any>(null)
export const QuestionsStateContext = createContext<any>(null)
export const QuestionsDispatchContext = createContext<any>(null)
export const GroupsStateContext = createContext<any>(null)
export const GroupsDispatchContext = createContext<any>(null)

export function AppProvider({ children }: { children: React.ReactNode }) {
    const {categories, dispatchCategories} = useCategories(null)
    const {questions, dispatchQuestions} = useQuestionsWithAnswer(null)
    const {groups, dispatchGroups} = useGroups(null)

    useEffect(()=>{
        const fetchCategories = async () : Promise<void> => {
            const returned : CategoryWithQuestionsWithAnswer[] = await getDefaultCategoryWithQuestionsWithLatestAnswers()
            dispatchCategories({type : "FILL_WITH_DATA", data : returned})
        }
        fetchCategories()
        const fetchQuestionsWithoutCategory = async () : Promise<void> => {
            const returned : QuestionWithAnswer[] = await getQuestionsWithoutCategory()
            dispatchQuestions({type : "FILL_WITH_DATA", data : returned})
        }
        fetchQuestionsWithoutCategory()
        const fetchGroups = async () : Promise<void> => {
            const returned : Group[] | null = await getAllGroups()
            if (returned){
                dispatchGroups({type: "FILL_WITH_DATA", data : returned})
            }
            else{
                dispatchGroups({type: "FILL_WITH_DATA", data : []})
            }
        }
        fetchGroups()
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
                            <GroupsStateContext value={groups}>
                                <GroupsDispatchContext value={dispatchGroups}>
                                    {children}
                                </GroupsDispatchContext>
                            </GroupsStateContext>
                        </QuestionsDispatchContext>
                    </QuestionsStateContext>
                </CategoriesDispatchContext.Provider>
            </CategoriesStateContext.Provider>
        )
    }
}