export interface IAnswerRepository {
    forceDelete(answer_id : number) : Promise<boolean>;
}