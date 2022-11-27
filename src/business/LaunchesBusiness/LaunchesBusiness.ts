import {Request, Response} from 'express';
import LaunchesData from '../../data/LaunchesData/LaunchesData';
import {launchesRequestParameters} from '../../models/launchesInfoModel';
import DataValidatorBusiness from '../DataValidatorBusiness/DataValidatorBusiness';

export default class LaunchesBusiness {
  private searchParameters = '';
  private limit = 10;
  private offSet = 0;
  private page = 1;
  private totalOfDocuments = 0;
  private totalPages = 0;
  private failedParameterVerificationsArray: string[] = [];

  public async getLaunchesList(request: Request){
    const dataValidator = new DataValidatorBusiness();
    // const validateDataArray = dataValidator.checkIfStringHasOnlyNumbers(request.query);
    if (request.query?.search) this.searchParameters = request.query.search.toString();

    if (request.query?.limit){
      if (!dataValidator.checkIfStringHasOnlyNumbers(request.query.limit.toString()))  throw 'invalidParametersForLaunchesList';
      this.limit = Number(request.query.limit);
    }
    if (request.query?.page) {
      if (!dataValidator.checkIfStringHasOnlyNumbers(request.query.page.toString())) throw 'invalidParametersForLaunchesList';
      this.page = Number(request.query.page);
    }
    if (this.failedParameterVerificationsArray.length !== 0) throw 'invalidParametersForLaunchesList';

    const searchArguments: launchesRequestParameters = {
      limit: this.limit,
      search: this.searchParameters,
      offSet: this.offSet,
      page: this.page
    };

    const launchesList = await new LaunchesData().getLaunchesList(searchArguments);
    const getTotalNumberOfLaunches = await new LaunchesData().getTotalNumberOfLaunches();

    await Promise.all([launchesList, getTotalNumberOfLaunches]);

    this.totalOfDocuments = getTotalNumberOfLaunches;
    this.totalPages = Math.ceil(this.totalOfDocuments / this.limit);

    const response = {
      results:launchesList,
      totalDocs: this.totalOfDocuments,
      page: this.page,
      totalPages: this.totalPages,
      hasNext: this.page < this.totalOfDocuments,
      hasPrev: this.page !== 1
    };

    return response;
  }
}