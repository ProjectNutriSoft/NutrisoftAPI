import { getConnection } from "@repos/database";
import { TYPES } from "mssql";
import dailySummaryInfoDto from "./dto/dailySummaryInfo.dto";

export class DailySummaryService{
    async getClientDailySummary(id_client: Number, date: String){
        const connection = await getConnection();
        const request = await connection
                                .input('id_client', TYPES.Int, id_client)
                                .input('date', TYPES.Date, date)
                                .query('EXEC [Resumen Diario Info] @id_client, @date');

        if(!request) return undefined;

        const data = request.recordset.map((row: any)=>{
            return dailySummaryInfoDto.generate(row);
        });

        return data;
    }
}