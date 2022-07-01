import { getConnection } from '@repos/database';
import { ClientService } from '@services/client/client.service';
import { ClientDataRegisterDTO } from '@services/client/dto/ClientDataRegister.dto';
import { ClientInsertDto } from '@services/client/dto/ClientInsert.dto';
import { FoodService } from '@services/food/food.service';
import { TYPES } from 'mssql';

export class AuthService {
    foodService: FoodService;
    clientService: ClientService;
    constructor(){
        this.foodService = new FoodService();
        this.clientService = new ClientService();
    }
    async login(dto: {username: String, password: String, role: String}){
        let procedure = "";
        if(dto.role == 'client') procedure = '[ClientLoginInfo]';
        if(dto.role == 'nutri') procedure = '[NutriLoginInfo]';

        const connection = await getConnection();
        const request = await connection
                                    .input('username', TYPES.VarChar, dto.username)
                                    .input('password', TYPES.VarChar, dto.password)
                                    .query(
                                        `SELECT * FROM ${procedure}
                                         WHERE nombre = @username AND contrasenia = @password
                                        `                                        
                                    )

        if(!request) return undefined;
        if(request.recordset.length == 0) return undefined;

        return request.recordset[0];
    }

    async register(dto: {clientDTO: ClientInsertDto, dataRegisterDTO: ClientDataRegisterDTO}){


        return dto;
    }
}

export default AuthService;