
import TipoAlimento, { TipoAlimentoModel } from '@models/tipo_alimento.model';
import { getConnection } from '@repos/database';
import { TYPES } from 'mssql';
import FoodInfo, { FoodInfoDTO } from './dto/FoodInfo.dto';
import { FoodInsertDto } from './dto/FoodInsert.dto';

export class FoodService{
    constructor(){}

    async getById(id: Number): Promise<FoodInfoDTO | undefined>{
        const connection = await getConnection();
        const request = await connection.query(`
            SELECT * FROM InformacionAlimento
            WHERE id = ${id};
        `)

        if(!request) return undefined;

        const data = request.recordset.map((row: any)=>{
            return FoodInfo.generate(row);
        });

        if(data.length == 0) return undefined;

        return data[0];
    }

    async getTypes(): Promise<TipoAlimentoModel[] | undefined>{
        const connection = await getConnection();
        const request = await connection.query(`
            SELECT * FROM TipoAlimento;
        `);

        if(!request) return undefined;

        const types: TipoAlimentoModel[] = request.recordset.map((row: any)=>{
            return TipoAlimento.generate(row);
        })

        return types;
    }

    async getAll(): Promise<FoodInfoDTO[]>{
        const connection = await getConnection();
        const request = await connection.query(`SELECT * FROM InfoAlimentos`);

        if(!request) return [];

        const foods: FoodInfoDTO[] = request.recordset.map((row: any)=>{
            return FoodInfo.generate(row);
        })

        return foods;
    }

    async getAllAsType(id_type: Number){
        const connection = await getConnection();
        const request = await connection
                                .input('id_type', TYPES.Int, id_type)
                                .query(`SELECT * FROM InfoAlimentos WHERE id_tipo_alimento = @id_type`);

        if(!request) return [];

        const foods: FoodInfoDTO[] = request.recordset.map((row: any)=>{
            return FoodInfo.generate(row);
        })

        return foods;
    }

    async addFood(dto: FoodInsertDto){
        const connection = await getConnection();
        const request = connection
                            .input('name', TYPES.VarChar, dto.name)
                            .input('calories', TYPES.Real, dto.calories)
                            .input('proteins', TYPES.Real, dto.proteins)
                            .input('carbohydrates', TYPES.Real, dto.carbohydrates)
                            .input('fats', TYPES.Real, dto.fats)
                            .input('ref_weight', TYPES.Real, dto.ref_weight)
                            .input('type_id', TYPES.Int, dto.type_id)
                            .query('EXEC [Aniadir Alimento] @name, @calories, @proteins, @carbohydrates, @fats, @ref_weight, @type_id');

        return request;
    }

    async addUserFoodBase (){
        
    }
}