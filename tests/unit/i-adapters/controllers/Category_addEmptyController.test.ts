import {expect, it} from "vitest";
import {getInjection} from "@/di/container";

const addEmptyCategoryController = await getInjection('ICategoryAddEmptyController')

it('should add new empty category', async () => {
    await expect(addEmptyCategoryController(1))
        .resolves
        .toEqual({category : {id : 1, title : "Новая категория", group_id : 1}, questions : [] })
    await expect(addEmptyCategoryController(-1))
        .resolves
        .not
        .toEqual({category : {id : 1, title : "Новая категория", group_id : 1}, questions : [] })
})