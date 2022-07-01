import { DailySummaryService } from "@services/dailySummary/dailySummary.service";
import { Router } from "express";
import { StatusCodes } from "http-status-codes";

// Constants
const dailySummaryRouter = Router();
const { CREATED, OK, NOT_FOUND } = StatusCodes;

// Paths
export const p = {
    
} as const;

const dailySummaryService = new DailySummaryService();

dailySummaryRouter.get('/:id/:date', async (req, res)=>{
    const {id, date} = req.params;

    const nId = Number(id);
    if(isNaN(nId)) res.status(NOT_FOUND).json({
        error: 'id invalido'
    })

    const sums = dailySummaryService.getClientDailySummary(nId, date);

    res.json({
        response: sums
    })
})

export default dailySummaryRouter;
