import {expect, it} from "vitest";
import {getInjection} from "@/di/container";

const categoryChangeTitleController = getInjection('ICategoryChangeTitleController')

it('should change title', async () => {
    await expect(categoryChangeTitleController({id : 2, title : 'AAAA', group_id : null}))
        .resolves
        .toEqual(true)
    await expect(categoryChangeTitleController({id : -2, title : 'AAAA', group_id : null}))
        .resolves
        .toEqual(false)
})