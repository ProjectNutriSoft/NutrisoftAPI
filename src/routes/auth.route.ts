import AuthService from "@services/auth/auth.service";
import ClientDataRegisterDto from "@services/client/dto/ClientDataRegister.dto";
import ClientInsertDto from "@services/client/dto/ClientInsert.dto";
import { Router } from "express";
import { StatusCodes } from "http-status-codes";

// Constants
const authRouter = Router();
const { CREATED, OK, NOT_FOUND } = StatusCodes;

// Paths
export const p = {
    login: '/login?*',
    register: '/register'
} as const;

const authService = new AuthService();

authRouter.get(p.login, async (req,res)=>{
    const {username, password, role}: any = req.query;

    if(!username || username == "" || !password || password == ""){
        res.json({
            error: 'error de login'
        })

        return;
    }

    const response = await authService.login({
        username,
        password,
        role
    })

    if(!response) {
        res.json({
            error: 'error de login'
        })

        return;
    }

    res.json({
        response:{
            id_user: response.id
        }
    })
})

authRouter.post(p.register, async (req, res)=>{
    const {body} = req;

    const response = await authService.register({
        clientDTO: ClientInsertDto.generate(body),
        dataRegisterDTO: ClientDataRegisterDto.generate(body)
    });

    res.json({
        response: response
    })

})

export default authRouter;
