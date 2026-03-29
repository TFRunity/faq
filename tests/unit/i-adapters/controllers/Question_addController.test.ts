import {expect, it} from "vitest";
import {getInjection} from "@/di/container";

const addController = await getInjection('IQuestionAddController')

it('should add new question without answer', async () => {
    await expect(addController('question?'))
        .resolves
        .toEqual({question:{id: 1, question: 'question?', category_id: null, answer_id:null }, answer: null})
    await expect(addController('question?'))
        .resolves
        .not
        .toEqual({question:{id: 1, question: '', category_id: null, answer_id:null }, answer: null})
})