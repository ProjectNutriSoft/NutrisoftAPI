export interface Usuario {
    id: Number,
    dni: Number,
    edad: Number, 
    nombre: String,
    correo: String,
    telefono: String,
    fecha_nacimiento: String,
    fecha_registro: String
}

export const generate = (base: any)=>{
    return {
        id: base.id,
        dni: base.dni,
        edad: base.edad, 
        nombre: base.nombre,
        correo: base.correo,
        telefono: base.telefono,
        fecha_nacimiento: base.fecha_nacimiento,
        fecha_registro: base.fecha_registro
    } as Usuario;
}