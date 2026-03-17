import {expect, it} from 'vitest'
import {getInjection} from '@/di/container'

const updateAnswerFaqController = getInjection("IUpdateQuestionFaqController")

it('shoud update answer', async() : Promise<void> => {
    await expect(updateAnswerFaqController({id: 2, question: 'AAA', answer: ''}))
        .resolves
        .toEqual({
            id: 2,
            question: 'AAA',
            answer: ''
        })

    await expect(updateAnswerFaqController({id: -2, question: 'aaa', answer: ''}))
        .resolves
        .not
        .toEqual({
            id: 2,
            question: 'AAA',
            answer: ''
        })

})