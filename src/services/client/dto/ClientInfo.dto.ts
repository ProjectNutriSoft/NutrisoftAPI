export interface ClientInfoDTO {
    id: Number,
    dni: Number,
    age: Number, 
    name: String,
    mail: String,
    phone: String,
    bornDate: String,
    registerDate: String,
    vegan: boolean,
    abusive: boolean,
    suscribed: boolean
}

const generate = (base: any)=>{
    return {
        id: base.id,
        dni: base.dni,
        age: base.edad, 
        name: base.nombre,
        mail: base.correo,
        phone: base.telefono,
        bornDate: base.fecha_nacimiento,
        registerDate: base.fecha_registro,
        vegan: base.vegano,
        abusive: base.abusivo, 
        suscribed: base.suscrito
    } as ClientInfoDTO;
}

export default {
    generate
}