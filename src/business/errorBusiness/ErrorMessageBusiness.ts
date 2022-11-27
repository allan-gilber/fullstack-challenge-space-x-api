import {errorMessagesData} from '../../data/errorMessageData/errorMessageData';
import {externalErrorMessage} from '../../models/errorMessageModels';

export default class ErrorMessageBusiness {
  private errorMessagesObject = errorMessagesData;

  requestErrorMessage(errorCode: string): externalErrorMessage{
    return this.errorMessagesObject[errorCode] ?
      this.errorMessagesObject[errorCode] :
      this.errorMessagesObject['genericError'];
  }
}