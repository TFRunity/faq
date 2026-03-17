import {expect, it} from 'vitest'
import {getInjection} from '@/di/container'

const updateAnswerFaqController = getInjection("IUpdateAnswerFaqController")

it('should update answer', async() : Promise<void> => {
    await expect(updateAnswerFaqController({id: 2, question: '', answer: 'AAA'}))
        .resolves
        .toEqual({
        id: 2,
        question: '',
        answer: 'AAA'
    })

    await expect(updateAnswerFaqController({id: -2, question: '', answer: 'aaa'}))
        .resolves
        .not
        .toEqual({
            id: 2,
            question: '',
            answer: 'AAA'
        })

})