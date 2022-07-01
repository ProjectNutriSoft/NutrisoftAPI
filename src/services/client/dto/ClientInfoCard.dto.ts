export interface ClientInfoCardDTO {
    id: Number,
    id_user: Number,
    number: String,
    owner: String,
    expirationYear: Number,
    expirationMonth: Number,
    cvc: Number
}

const generate = (base: any)=>{
    return {
        id: base.id,
        id_user: base.id_usuario,
        number: base.numero,
        owner: base.titular, 
        expirationYear: base.anio_expiracion,
        expirationMonth: base.mes_expiracion,
        cvc: base.cvc
    } as ClientInfoCardDTO;
}

export default {
    generate
}