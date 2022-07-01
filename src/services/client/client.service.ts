import { getConnection } from "@repos/database";
import { TYPES } from "mssql";
import ClientDataInfoDto, { ClientDataInfoDTO } from "./dto/ClientDataInfo.dto";
import { ClientDataRegisterDTO } from "./dto/ClientDataRegister.dto";
import ClientInfo, {ClientInfoDTO} from "./dto/ClientInfo.dto";
import ClientInfoCardDto from "./dto/ClientInfoCard.dto";
import ClientInsert, {ClientInsertDto} from "./dto/ClientInsert.dto";
import { ClientInsertCardDTO } from "./dto/ClientInsertCard.dto";

export class ClientService{
    async getClientById(id: Number): Promise<ClientInfoDTO | undefined> {
        const connection = await getConnection();
        const request = await connection
                            .input('id', TYPES.Int, id)
                            .query('SELECT * FROM ClientInfo WHERE id = @id');

        if(!request) return undefined;

        const data = request.recordset.map((row: any)=>{
            return ClientInfo.generate(row);
        });

        if(data.length == 0) return undefined;

        return data[0];
    }

    async getAllClients(): Promise<ClientInfoDTO[]>{
        const connection = await getConnection();
        const request = await connection
                            .query('SELECT * FROM ClientInfo');

        if(!request) return [];

        const data = request.recordset.map((row: any)=>{
            return ClientInfo.generate(row);
        });

        return data;
    }

    async addClient(dto: ClientInsertDto){
        const connection = await getConnection();
        const request = await connection
                            .input('dni', TYPES.Int, dto.dni)
                            .input('age', TYPES.Int, dto.age)
                            .input('name', TYPES.VarChar, dto.name)
                            .input('mail', TYPES.VarChar, dto.mail)
                            .input('phone', TYPES.VarChar, dto.phone)
                            .input('bornDate', TYPES.Date, dto.bornDate)
                            .input('vegan', TYPES.Bit, dto.vegan)
                            .query('EXEC [Crear Cliente] @dni, @age, @name, @mail, @phone, @bornDate, @vegan');

        return request.recordset;
    }

    async getCard(id: Number){
        const connection = await getConnection();
        const request = await connection
                            .input('id_usuario', TYPES.Int, id)
                            .query('SELECT * FROM Tarjeta WHERE id_usuario = @id_usuario')

        if(!request) return undefined;

        const data = request.recordset.map((row: any)=>{
            return ClientInfoCardDto.generate(row);
        });
        
        if(data.length == 0) return undefined;
        
        return data[0];
    }

    async getAllCards(){
        const connection = await getConnection();
        const request = await connection
                            .query('SELECT * FROM Tarjeta')

        if(!request) return [];

        const data = request.recordset.map((row: any)=>{
            return ClientInfoCardDto.generate(row);
        });
                
        return data;
    }

    async addCard(dto: ClientInsertCardDTO){
        const connection = await getConnection();
        const request = await connection
                            .input('id_user', TYPES.Int, dto.id_user)
                            .input('number', TYPES.VarChar, dto.number)
                            .input('owner', TYPES.VarChar,  dto.owner)
                            .input('expirationYear', TYPES.Int, dto.expirationYear)
                            .input('expirationMonth', TYPES.Int, dto.expirationMonth)
                            .input('cvc', TYPES.Int, dto.cvc)
                            .query('EXEC [Aniadir Tarjeta] @id_user, @number, @owner, @expirationYear, @expirationMonth, @cvc')

        return request.recordset;
    }

    async registerClientData(dto: ClientDataRegisterDTO){
        const connection = await getConnection();
        const request = await connection
                                    .input('id_client', TYPES.Int, dto.id_client)
                                    .input('weight', TYPES.Real, dto.weight)
                                    .input('size', TYPES.Real, dto.size)
                                    .query('EXEC [Registrar Datos Cliente] @id_client, @weight, @size')

        return request.recordset;
    }

    async getAllClientData(id_client: Number){
        const connection = await getConnection();
        const request = await connection
                            .input('id_client', TYPES.Int, id_client)
                            .query('SELECT * FROM RegistroDatosCliente WHERE id_cliente = @id_client')

        if(!request) return undefined;

        const data = request.recordset.map((row: any)=>{
            return ClientDataInfoDto.generate(row);
        });
                
        return data;
    }

    async getAllClientsData(){
        const connection = await getConnection();
        const request = await connection
                            .query('SELECT * FROM RegistroDatosCliente')

        if(!request) return undefined;

        const data = request.recordset.map((row: any)=>{
            return ClientDataInfoDto.generate(row);
        });
                
        return data;
    }
   
    async addClientBaseIngredient(id_client: Number, id_food: Number){
        const connection = await getConnection();
        const request = await connection
                            .input('id_client', TYPES.Int, id_client)
                            .input('id_food', TYPES.Int, id_food)
                            .query('EXEC [Aniadir Cliente Ingrediente Base] @id_client @id_food')

        if(!request) return undefined;
                
        return request.recordset;
    }

    async getClientBaseIngredients(id_client: Number){
        const connection = await getConnection();
        const request = await connection
                            .input('id_client', TYPES.Int, id_client)
                            .query('SELECT * FROM IngredientesBase WHERE id_cliente = @id_client')

        if(!request) return undefined;

        const data = request.recordset.map((row: any)=>{
            return {
                id: row.id,
                id_client: row.id_cliente,
                id_food: row.id_alimento
            };
        });
                
        return data;
    }

    async getAllBaseIngredients(){
        const connection = await getConnection();
        const request = await connection
                            .query('SELECT * FROM IngredientesBase')

        if(!request) return undefined;

        const data = request.recordset.map((row: any)=>{
            return {
                id: row.id,
                id_client: row.id_cliente,
                id_food: row.id_alimento
            };
        });
                
        return data;
    }
}