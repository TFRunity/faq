import {expect, it} from "vitest";
import {getInjection} from "@/di/container";

const deleteController = await getInjection('IQuestionDeleteController')

it('should delete question with answer', async () => {
    await expect(deleteController(1))
        .resolves
        .toEqual(true)
    await expect (deleteController(-1))
        .resolves
        .toEqual(false)
})