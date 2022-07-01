export interface FoodInsertDto{
    name?: string,
    type_id?: Number,
    calories?: Number,
    proteins?: Number,
    carbohydrates?: Number,
    fats?: Number,
    ref_weight?: Number
}

const generate = (base: any)=>{
    return {
        name: base.name,
        type_id: base.type_id,
        calories: base.calories,
        proteins: base.proteins,
        carbohydrates: base.carbohydrates,
        fats: base.fats,
        ref_weight: base.ref_weight
    } as FoodInsertDto;
}

export default {
    generate
}