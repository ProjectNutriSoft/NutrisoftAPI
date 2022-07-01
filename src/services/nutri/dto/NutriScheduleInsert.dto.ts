export interface NutriScheduleInsertDTO{
    id_nutri: Number,
    day: Number,
    initTime: String,
    endTime: String
}

const generate = (base: any)=>{
    return {
        id_nutri: base.id_nutri,
        day: base.day,
        initTime: base.initTime,
        endTime: base.endTime
    } as NutriScheduleInsertDTO;
}

export default {
    generate
}