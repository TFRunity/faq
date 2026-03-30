import {expect, it} from "vitest";
import {getInjection} from "@/di/container";

const changeAnswerToPreviousController = await getInjection('IQuestionChangeAnswerToPreviousController')

it('should change answer to previous', async () => {
    await expect(changeAnswerToPreviousController(1, 2))
        .resolves
        .toEqual({
            question:{id: 1, question: 'question?', category_id: null, answer_id:2 },
            answer:{ id: 2, answer: 'answer', question_id: 1}
        })
})