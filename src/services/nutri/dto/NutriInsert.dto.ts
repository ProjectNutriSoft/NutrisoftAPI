export interface NutriInsertDTO{
    dni?: Number,
    age?: Number,
    name?: String,
    mail?: String,
    phone?: String,
    bornDate?: String,
    bankAccount?: String,
    description?: String
}

const generate = (base: any)=>{
    return {
        dni: base.dni,
        age: base.age,
        name: base.name,
        mail: base.mail,
        phone: base.phone,
        bornDate: base.bornDate,
        bankAccount: base.bankAccount,
        description: base.description
    } as NutriInsertDTO;
}

export default {
    generate
}