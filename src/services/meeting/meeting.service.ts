import { getConnection } from "@repos/database";
import { TYPES } from "mssql";
import MeetingInfoDto from "./dto/MeetingInfo.dto";

export class MeetingService{
    constructor(){}

    async getClientMeetings(id: Number){
        const connection = await getConnection();
        const request = await connection
                                .input('id', TYPES.Int, id)
                                .query(`
                                    EXEC [Citas Cliente Info] @id;
                                `);

        if(!request) return [];

        const data = request.recordset.map((row: any)=>{
            return MeetingInfoDto.generate(row);
        });

        return data;
    }

    async getNutriMeetings(id: Number){
        const connection = await getConnection();
        const request = await connection
                                .input('id', TYPES.Int, id)
                                .query(`
                                    EXEC [Citas Nutri Info] @id;
                                `);

        if(!request) return [];

        const data = request.recordset.map((row: any)=>{
            return MeetingInfoDto.generate(row);
        });

        return data;
    }

    async getAllMeetings(){
        const connection = await getConnection();
        const request = await connection
                                .query(`
                                    SELECT * FROM [Citas Info]
                                `);

        if(!request) return [];

        const data = request.recordset.map((row: any)=>{
            return MeetingInfoDto.generate(row);
        });

        return data;
    }
}