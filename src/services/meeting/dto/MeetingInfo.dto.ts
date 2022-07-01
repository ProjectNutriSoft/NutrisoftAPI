export interface MeetingInfoDTO{
    id_meeting: Number,
    id_experience: Number,
    id_nutri?: Number,
    id_client?: Number,
    date: String,
    state: String,
    nutriComment: String,
    clientComment?: String, 
    puntuation?: String
}

const generate = (base: any)=>{
    return {
        id_meeting: base.id_cita,
        id_experience: base.id_exp,
        id_nutri: base.id_nutricionista,
        id_client: base.id_cliente,
        date: base.fecha,
        state: base.estado,
        nutriComment: base.comentario_nutricionista,
        clientComment: base.comentario_cliente,
        puntuation: base.puntuacion
    } as MeetingInfoDTO;
}

export default {
    generate
}