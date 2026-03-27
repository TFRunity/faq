import {expect, it} from "vitest";
import {getInjection} from "@/di/container";

const addEmptyCategoryController = await getInjection('ICategoryAddEmptyController')

it('should add new empty category', async () => {
    await expect(addEmptyCategoryController())
        .resolves
        .toEqual({category : {id : 1, title : "Новая категория"}, questions : [] })
    await expect(addEmptyCategoryController())
        .resolves
        .not
        .toEqual({category : {id : 2, title : "Новая категория"}, questions : [] })
})