import {expect, it} from 'vitest'
import {getInjection} from "@/di/container";

const getFaqController = getInjection('IGetFaqController')

it('should get all faqs', async () : Promise<void> => {
    await expect(getFaqController())
        .resolves
        .toEqual([
            {   id: 1,
                question: '',
                answer: ''
            }
        ])
    await expect(getFaqController())
        .resolves
        .not
        .toEqual([{
            id: 2,
            question: 'AAA',
            answer: 'AAA'
        }])
});