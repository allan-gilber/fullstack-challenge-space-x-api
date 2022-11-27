import RocketsBusiness from '../../business/UserBusiness/UserBusiness';
import {Request, Response} from 'express';
import DataBase from '../../services/DataBase';
import MessageErrorsController from '../MessageErrorsController/MessageErrorsController';

export class RocketsController extends DataBase {
  async getRocketsList(resp: Response){
    try {
      const RocketsList = await new RocketsBusiness();
      resp.statusCode = 200;
      resp.send(RocketsList);
    } catch (error: any){
      const errorMessage = new MessageErrorsController().getErrorMessage(error?.code || error?.message);
      resp.statusCode = errorMessage.status;

      resp.send({message: errorMessage.message});
    } finally {
      this.closeConnection();
    }
    return;
  }
}