export interface NutriScheduleInfoDTO{
    id: Number,
    id_nutri: Number,
    day: Number,
    initTime: String,
    endTime: String
}

const generate = (base: any)=>{
    return {
        id: base.id,
        id_nutri: base.id_nutricionista,
        day: base.dia,
        initTime: base.hora_apertura,
        endTime: base.hora_cierre
    } as NutriScheduleInfoDTO;
}

export default {
    generate
}