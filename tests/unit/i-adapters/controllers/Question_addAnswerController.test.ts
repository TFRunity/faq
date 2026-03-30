import {expect, it} from "vitest";
import {getInjection} from "@/di/container";

const addAnswerController = await getInjection('IQuestionAddAnswerController')

it('should ', async () => {
    await expect(addAnswerController(1, 'answer'))
        .resolves
        .toEqual({
            question:{id: 1, question: 'question?', category_id: null, answer_id:3 },
            answer:{ id: 3, answer: 'answer', question_id: 1}
        })
})