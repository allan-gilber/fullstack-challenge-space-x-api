import {Request, Response} from 'express';
import app from './business/applicationBusiness/applicationLogic';

// GET
/* Simple endpoint to verify if server is online */
app.get('/', (req: Request,res: Response) => res.status(200).send({message: 'Fullstack Challenge 🏅 - Space X API'}));