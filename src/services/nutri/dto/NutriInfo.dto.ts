
export interface NutriInfoDTO{
    id: Number,
    dni: Number,
    age: Number, 
    name: String,
    mail: String,
    phone: String,
    bornDate: String,
    registerDate: String,
    points: Number,
    bankAccount: String,
    description: String,
    active: boolean
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
        points: base.puntuacion,
        bankAccount: base.cuenta,
        description: base.descripcion,
        active: base.activo
    } as NutriInfoDTO;
}

export default {
    generate
}