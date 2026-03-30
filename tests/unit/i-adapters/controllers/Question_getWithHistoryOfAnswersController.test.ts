import {expect, it} from "vitest";
import {getInjection} from "@/di/container";

const getWithHistoryOfAnswersController = await getInjection('IQuestionGetWithHistoryOfAnswersController')

it('should get question with history of answers', async () => {
    await expect(getWithHistoryOfAnswersController(1))
        .resolves
        .toEqual({
            question:{id: 1, question: 'question?', category_id: null, answer_id:3 },
            answers:[
                { id: 3, answer: 'answer', question_id: 1},
                { id: 2, answer: 'previous answer', question_id: 1}
            ]})
})