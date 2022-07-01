
// User schema
export interface Receta {
    id: Number,
    duracion: Number,
    pasos: Number,
    url_video: Number
}

export const copy = (other: Receta)=>{
    return {
        id: other.id,
        duracion: other.duracion,
        pasos: other.pasos,
        url_video: other.url_video
    } as Receta
}

export const generate = (base: any) =>{
    return {
        id: base['id'],
        duracion: base['duracion'],
        pasos: base['pasos'],
        url_video: base['url_video']
    } as Receta
}