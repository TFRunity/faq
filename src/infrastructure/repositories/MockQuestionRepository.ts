import {IQuestionRepository} from "@/src/application/repositories/IQuestionRepository";
import {QuestionWithAnswers, QuestionWithLatestAnswer} from "@/src/entities/models/view-models";

export class MockQuestionRepository implements IQuestionRepository {

    add(question : string) : Promise<QuestionWithLatestAnswer>{
        return Promise.resolve({question:{id: 1, question: 'question?', category_id: null, answer_id:null }, answer: null})
    }
    addWithAnswer(question : string, answer : string) : Promise<QuestionWithLatestAnswer>{
        return Promise.resolve({question:{id: 1, question: 'question?', category_id: null, answer_id:2 }, answer:{ id: 2, answer: 'answer', question_id: 1}})
    }
    delete(question_id : number) : Promise<boolean>{
        return Promise.resolve(question_id > 0)
    }
    updateQuestion(question_id : number, question : string) : Promise<QuestionWithLatestAnswer>{
        return Promise.resolve({question:{id: 1, question: 'updated question?', category_id: null, answer_id:2 }, answer:{ id: 2, answer: 'answer', question_id: 1}})
    }
    getAllWithoutCategory(): Promise<QuestionWithLatestAnswer[]> {
        return Promise.resolve
        ([
            {
                question:{id: 1, question: 'question?', category_id: null, answer_id:2 },
                answer:{ id: 2, answer: 'answer', question_id: 1}
            }
        ])
    }
    getWithHistoryOfAnswers(question_id: number): Promise<QuestionWithAnswers> {
        return Promise.resolve({
                question:{id: 1, question: 'question?', category_id: null, answer_id:2 },
                answers:[
                    { id: 3, answer: 'answer', question_id: 1},
                    { id: 2, answer: 'previous answer', question_id: 1}
                ]})
    }
    addAnswer(question_id: number, answer: string): Promise<QuestionWithLatestAnswer> {
        return Promise.resolve({question:{id: 1, question: 'question?', category_id: null, answer_id:3 }, answer:{ id: 3, answer: 'answer', question_id: 1}})
    }
    changeAnswerToPrevious(question_id: number, previous_answer_id: number): Promise<QuestionWithLatestAnswer> {
        return Promise.resolve({question:{id: 1, question: 'question?', category_id: null, answer_id:2 }, answer:{ id: 2, answer: 'answer', question_id: 1}})
    }
    addRelWithCategories(question_id: number, category_id: number): Promise<boolean> {
        return Promise.resolve(!(question_id <= 0 || category_id <= 0))
    }
    deleteRelWithCategories(question_id: number): Promise<boolean> {
        return Promise.resolve(!(question_id))
    }
}
