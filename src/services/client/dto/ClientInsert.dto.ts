export interface ClientInsertDto{
    dni?: Number,
    age?: Number,
    name?: String,
    mail?: String,
    phone?: String,
    bornDate?: String,
    vegan?: boolean
}

const generate = (base: any)=>{
    return {
        dni: base.dni,
        age: base.age,
        name: base.name,
        mail: base.mail,
        phone: base.phone,
        bornDate: base.bornDate,
        vegan: base.vegan
    } as ClientInsertDto;
}

export default {
    generate
}