import { getConnection } from "@repos/database";
import { TYPES } from "mssql";
import PacketInfo, { PacketInfoDTO } from "./dto/PacketInfo.dto";
import TicketInfo, { TicketInfoDTO } from "./dto/TicketInfo.dto";

export class SuscriptionService{
    constructor(){}

    async getAllPackets(): Promise<PacketInfoDTO[]>{
        const connection = await getConnection();
        const request = await connection.query('SELECT * FROM Paquete');

        if(!request) return [];

        const data = request.recordset.map((row: any)=>{
            return PacketInfo.generate(row);
        });

        return data;
    }

    async getAllClientTickets(id: Number): Promise<TicketInfoDTO[]>{
        const connection = await getConnection();
        const request = await connection
                                .input('id_client', TYPES.Int, id)
                                .query('SELECT * FROM [Boletas Cliente] WHERE id_cliente = @id_client');

        if(!request) return [];

        const data = request.recordset.map((row: any)=>{
            return TicketInfo.generate(row);
        });

        return data;
    }

    async getAllTickets(): Promise<TicketInfoDTO[]>{
        const connection = await getConnection();
        const request = await connection
                                .query('SELECT * FROM [Boletas Cliente]');

        if(!request) return [];

        const data = request.recordset.map((row: any)=>{
            return TicketInfo.generate(row);
        });

        return data;
    }

    async suscribeClient(id_client: Number, id_packet: Number){
        const connection = await getConnection();
        const request = await connection
                                .input('id_paquet', TYPES.Int, id_packet)
                                .input('id_client', TYPES.Int, id_client)
                                .query('EXEC [Suscribirse] @id_paquet, @id_client')

        return request;
    }

    async currentSuscription(id_client: Number){
        const connection = await getConnection();
        const now = new Date();
        const request = await connection
                                .input('id_client', TYPES.Int, id_client)
                                .input('year_now', TYPES.Int, now.getDay())
                                .input('month_now', TYPES.Int, now.getFullYear())
                                .query(`
                                    SELECT * FROM [Boletas Cliente] 
                                    WHERE id_cliente = @id_client AND YEAR(fecha_suscrita) = @year_now AND MONTH(fecha_suscrita) = @month_now 
                                `);

        if(!request) return [];

        const data = request.recordset.map((row: any)=>{
            return TicketInfo.generate(row);
        });

        return data;
    }
}