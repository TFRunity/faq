import {expect, it} from "vitest";
import {getInjection} from "@/di/container";

const updateQuestionController = await getInjection('IQuestionUpdateQuestionController')

it('should update question', async () => {
    await expect(updateQuestionController(1, 'updated question?'))
        .resolves
        .toEqual({question:{id: 1, question: 'updated question?', category_id: null, answer_id:2 }, answer:{ id: 2, answer: 'answer', question_id: 1}})
    await expect (updateQuestionController(1, 'updated question?'))
        .resolves
        .not
        .toEqual({question:{id: 1, question: '', category_id: null, answer_id:2 }, answer:{ id: 2, answer: 'answer', question_id: 1}})
})