export interface GoalInfoDTO{
    id_goal: Number,
    id_goalType: Number,
    id_client: Number,
    id_nutri?: Number,
    state: String,
    endDate?: String,
    initDate: String,
    goalWeight: Number,
    estimate?: Number,
    goalType: String
}

const generate = (base: any)=>{
    return {
        id_goal: base.id_objetivo,
        id_goalType: base.id_tipo_objetivo,
        id_client: base.id_cliente,
        id_nutri: base.id_nutricionista,
        state: base.estado,
        endDate: base.fecha_final,
        initDate: base.fecha_inicio,
        goalWeight: base.peso_objetivo,
        estimate: base.tiempo_estimado,
        goalType: base.tipo
    } as GoalInfoDTO;
}

export default {
    generate
}