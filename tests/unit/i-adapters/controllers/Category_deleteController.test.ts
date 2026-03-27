import {getInjection} from "@/di/container";
import {expect, it} from "vitest";


const categoryDeleteController = getInjection('ICategoryDeleteController')

it('should delete category', async () => {
    await expect(categoryDeleteController(1))
        .resolves
        .toEqual(true)
    await expect(categoryDeleteController(-4))
        .resolves
        .toEqual(false)
})