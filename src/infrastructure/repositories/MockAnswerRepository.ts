import {IAnswerRepository} from "@/src/application/repositories/IAnswerRepository";

export class MockAnswerRepository implements IAnswerRepository {
    forceDelete(answer_id: number): Promise<boolean> {
        return Promise.resolve(answer_id > 0)
    }
}