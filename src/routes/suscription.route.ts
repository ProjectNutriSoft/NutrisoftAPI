import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import { SuscriptionService } from '@services/suscription/suscription.service';

// Constants
const suscriptionRouter = Router();
const { CREATED, OK, NOT_FOUND, NOT_ACCEPTABLE } = StatusCodes;

// Paths
export const p = {
    packets: '/packets',
    oneClientTickets: '/tickets/:id',
    allClientsTickets: '/tickets/',
    suscribe: '/suscribe/:id_client/:id_packet',
} as const;

const suscriptionService = new SuscriptionService();

suscriptionRouter.get(p.packets, async (req, res)=>{
    const packets = await suscriptionService.getAllPackets();
    res.json({
        response: packets
    })
})

suscriptionRouter.get(p.oneClientTickets, async (req, res)=>{

    const {id} = req.params;

    const nId = Number(id);
    if(isNaN(nId)) res.status(NOT_FOUND).json({
        error: 'id invalido'
    })

    const tickets = await suscriptionService.getAllClientTickets(nId);

    res.json({
        response: tickets
    })
})

suscriptionRouter.get(p.allClientsTickets, async (req, res)=>{
    const tickets = await suscriptionService.getAllTickets();

    res.json({
        response: tickets
    })
})

suscriptionRouter.post(p.suscribe, async (req,res)=>{

    const { id_client, id_packet } = req.params;

    const nIdClient = Number(id_client);
    const nIdPacket = Number(id_packet);
    if(isNaN(nIdClient) || isNaN(nIdPacket)) res.status(NOT_FOUND).json({
        error: 'id invalido'
    })

    const suscribed = await suscriptionService.suscribeClient(nIdClient, nIdPacket);

    if(!suscribed){
        res.status(NOT_ACCEPTABLE).json({
            error: 'error al suscribirse'
        })

        return;
    }

    res.json({
        response: suscribed
    })
})

export default suscriptionRouter;