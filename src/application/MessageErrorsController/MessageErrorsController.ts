import errorMessageBusiness from '../../business/ErrorBusiness/ErrorMessageBusiness';
import {errorMessage, externalErrorMessage} from '../../models/errorMessageModels';

/** This class is used to get the error message from the errorMessageBusiness class.
 * @property {string} errorCode;
 * @returns {string} errorMessage;
*/
export default class MessageErrorsController {
  getErrorMessage(errorCode: any): externalErrorMessage {
    return new errorMessageBusiness().requestErrorMessage(errorCode);
  }
}