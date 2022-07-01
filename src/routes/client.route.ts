import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import { ClientService } from '@services/client/client.service';
import ClientInsertDto from '@services/client/dto/ClientInsert.dto';
import ClientInsertCardDto from '@services/client/dto/ClientInsertCard.dto';
import ClientDataRegisterDto from '@services/client/dto/ClientDataRegister.dto';

// Constants
const clientRouter = Router();
const { CREATED, OK, NOT_FOUND } = StatusCodes;

// Paths
export const p = {
    one: '/one/:id',
    all: '/all',
    add: '/',
    addCard: '/cards',
    allCards: '/cards',
    oneCard: '/cards/:id',
    ownData: '/data/:id',
    allData: '/data/',
    addData: '/data',
    addFoodBase: '/foodbase/',
    update: '/',
    delete: '/:id',
} as const;

const clientService = new ClientService();

clientRouter.get(p.one, async (req, res)=>{
    const {id} = req.params;

    const nId = Number(id);
    if(isNaN(nId)) res.status(NOT_FOUND).json({
        error: 'id invalido'
    })

    try{
        const client = await clientService.getClientById(nId);
        
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

clientRouter.get(p.all, async (req, res)=>{
    const clients = await clientService.getAllClients();
    res.json({
        response: clients
    });
})

clientRouter.post(p.add, async (req, res)=>{
    const {body} = req;
    const clientInsert = ClientInsertDto.generate(body);

    const response = clientService.addClient(clientInsert);

    res.json({
        response
    });
})

clientRouter.get(p.allCards, async (req, res)=>{
    const cards = await clientService.getAllCards();
    res.json({
        response: cards
    });
})

clientRouter.get(p.oneCard, async (req, res)=>{
    const {id} = req.params;

    const nId = Number(id);
    if(isNaN(nId)) res.status(NOT_FOUND).json({
        error: 'id invalido'
    })

    const card = await clientService.getCard(nId);
    res.json({
        response: card
    });
})

clientRouter.post(p.addCard, async (req, res)=>{
    const {body} = req;
    const clientInsertCard = ClientInsertCardDto.generate(body);

    const response = clientService.addCard(clientInsertCard);

    res.json({
        response
    });
})

clientRouter.get(p.ownData, async (req, res)=>{
    const {id} = req.params;

    const nId = Number(id);
    if(isNaN(nId)) res.status(NOT_FOUND).json({
        error: 'id invalido'
    })

    const data = await clientService.getAllClientData(nId);
    res.json({
        response: data
    });
})

clientRouter.get(p.allData, async (req, res)=>{
    
    const data = await clientService.getAllClientsData();
    res.json({
        response: data
    });
})

clientRouter.post(p.addData, async (req, res)=>{
    const {body} = req;
    const clientInserData = ClientDataRegisterDto.generate(body);

    const response = clientService.registerClientData(clientInserData);

    res.json({
        response: response
    });
})

clientRouter.get('/foodsbase/:id', async (req, res)=>{
    const {id} = req.params;

    const nId = Number(id);
    if(isNaN(nId)) res.status(NOT_FOUND).json({
        error: 'id invalido'
    })

    const foods = await clientService.getClientBaseIngredients(nId);
    res.json({
        response: foods
    });
})


clientRouter.get('/foodsbase/', async (req, res)=>{
    
    const foods = await clientService.getAllBaseIngredients();

    res.json({
        response: foods
    });

})

clientRouter.post('/foodsbase', async (req, res)=>{
    const {id_client, id_food} = req.body;
    //const clientInserData = ClientDataRegisterDto.generate(body);

    const response = await clientService.addClientBaseIngredient(id_client, id_food);

    res.json({
        response: response
    });
})

export default clientRouter;