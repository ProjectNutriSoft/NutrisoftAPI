export interface Nutricionista {
    id_usuario: Number,
    puntuacion: Number,
    cuenta: String,
    descripcion: String,
    activo: boolean
}

export const generate = (base: any)=>{
    return {
        id_usuario: base.id_usuario,
        puntuacion: base.puntuacion,
        cuenta: base.cuenta, 
        descripcion: base.descripcion,
        activo: base.activo
    } as Nutricionista;
}