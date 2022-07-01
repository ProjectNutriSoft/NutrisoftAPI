import { getConnection } from "@repos/database";
import { TYPES } from "mssql";
import { NutriCertificationInserDTO } from "./dto/NutriCertificationInsert.dto";
import NutriInfo, { NutriInfoDTO } from "./dto/NutriInfo.dto";
import { NutriInsertDTO } from "./dto/NutriInsert.dto";
import NutriScheduleInfo, { NutriScheduleInfoDTO } from "./dto/NutriScheduleInfo.dto";
import { NutriScheduleInsertDTO } from "./dto/NutriScheduleInsert.dto";

export class NutriService{
    constructor(){}

    async getById(id: Number): Promise<NutriInfoDTO | undefined>{
        const connection = await getConnection();
        const request = await connection
                                .input('id', TYPES.Int, id)
                                .query(`
                                    SELECT * FROM [NutriInfo]
                                    WHERE id = @id;
                                `);

        if(!request) return undefined;

        const data = request.recordset.map((row: any)=>{
            return NutriInfo.generate(row);
        });

        if(data.length == 0) return undefined;

        return data[0];
    }

    async getAll(): Promise<NutriInfoDTO[]>{
        const connection = await getConnection();
        const request = await connection.query(`SELECT * FROM NutriInfo`);

        if(!request) return [];

        const foods: NutriInfoDTO[] = request.recordset.map((row: any)=>{
            return NutriInfo.generate(row);
        })

        return foods;
    }

    async addNutri(dto: NutriInsertDTO){
        const connection = await getConnection();
        const request = await connection
                            .input('dni', TYPES.VarChar, dto.dni)
                            .input('age', TYPES.Real, dto.age)
                            .input('name', TYPES.Real, dto.name)
                            .input('mail', TYPES.Real, dto.mail)
                            .input('phone', TYPES.Real, dto.phone)
                            .input('bornDate', TYPES.Real, dto.bornDate)
                            .input('bankAccount', TYPES.Int, dto.bankAccount)
                            .input('description', TYPES.Int, dto.description)
                            .query('EXEC [Crear Nutricionista] @dni, @age, @name, @mail, @phone, @bornDate, @bankAccount, @description');

        return (await request).recordset;
    }

    async addSchedule(dto: NutriScheduleInsertDTO){
        const connection = await getConnection();
        const request = await connection
                            .input('id_nutri', TYPES.Int, dto.id_nutri)
                            .input('day', TYPES.SmallInt, dto.day)
                            .input('initTime', TYPES.Time, dto.initTime)
                            .input('endTime', TYPES.Time, dto.endTime)
                            .query('EXEC [Crear [Aniadir Nutri Horario] @id_nutri, @day, @initTime, @endTime');

        return request.recordset;
    }

    async getNutriSchedules(id_nutri: Number){
        const connection = await getConnection();
        const request = await connection
                                .input('id_nutri', TYPES.Int, id_nutri)
                                .query(`SELECT * FROM Horario WHERE id_nutricionista = @id_nutri`);

        if(!request) return [];

        const schedules: NutriScheduleInfoDTO[] = request.recordset.map((row: any)=>{
            return NutriScheduleInfo.generate(row);
        })

        return schedules;
    }

    async getAllNutriSchedules(){
        const connection = await getConnection();
        const request = await connection
                                .query(`SELECT * FROM Horario`);

        if(!request) return [];

        const schedules: NutriScheduleInfoDTO[] = request.recordset.map((row: any)=>{
            return NutriScheduleInfo.generate(row);
        })

        return schedules;
    }

    async addCertification(dto: NutriCertificationInserDTO){
        
        const connection = await getConnection();
        const request = await connection
                            .input('id_nutri', TYPES.Int, dto.id_nutri)
                            .input('proof', TYPES.Image, dto.proof)
                            .input('expirationDate', TYPES.DateTime, dto.expirationDate)
                            .query('EXEC [Aniadir Nutri Certificado] @id_nutri, @proof, @expirationDate');

        return request.recordset;

    }
}