export interface PacketInfoDTO {
    id: Number,
    type: String,
    months: Number,  
    monthlyPayment: Number
}

const generate = (base: any)=>{
    return {
        id: base.id,
        type: base.tipo,
        months: base.meses, 
        monthlyPayment: base.pago_mensual
    } as PacketInfoDTO;
}

export default {
    generate
}