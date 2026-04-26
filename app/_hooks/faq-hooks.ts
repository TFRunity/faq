import {Answer, Category, CategoryWithQuestionsWithAnswer, Group, Question} from "@/app/_actions/faq-actions"
import {useReducer, useState} from "react";
import {QuestionWithAnswer} from "@/app/_actions/faq-actions";


export type CategoryWithQuestionsWithAnswerActions =
    | {type : 'CHANGE_CATEGORY_NAME'; category_id : number, title : string}
    | {type : 'UPDATE_QUESTION_QUESTION'; question : QuestionWithAnswer}
    | {type : 'ADD_QUESTION'; question : QuestionWithAnswer}
    | {type : 'DELETE_QUESTION'; question_id : number, category_id : number}
    | {type : 'DELETE_CATEGORY'; category_id : number}
    | {type : 'ADD_CATEGORY'; category: Category}
    | {type : 'UPDATE_ANSWER'; question_id : number, answer_id : number, answer : string, category_id : number}
    | {type : 'FILL_WITH_DATA'; data : CategoryWithQuestionsWithAnswer[]}

export type QuestionWithAnswerActions =
    | {type : 'ADD_QUESTION'; questionWithAnswer: QuestionWithAnswer}
    | {type : 'ADD_QUESTIONS'; questions : QuestionWithAnswer[]} //Когда удалили какую-то категорию и теперь все вопросы оттуда становятся без категории
    | {type : 'REMOVE_QUESTION'; question_id : number}  //После перемещения вопроса в категорию
    | {type : 'CHANGE_QUESTION'; question_id : number, question : Question}
    | {type : 'CHANGE_ANSWER'; question_id : number, answer : Answer}
    | {type : 'FILL_WITH_DATA'; data : QuestionWithAnswer[]}

export type GroupsActions =
    | {type : 'ADD_GROUP'; group : Group}
    | {type : 'REMOVE_GROUP'; group_id : number}
    | {type : 'UPDATE_GROUP'; group : Group}
    | {type : 'FILL_WITH_DATA'; data : Group[]}


export function useCategories(data : CategoryWithQuestionsWithAnswer[] | null) {

    function categoriesReducer(state : CategoryWithQuestionsWithAnswer[] | null, action : CategoryWithQuestionsWithAnswerActions) {
        switch (action.type) {
            case "ADD_CATEGORY":
                return [...state!, { category : action.category, questions : [] }]
            case "DELETE_CATEGORY":
                return [...state!.filter(c => c.category.id !== action.category_id)]
            case "CHANGE_CATEGORY_NAME":
                return [...state!.map(c => c.category.id === action.category_id ? { ...c, category : { ...c.category, title : action.title } } : c)]
            case "UPDATE_QUESTION_QUESTION":
                return [...state!.map(c => c.category.id === action.question.question.category_id ? { ...c, questions : [...c.questions!.map(q => q.question.id == action.question.question.id ? action.question : q)] } : c )]
            case "ADD_QUESTION":
                return [...state!.map(c => c.category.id === action.question.question.category_id ? {...c, questions : [...c.questions!, action.question] } : c)]
            case "DELETE_QUESTION":
                return [...state!.map(c => c.category.id === action.category_id ? {...c, questions : [...c.questions!.filter(q => q.question.id !== action.question_id)]} : c)]
            case "UPDATE_ANSWER":
                return [...state!.map(c => c.category.id === action.category_id ? { ...c, questions : [...c.questions!.map(q => q.answer?.question_id == action.question_id ? {...q, answer : { id : action.answer_id, answer : action.answer, question_id : action.question_id } } : q)]} : c)]
            case "FILL_WITH_DATA":
                return [...action.data]
            default:
                return state;
        }
    }

    const [categories, dispatchCategories] = useReducer(categoriesReducer,data)

    return {
        categories, dispatchCategories
    }
}

export function useQuestionsWithAnswer(data : QuestionWithAnswer[] | null) {

    function questionsReducer(state : QuestionWithAnswer[] | null, action : QuestionWithAnswerActions) {
        switch (action.type) {
            case "ADD_QUESTION":
                return [...state!, action.questionWithAnswer]
            case "ADD_QUESTIONS":
                return [...state!, ...action.questions]
            case "REMOVE_QUESTION":
                return [...state!.filter(q => q.question.id !== action.question_id)]
            case "CHANGE_QUESTION":
                return [...state!.map(q => q.question.id === action.question_id ? {...q, question : action.question} : q) ]
            case "CHANGE_ANSWER":
                return [...state!.map(q => q.question.id === action.question_id ? {...q, answer : action.answer} : q) ]
            case "FILL_WITH_DATA":
                return [...action.data]
            default:
                return state;
        }
    }

    const [questions, dispatchQuestions] = useReducer(questionsReducer,data)

    return {
        questions,
        dispatchQuestions
    }

}

export function useGroups(data : Group[] | null) {

    function groupsReducer(state : Group[] | null, action : GroupsActions) {
        switch (action.type) {
            case "ADD_GROUP":
                return [...state!, action.group]
            case "REMOVE_GROUP":
                return [...state!.filter(g => g.id !== action.group_id)]
            case "UPDATE_GROUP":
                return [...state!.map(g => g.id !== action.group.id ? g : { ...g, title : action.group.title, image_src : action.group.image_src } )]
            case "FILL_WITH_DATA":
                return [...action.data]
            default:
                return state;
        }
    }

    const [groups, dispatchGroups] = useReducer(groupsReducer,data)

    return {
        groups,
        dispatchGroups
    }
}
