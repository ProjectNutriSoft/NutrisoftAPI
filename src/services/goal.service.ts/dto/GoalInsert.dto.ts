export interface GoalInsertDTO{
    id_goalType: Number,
    id_client: Number,
    initDate: String,
    goalWeight: Number,
    state: Number
}

const generate = (base: any)=>{
    return {
        id_goalType: base.id_goalType,
        id_client: base.id_client,
        state: base.state,
        initDate: base.initDate,
        goalWeight: base.goalWeight
    } as GoalInsertDTO;
}

export default {
    generate
}