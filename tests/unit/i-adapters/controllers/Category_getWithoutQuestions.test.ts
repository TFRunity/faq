import {getInjection} from "@/di/container";
import {it, expect} from "vitest";

const Category_getWithoutQuestionsTestController = getInjection('ICategoryGetWithoutQuestionsController')

it('should return [] of categories', async () => {
    await expect(Category_getWithoutQuestionsTestController(1))
        .resolves
        .toEqual([])
})