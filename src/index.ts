import {Request, Response} from 'express';
import {LaunchesController} from './application/LaunchesController/LaunchesController';
import app from './business/applicationBusiness/ApplicationLogic';

// GET
/* Simple endpoint to verify if server is online */
app.get('/', (request: Request,res: Response) => res.status(200).send({message: 'Fullstack Challenge 🏅 - Space X API'}));

/* Search with parameters that returns a list of launches that correspond to the parameters arguments */
app.get('/launches', async (request: Request,response: Response) => await new LaunchesController().getLaunchesList(request, response));