import LaunchesBusiness from '../../business/LaunchesBusiness/LaunchesBusiness';
import {Request, Response} from 'express';
import DataBase from '../../services/DataBase';
import MessageErrorsController from '../MessageErrorsController/MessageErrorsController';
import RocketsBusiness from '../../business/RocketsBusiness/RocketsBusiness';
import {rocketDataInfo} from '../../models/rocketsInfoModels';
import {launchesStats} from '../../models/launchesInfoModel';

export class LaunchesController extends DataBase {
  public async getLaunchesList(request: Request,response: Response){
    try {
      const LaunchesListResult = await new LaunchesBusiness().getLaunchesList(request);
      response.status(200).send(LaunchesListResult);
    } catch (error: any){
      const messageController = new MessageErrorsController();

      console.log('Error in getLaunchesList: ', error?.code || error?.message || error);

      const errorMessage = messageController.getErrorMessage(error?.code || error?.message || error);
      response.status(errorMessage.status ? errorMessage.status : 500)
        .send({message: errorMessage.message});
    } finally {
      this.closeConnection();
    }
    return;
  }

  public async getLaunchesStats(request: Request,response: Response){
    try {
      const rocketsIdsArray: rocketDataInfo[] = await new  RocketsBusiness().getRocketList();
      const arrayOfLaunchesStatsByRocket = await new LaunchesBusiness().getLaunchesStatsSummary(rocketsIdsArray);
      const successAndFailuresStats: launchesStats = await new LaunchesBusiness().getLaunchesSuccessAndFailureStatsSummary();

      response.status(200).send({
        docs: arrayOfLaunchesStatsByRocket,
        success: successAndFailuresStats.success,
        failures: successAndFailuresStats.failures,
        total: successAndFailuresStats.total
      });
    } catch (error: any){
      const messageController = new MessageErrorsController();

      console.log('Error in getLaunchesStats: ', error?.code || error?.message || error);

      const errorMessage = messageController.getErrorMessage(error?.code || error?.message || error);
      response.status(errorMessage.status ? errorMessage.status : 500)
        .send({message: errorMessage.message});
    } finally {
      this.closeConnection();
    }
    return;
  }

  public async getLaunchesStatsByYear(request: Request,response: Response){
    try {
      const arrayOfAvailableYears = await new  LaunchesBusiness().getListOfYearAndRocketName();

      response.status(200).send({
        teste: arrayOfAvailableYears
      });
    } catch (error: any){
      const messageController = new MessageErrorsController();

      console.log('Error in getLaunchesStats: ', error?.code || error?.message || error);

      const errorMessage = messageController.getErrorMessage(error?.code || error?.message || error);
      response.status(errorMessage.status ? errorMessage.status : 500)
        .send({message: errorMessage.message});
    } finally {
      this.closeConnection();
    }
    return;
  }
}