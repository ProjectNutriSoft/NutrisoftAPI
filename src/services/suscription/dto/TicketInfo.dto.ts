export interface TicketInfoDTO {
    id: Number,
    id_client: Number,
    id_paquet: Number,
    suscribedDate: Number,  
    type: String,
    months: Number,
    monthlyPayment: Number
}

const generate = (base: any)=>{
    return {
        id: base.id,
        id_client: base.id_cliente,
        id_paquet: base.id_paquete,
        suscribedDate: base.fecha_suscrita,
        type: base.tipo,
        months: base.meses, 
        monthlyPayment: base.pago_mensual
    } as TicketInfoDTO;
}

export default {
    generate
}