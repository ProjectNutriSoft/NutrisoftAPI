
// User schema
export interface InformacionNutricional{
    id: Number,
    calorias: Number,
    proteinas: Number,
    carbohidratos: Number,
    grasas: Number, 
    peso_ref: Number
}

export const copy = (other: InformacionNutricional)=>{
    return {
        id: other.id,
        calorias: other.calorias,
        proteinas: other.proteinas,
        carbohidratos: other.carbohidratos,
        grasas: other.grasas,
        peso_ref: other.peso_ref
    } as InformacionNutricional
}

export const generate = (base: any) =>{
    return {
        id: base['id'],
        calorias: base['calorias'],
        proteinas: base['proteinas'],
        carbohidratos: base['carbohidratos'],
        grasas: base['grasas'],
        peso_ref: base['peso_ref']
    } as InformacionNutricional
}