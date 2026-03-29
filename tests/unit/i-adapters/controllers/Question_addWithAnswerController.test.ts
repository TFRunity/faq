import {expect, it} from "vitest";
import {getInjection} from "@/di/container";

const addWithAnswerController = await getInjection('IQuestionAddWithAnswerController')

it('should add new question with answer', async () => {
    await expect(addWithAnswerController('question?', 'answer'))
        .resolves
        .toEqual({question:{id: 1, question: 'question?', category_id: null, answer_id:2 }, answer:{ id: 2, answer: 'answer', question_id: 1}})
    await expect(addWithAnswerController('question?', 'answer'))
        .resolves
        .not
        .toEqual({question:{id: 1, question: 'question?', category_id: null, answer_id:2 }, answer:{ id: 2, answer: '', question_id: 1}})
    await expect(addWithAnswerController('question?', 'answer'))
        .resolves
        .not
        .toEqual({question:{id: 1, question: '', category_id: null, answer_id:2 }, answer:{ id: 2, answer: 'answer', question_id: 1}})
    await expect(addWithAnswerController('question?', 'answer'))
        .resolves
        .not
        .toEqual({question:{id: 1, question: '', category_id: null, answer_id:2 }, answer:{ id: 2, answer: '', question_id: 1}})

})