import {expect, it} from "vitest";
import {getInjection} from "@/di/container";

const getAllWithoutCategoryController = await getInjection('IQuestionGetAllWithoutCategoryController')

it('should return data without categories (question, answer)', async () => {
    await expect(getAllWithoutCategoryController())
        .resolves
        .toBeDefined()

})