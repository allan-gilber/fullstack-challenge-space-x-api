import DataValidatorBusiness from '../../business/DataValidatorBusiness/DataValidatorBusiness';

export default class DataValidatorController {
  public validateLaunchesParameters(parameters: any){
    return new DataValidatorBusiness().checkIfStringHasOnlyNumbers(parameters);
  }
}