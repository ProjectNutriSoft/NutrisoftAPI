
// User schema
export interface Alimento {
    id: Number,
    id_tipo_alimento: Number,
    id_informacion_nutricional: Number,
    nombre: string
}

export const copy = (other: Alimento)=>{
    return {
        id: other.id,
        id_informacion_nutricional: other.id_informacion_nutricional,
        id_tipo_alimento: other.id_tipo_alimento,
        nombre: other.nombre
    } as Alimento
}

export const generate = (base: any) =>{
    return {
        id: base['id'],
        id_informacion_nutricional: base['id_informacion_nutricional'],
        id_tipo_alimento: base['id_tipo_alimento'],
        nombre: base['nombre']
    } as Alimento
}