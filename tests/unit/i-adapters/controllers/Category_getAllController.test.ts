import {getInjection} from "@/di/container";
import { expect, it } from "vitest";


const categoryGetAllController = getInjection('ICategoryGetAllController')

it('should to return category[]', async () => {
    await expect(categoryGetAllController())
        .resolves
        .toBeDefined()
})