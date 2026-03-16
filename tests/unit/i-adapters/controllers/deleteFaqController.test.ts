import { expect, it } from 'vitest'
import { getInjection } from "@/di/container"

const deleteFaqController = getInjection('IDeleteFaqController')

it('should delete faq', async () : Promise<void> => {
    await expect(deleteFaqController(1))
        .resolves
        .toEqual(true)
    await expect(deleteFaqController(-20))
        .resolves
        .toEqual(false)
})