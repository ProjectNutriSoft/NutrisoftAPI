import { getConnection } from "@repos/database";
import { TYPES } from "mssql";
import GoalInfoDto from "./dto/GoalInfo.dto";
import { GoalInsertDTO } from "./dto/GoalInsert.dto";
import GoalLastInfoDto from "./dto/GoalLastInfo.dto";

export class GoalService{

    async getAllGoalTypes(){
        const connection = await getConnection();
        const request = await connection    
                                .query('SELECT * FROM [TipoObjetivo]');

        if(!request) return undefined;

        const data = request.recordset.map((row: any)=>{
            return {
                id_type: row.id,
                type: row.tipo
            };
        })

        return data;
    }

    async getAllGoals(){
        const connection = await getConnection();
        const request = await connection    
                                .query('SELECT * FROM [Info Objetivo]');

        if(!request) return undefined;

        const data = request.recordset.map((row: any)=>{
            return GoalInfoDto.generate(row);
        })

        return data;
    }

    async getLastClientGoal(id_client: Number){
        const connection = await getConnection();
        const request = await connection    
                                .input('id_client', TYPES.Int, id_client)
                                .query('SELECT * FROM [Ultimo Objetivo] WHERE id_cliente = @id_client');

        if(!request) return undefined;

        const data = request.recordset.map((row: any)=>{
            return GoalLastInfoDto.generate(row);
        })

        if(data.length == 0) return undefined;

        return data[0];
    }

    async getAllClientGoals(id_client: Number){
        const connection = await getConnection();
        const request = await connection    
                                .input('id_client', TYPES.Int, id_client)
                                .query('SELECT * FROM [Info Objetivo] WHERE id_cliente = @id_client');

        if(!request) return undefined;

        const data = request.recordset.map((row: any)=>{
            return GoalInfoDto.generate(row);
        })

        return data;
    }

    async addClientGoal(dto: GoalInsertDTO){
        const connection = await getConnection();
        const request = await connection    
                                .input('id_client', TYPES.Int, dto.id_client)
                                .input('id_goalType', TYPES.Int, dto.id_goalType)
                                .input('goalWeight', TYPES.Real, dto.goalWeight)
                                .input('state', TYPES.Char, dto.state)
                                .input('initDate', TYPES.Date, dto.initDate)
                                .query('EXEC [Aniadir Objetivo] @id_client, @id_goalType, @goalWeight, @state, @initDate')

       return request.recordset;
    }

}