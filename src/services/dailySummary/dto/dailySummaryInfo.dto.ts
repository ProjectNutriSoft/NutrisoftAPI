export interface DailySummaryInfoDTO {
    id_foodMomentDay: Number,
    id_summaryMomentDay: Number,
    id_SummaryDaily: Number,
    id_macro: Number,
    id_food: Number,
    id_foodType: Number,
    date: String,
    maxCalories: Number,
    maxProteins: Number,
    maxCarbohydrates: Number,
    maxFats: Number,
    momentDayName: String,
    recomended: boolean
}

const generate = (base: any)=>{
    return {
        id_foodMomentDay: base.id_alimento_momento_dia,
        id_summaryMomentDay: base.id_resumen_momento_dia,
        id_SummaryDaily: base.id_resumen_diario,
        id_macro: base.id_macro,
        id_food: base.id_alimento,
        id_foodType: base.id_tipo_alimento,
        date: base.dia,
        maxCalories: base.calorias_max,
        maxProteins: base.proteinas_max,
        maxCarbohydrates: base.calorias_max,
        maxFats: base.calorias_max,
        momentDayName: base.nombre_momento_dia,
        recomended: base.recomendado
    } as DailySummaryInfoDTO;
}

export default {
    generate
}