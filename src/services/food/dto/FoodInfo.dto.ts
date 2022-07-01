
export interface FoodInfoDTO{
    id: Number,
    id_info_nutri: Number,
    id_type: Number,
    name: string,
    type: string,
    calories: Number,
    proteins: Number,
    carbohydrates: Number,
    fats: Number,
    ref_weight: Number
}

const copy = (other: FoodInfoDTO)=>{
    return {
        id: other.id,
        name: other.name,
        type: other.type,
        id_info_nutri: other.id_info_nutri,
        calories: other.calories,
        proteins: other.proteins,
        carbohydrates: other.carbohydrates,
        fats: other.fats,
        ref_weight: other.ref_weight
    } as FoodInfoDTO;
}

const generate = (base: any)=>{
    return {
        id: base.id,
        id_info_nutri: base.id_informacion_nutricional,
        id_type: base.id_tipo_alimento,
        name: base.nombre,
        type: base.tipo,
        calories: base.calorias,
        proteins: base.proteinas,
        carbohydrates: base.carbohidratos,
        fats: base.grasas,
        ref_weight: base.peso_ref
    } as FoodInfoDTO;
}

export default {
    copy, generate
}