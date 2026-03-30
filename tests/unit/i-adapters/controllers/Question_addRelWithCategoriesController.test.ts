import {expect, it} from "vitest";
import {getInjection} from "@/di/container";

const addRelWithCategoriesController = await getInjection('IQuestionAddRelWithCategoriesController')

it('should add a category in question', async () => {
    await expect(addRelWithCategoriesController(1,1))
        .resolves
        .toEqual(true)
    await expect(addRelWithCategoriesController(-1,-1))
        .resolves
        .not
        .toEqual(true)
    await expect(addRelWithCategoriesController(-1,1))
        .resolves
        .not
        .toEqual(true)
    await expect(addRelWithCategoriesController(1,-1))
        .resolves
        .not
        .toEqual(true)
})