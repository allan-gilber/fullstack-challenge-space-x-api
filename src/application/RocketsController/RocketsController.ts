import RocketsBusiness from '../../business/RocketsBusiness/RocketsBusiness';
import {Request, Response} from 'express';
import DataBase from '../../services/DataBase';
import MessageErrorsController from '../MessageErrorsController/MessageErrorsController';

export default class RocketsController extends DataBase {
  async getRocketsList(response: Response){
    try {
      const RocketsList = await new RocketsBusiness().getRocketList();
      response.statusCode = 200;
      response.send(RocketsList);
    } catch (error: any){
      const messageController = new MessageErrorsController();

      console.log('Error in getRocketsList: ', error?.code || error?.message || error);

      const errorMessage = messageController.getErrorMessage(error?.code || error?.message || error);
      response.status(errorMessage.status ? errorMessage.status : 500)
        .send({message: errorMessage.message});
    } finally {
      this.closeConnection();
    }
    return;
  }
}