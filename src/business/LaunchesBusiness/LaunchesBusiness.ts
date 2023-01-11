import {Request, Response} from 'express';
import LaunchesData from '../../data/LaunchesData/LaunchesData';
import RocketsData from '../../data/RocketsData/RocketsData';
import {launchesRequestParameters, launchesStats} from '../../models/launchesInfoModel';
import {rocketDataInfo} from '../../models/rocketsInfoModels';
import DataValidatorBusiness from '../DataValidatorBusiness/DataValidatorBusiness';

export default class LaunchesBusiness {


  public async getLaunchesList(request: Request){
    let searchParameters = '';
    let limit = 10;
    const offSet = 0;
    let page = 1;
    let totalOfDocuments = 0;
    let totalPages = 0;
    const failedParameterVerificationsArray: string[] = [];

    const dataValidator = new DataValidatorBusiness();

    if (request.query?.search) searchParameters = request.query.search.toString().trim();
    if (request.query?.limit){
      if (!dataValidator.checkIfStringHasOnlyNumbers(request.query.limit.toString()))  throw 'invalidParametersForLaunchesList';
      limit = Number(request.query.limit);
    }
    if (request.query?.page) {
      if (!dataValidator.checkIfStringHasOnlyNumbers(request.query.page.toString())) throw 'invalidParametersForLaunchesList';
      page = Number(request.query.page);
    }
    if (failedParameterVerificationsArray.length !== 0) throw 'invalidParametersForLaunchesList';

    const searchArguments: launchesRequestParameters = {
      limit: limit,
      search: searchParameters,
      offSet: offSet,
      page: page
    };

    const launchesList = await new LaunchesData().getLaunchesList(searchArguments);
    const getTotalNumberOfLaunches = await new LaunchesData().getTotalNumberOfLaunches();

    await Promise.all([launchesList, getTotalNumberOfLaunches]);

    totalOfDocuments = getTotalNumberOfLaunches;
    totalPages = Math.ceil(totalOfDocuments / limit);

    const response = {
      results:launchesList,
      totalDocs: totalOfDocuments,
      page: page,
      totalPages: totalPages,
      hasNext: page < totalOfDocuments,
      hasPrev: page !== 1
    };

    return response;
  }

  public async getLaunchesStatsSummary(arrayOfRocketsIds: rocketDataInfo[]){

    const result = await Promise.all(arrayOfRocketsIds.map(async (rocketData: rocketDataInfo) => {
      const response = await new LaunchesData().getTotalNumberOfSuccessfullyLaunchesByRocketId(rocketData.id);
      rocketData.totalOfLaunches = response;
      return rocketData;
    }));
    return result;
  }

  public async getLaunchesSuccessAndFailureStatsSummary(): Promise<launchesStats>{
    const totalOfSuccessAndFailures = await new LaunchesData().getNumberOfSuccessfullyAndFailedLaunches();
    const totalOfLaunches = await new LaunchesData().getTotalNumberOfLaunches();
    return {success: totalOfSuccessAndFailures, failures: totalOfLaunches - totalOfSuccessAndFailures, total: totalOfLaunches};
  }

  public async getListOfYearAndRocketName(){
    const listOfRockets = await new RocketsData().getRocketsList();
    const arrayOfPromises: any[] = [];

    listOfRockets.forEach(rocketData => {
      const launchData = new LaunchesData().getListOfLaunchesByDate(rocketData.rocket_id);
      arrayOfPromises.push(launchData);
    });

    const solvedPromises = await Promise.all(arrayOfPromises);

    return listOfRockets.map((rocket, index) => {
      return {name: rocket.rocket_name, launchData: solvedPromises[index]};
    });
  }
}