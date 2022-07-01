import { MeetingService } from "@services/meeting/meeting.service";
import { Router } from "express";
import { StatusCodes } from "http-status-codes";

// Constants
const meetingRouter = Router();
const { CREATED, OK, NOT_FOUND } = StatusCodes;

// Paths
export const p = {
    client: '/clients/:id',
    nutris: '/nutris/:id',    
    all: '/'
} as const;

const meetingService = new MeetingService();

meetingRouter.get(p.client, async (req, res)=>{

    const {id} = req.params;

    const nId = Number(id);
    if(isNaN(nId)) res.status(NOT_FOUND).json({
        error: 'id invalido'
    })

    const meetings = await meetingService.getClientMeetings(nId);
        
    res.json({
        response: meetings
    });

})

meetingRouter.get(p.nutris, async (req, res)=>{

    const {id} = req.params;

    const nId = Number(id);
    if(isNaN(nId)) res.status(NOT_FOUND).json({
        error: 'id invalido'
    })

    const meetings = await meetingService.getNutriMeetings(nId);
        
    res.json({
        response: meetings
    });

})

meetingRouter.get(p.all, async (req, res)=>{

    const meetings = await meetingService.getAllMeetings();
        
    res.json({
        response: meetings
    });

})

export default meetingRouter;