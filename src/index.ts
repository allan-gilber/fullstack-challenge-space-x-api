import {Request, Response} from 'express';
import CronController from './application/CronController/CronController';
import {LaunchesController} from './application/LaunchesController/LaunchesController';
import app from './business/applicationBusiness/ApplicationLogic';

// GET
/* Simple endpoint to verify if server is online */
app.get('/', async (request: Request, response: Response) => await response.status(200).send({message: 'Fullstack Challenge 🏅 - Space X API'}));

/* Search with parameters that returns a list of launches that correspond to the parameters arguments */
app.get('/launches', async (request: Request,response: Response) => await new LaunchesController().getLaunchesList(request, response));

/* Get launches statistics from database */
app.get('/launches/stats', async (request: Request,response: Response) => await new LaunchesController().getLaunchesStats(request, response));

/* Get launches dates organized by rocket name */
app.get('/launches/by-date', async (request: Request,response: Response) => await new LaunchesController().getLaunchesStatsByYear(request, response));

// CRON
new CronController().startCronService();