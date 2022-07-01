// User schema
export interface TipoAlimentoModel {
    id: Number,
    nombre: string
}

const copy = (other: TipoAlimentoModel)=>{
    return {
        id: other.id,
        nombre: other.nombre
    } as TipoAlimentoModel
}

const generate = (base: any) =>{
    return {
        id: base['id'],
        nombre: base['nombre']
    } as TipoAlimentoModel
}

export default {
    copy, 
    generate
}