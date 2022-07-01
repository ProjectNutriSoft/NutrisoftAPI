import GoalInsertDto from "@services/goal.service.ts/dto/GoalInsert.dto";
import { GoalService } from "@services/goal.service.ts/goal.service";
import { Router } from "express";
import { StatusCodes } from "http-status-codes";

// Constants
const goalRouter = Router();
const { CREATED, OK, NOT_FOUND } = StatusCodes;

// Paths
export const p = {
    types: '/types',

    goals: '/',
    clientGoals: '/:id',
    lastGoal: '/last/:id',

    addGoal: '/'

} as const;

const goalService = new GoalService();

goalRouter.get(p.types, async (req, res)=>{
    const goalTypes = await goalService.getAllGoalTypes();
        
    res.json({
        response: goalTypes
    });
})

goalRouter.get(p.goals, async (req, res)=>{
    const goals = await goalService.getAllGoals();
        
    res.json({
        response: goals
    });
})

goalRouter.get(p.lastGoal, async (req, res)=>{

    const {id} = req.params;

    const nId = Number(id);
    if(isNaN(nId)) res.status(NOT_FOUND).json({
        error: 'id invalido'
    })

    const goals = await goalService.getLastClientGoal(nId);
        
    res.json({
        response: goals
    });
})

goalRouter.get(p.clientGoals, async (req,res)=>{

    const {id} = req.params;

    const nId = Number(id);
    if(isNaN(nId)) res.status(NOT_FOUND).json({
        error: 'id invalido'
    })

    const goals = await goalService.getAllClientGoals(nId);
        
    res.json({
        response: goals
    });

})

goalRouter.post(p.addGoal , async  (req, res)=>{
    const {body} = req;

    const goalInsert = GoalInsertDto.generate(body);

    const response = await goalService.addClientGoal(goalInsert);

    res.json({
        response: response
    })
})

export default goalRouter;