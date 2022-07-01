import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import { ClientService } from '@services/client/client.service';
import ClientInsertDto from '@services/client/dto/ClientInsert.dto';
import { NutriService } from '@services/nutri/nutri.service';
import NutriScheduleInsert from '@services/nutri/dto/NutriScheduleInsert.dto';

// Constants
const nutriRouter = Router();
const { CREATED, OK, NOT_FOUND } = StatusCodes;

// Paths
export const p = {
    one: '/one/:id',
    all: '/all',
    add: '/',
    schedulesOwn: '/schedules/:id',
    schedulesAll: '/schedules',
    addSchedules: '/schedules',
    update: '/',
    delete: '/:id',
} as const;

const nutriService = new NutriService();

nutriRouter.get(p.one, async (req, res)=>{
    const {id} = req.params;

    const nId = Number(id);
    if(isNaN(nId)) res.status(NOT_FOUND).json({
        error: 'id invalido'
    })

    try{
        const client = await nutriService.getById(nId);
        
        res.json({
            response: client
        });
    }
    catch(err){
        res.status(NOT_FOUND).json({
            response: "no existe el recurso"
        });
    }
})

nutriRouter.get(p.all, async (req, res)=>{
    const nutris = await nutriService.getAll();
    res.json({
        response: nutris
    });
})

nutriRouter.post(p.add, async (req, res)=>{
    const {body} = req;
    const nutriInsert = ClientInsertDto.generate(body);

    const response = nutriService.addNutri(nutriInsert);

    res.json({
        response
    });
})

nutriRouter.get(p.schedulesOwn, async (req, res)=>{

    const {id} = req.params;

    const nId = Number(id);
    if(isNaN(nId)) res.status(NOT_FOUND).json({
        error: 'id invalido'
    })

    const schedules = await nutriService.getNutriSchedules(nId);
    res.json({
        response: schedules
    });
})

nutriRouter.get(p.schedulesAll, async (req, res)=>{

    const schedules = await nutriService.getAllNutriSchedules();
    res.json({
        response: schedules
    });
})

nutriRouter.post(p.addSchedules, async (req, res)=>{
    const {body} = req;
    const scheduleDTO = NutriScheduleInsert.generate(body);

    const response = nutriService.addSchedule(scheduleDTO);

    res.json({
        response
    });
})

export default nutriRouter;