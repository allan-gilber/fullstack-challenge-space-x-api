import {Request, Response} from 'express';
import app from './business/applicationBusiness/ApplicationLogic';


app.get('/', (req: Request,res: Response) => res.status(200).send({message: 'hello world!'}));