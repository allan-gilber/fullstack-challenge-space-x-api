import LaunchesBusiness from '../../business/LaunchesBusiness/LaunchesBusiness';
import {Request, Response} from 'express';
import DataBase from '../../services/DataBase';
import MessageErrorsController from '../MessageErrorsController/MessageErrorsController';

export class LaunchesController extends DataBase {
  public async getLaunchesList(request: Request,response: Response){
    try {
      const LaunchesListResult = await new LaunchesBusiness().getLaunchesList(request);
      response.status(200).send(LaunchesListResult);
    } catch (error: any){
      const messageController = new MessageErrorsController();

      console.log('Error in getLaunchesList: ', messageController.getErrorMessage(error?.code || error?.message || error).message);

      const errorMessage = messageController.getErrorMessage(error?.code || error?.message || error);
      response.status(errorMessage.status ? errorMessage.status : 500)
        .send({message: errorMessage.message});
    } finally {
      this.closeConnection();
    }
    return;
  }
}