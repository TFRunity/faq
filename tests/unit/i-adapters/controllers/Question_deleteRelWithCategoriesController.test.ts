import {expect, it} from "vitest";
import {getInjection} from "@/di/container";

const deleteRelWithCategoriesController = await getInjection('IQuestionDeleteRelWithCategoriesController')
it('should delete category in question', async () => {
    await expect(deleteRelWithCategoriesController(1))
        .resolves
        .toEqual(true)
    await expect(deleteRelWithCategoriesController(-1))
        .resolves
        .toEqual(false)
})