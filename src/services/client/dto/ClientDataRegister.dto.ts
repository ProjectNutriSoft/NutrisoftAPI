export interface ClientDataRegisterDTO {
    id_client: Number,
    weight: Number,
    size: Number
}

const generate = (base: any)=>{
    return {
        id_client: base.id_client,
        weight: base.weight,
        size: base.size
    } as ClientDataRegisterDTO;
}

export default {
    generate
}