import errorMessageBusiness from '../../business/errorBusiness/ErrorMessageBusiness';
import {errorMessage} from '../../models/errorMessageModels';

/** This class is used to get the error message from the errorMessageBusiness class.
 * @property {string} errorCode;
 * @returns {string} errorMessage;
*/
export default class MessageErrorsController {
  getErrorMessage(errorCode: any): errorMessage {
    return new errorMessageBusiness().requestErrorMessage(errorCode);
  }
}