export interface NutriCertificationInserDTO{
    id_nutri: Number,
    proof: Number,
    expirationDate: String
}

const generate = (base: any)=>{
    return {
        id_nutri: base.id_nutri,
        proof: base.proof,
        expirationDate: base.expirationDate,
    } as NutriCertificationInserDTO;
}

export default {
    generate
}