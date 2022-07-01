export interface ClientInsertCardDTO {
    id_user: Number,
    number: String,
    owner: String,
    expirationYear: Number,
    expirationMonth: Number,
    cvc: Number
}

const generate = (base: any)=>{
    return {
        id_user: base.id_user,
        number: base.number,
        owner: base.owner, 
        expirationYear: base.expirationYear,
        expirationMonth: base.expirationMonth,
        cvc: base.cvc
    } as ClientInsertCardDTO;
}

export default {
    generate
}