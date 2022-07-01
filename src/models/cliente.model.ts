export interface Cliente {
    id_usuario: Number,
    vegano: boolean,
    abusivo: boolean,
    suscrito: boolean
}

export const generate = (base: any)=>{
    return {
        id_usuario: base.id_usuario,
        vegano: base.vegano,
        abusivo: base.abusivo, 
        suscrito: base.suscrito
    } as Cliente;
}