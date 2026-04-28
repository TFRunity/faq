export interface ISmartSearchRepository {
    syncByGroup(group_id: number) : Promise<void>
}