import {launchesRequestParameters} from '../../models/launchesInfoModel';
import DataBase from '../../services/DataBase';

export default class LaunchesData extends DataBase {

  public async getLaunchesList(searchArguments: launchesRequestParameters){
    const listOfLaunches = await this.connection().table('launches')
      .select('*')
      .limit(searchArguments.limit)
      .offset(searchArguments.offSet * searchArguments.page)
      .whereLike('launch_mission_name',`%${searchArguments.search}%`);

    return listOfLaunches;
  }

  public async getTotalNumberOfLaunches(): Promise<number>{
    const totalOfLaunches = await this.connection().table('launches')
      .count('launch_id as total');
    return totalOfLaunches[0].total;
  }

  public async getTotalNumberOfSuccessfullyLaunchesByRocketId(rocketId: string): Promise<number>{
    const request = await this.connection().table('launches')
      .count('launch_id as total').where({'launch_rocket_id': rocketId});
    return request[0].total;
  }

  public async getNumberOfSuccessfullyAndFailedLaunches():Promise<number>{
    const request = await this.connection().table('launches')
      .count('success as success').where({'success': 'true'});
    return request[0].success;
  }

  public async getListOfLaunchesByDate() {
    const request = await this.connection().table('launches').select('date_utc', 'rocket_name');
    return request;
  }
}