export default class DataValidatorBusiness {
  public checkIfStringHasOnlyNumbers(string: string) {
    return /^\d+$/.test(string);
  }
}