export interface FoodUpdateDto{
    id: Number,
    id_info_nutri: Number,
    id_recipe: Number | null,

    name: string | null,
    type_id: Number | null,
    calories: Number | null,
    proteins: Number | null,
    carbohydrates: Number | null,
    fats: Number | null,
    ref_weight: Number,
    duration: Number | null,
    steps: string | null,
    url_video: string | null
}

const generate = (base: any)=>{
    return {
        id: base.id,
        id_info_nutri: base.id_info_nutri,
        id_recipe: base.id_recipe || null,
        name: base.name || null,
        type_id: base.type_id || null,
        calories: base.calories || null,
        proteins: base.proteins || null,
        carbohydrates: base.carbohydrates || null,
        fats: base.fats || null,
        ref_weight: base.ref_weight || null,
        duration: base.duration || null,
        steps: base.steps || null,
        url_video: base.url_video || null
    } as FoodUpdateDto;
}

export default {
    generate
}