import { expect, it } from 'vitest'
import { getInjection } from "@/di/container"

const deleteForceAnswerController = getInjection('IAnswerDeleteForceController')

it ('should delete answer', async () => {
    await expect(deleteForceAnswerController(23))
        .resolves
        .toEqual(true)
    await expect(deleteForceAnswerController(-23))
        .resolves
        .toEqual(false)
})