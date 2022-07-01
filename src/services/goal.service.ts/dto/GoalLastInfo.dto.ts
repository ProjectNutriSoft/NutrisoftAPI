export interface GoalLastInfoDTO{
    id_client: Number,
    max: String
}

const generate = (base: any)=>{
    return {
        id_client: base.id_cliente,
        max: base.maximo_inicio
    } as GoalLastInfoDTO;
}

export default {
    generate
}