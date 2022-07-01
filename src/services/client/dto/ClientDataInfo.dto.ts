export interface ClientDataInfoDTO {
    id_client: Number,
    weight: Number,
    size: Number
}

const generate = (base: any)=>{
    return {
        id_client: base.id_cliente,
        weight: base.peso,
        size: base.talla
    } as ClientDataInfoDTO;
}

export default {
    generate
}