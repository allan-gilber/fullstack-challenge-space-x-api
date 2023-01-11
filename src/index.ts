import {Request, Response} from 'express';
import CronController from './application/CronController/CronController';
import {LaunchesController} from './application/LaunchesController/LaunchesController';
import ApplicationBusiness from './business/ApplicationBusiness/ApplicationBusiness';

// GET
/* Simple endpoint to verify if server is online */
ApplicationBusiness.get('/', (request: Request, response: Response) => response.status(200).send({message: 'Fullstack Challenge 🏅 - Space X API'}));

/* Search with parameters that returns a list of launches that correspond to the parameters arguments */
ApplicationBusiness.get('/launches', async (request: Request,response: Response) => await new LaunchesController().getLaunchesList(request, response));

/* Get launches statistics from database */
ApplicationBusiness.get('/launches/stats', async (request: Request,response: Response) => await new LaunchesController().getLaunchesStats(request, response));

/* Get launches dates organized by rocket name */
ApplicationBusiness.get('/launches/by-date', async (request: Request,response: Response) => await new LaunchesController().getLaunchesStatsByYear(request, response));

// CRON
new CronController().startCronService();