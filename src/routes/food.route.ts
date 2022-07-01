import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';

import { FoodService } from '@services/food/food.service';
import FoodInsertDto from '@services/food/dto/FoodInsert.dto';
import FoodUpdateDto from '@services/food/dto/FoodUpdate.dto';

// Constants
const foodRouter = Router();
const { CREATED, OK, NOT_FOUND } = StatusCodes;

// Paths
export const p = {
    one: '/one/:id',
    all: '/all',
    types: '/types',
    allAsType: '/all/:type',
    add: '/',
    update: '/',
    delete: '/:id',
} as const;

const foodService = new FoodService();

foodRouter.get(p.one, async (req, res)=>{
    const {id} = req.params;

    const nId = Number(id);
    if(isNaN(nId)) res.status(NOT_FOUND).json({
        error: 'id invalido'
    })

    try{
        const food = await foodService.getById(nId);
        
        res.json({
            response: food
        });
    }
    catch(err){
        res.status(NOT_FOUND).json({
            response: "no existe el recurso"
        });
    }
})

foodRouter.get(p.all, async (req, res)=>{
    const foods = await foodService.getAll();
    res.json({
        response: foods
    });
})

foodRouter.get(p.allAsType, async (req, res)=>{

    const {type} = req.params;

    const ntype = Number(type);
    if(isNaN(ntype)) res.status(NOT_FOUND).json({
        error: 'id invalido'
    })

    const foods = await foodService.getAllAsType(ntype);
    res.json({
        response: foods
    });
})

foodRouter.get(p.types, async (req, res)=>{
    const types = await foodService.getTypes();
    res.json({
        response: types
    });
})

foodRouter.post(p.add, async (req, res)=>{
    const {body} = req;
    const foodInsert = FoodInsertDto.generate(body);

    const response = foodService.addFood(foodInsert);

    res.json({
        response
    });
})
/*
foodRouter.patch(p.update, async (req, res) =>{
    const {body} = req;
    const foodUpdater = FoodUpdateDto.generate(body);

    const response = foodService.updateById(foodUpdater);

    res.json ({
        response
    })
})

foodRouter.delete(p.delete, async (req, res) =>{
    const {id} = req.params;

    const nId = Number(id);
    if(isNaN(nId)) res.status(NOT_FOUND).json({
        error: 'id invalido'
    })

    const food = await foodService.deleteById(nId);

    res.json({
        response: food
    });

})
*/
export default foodRouter;