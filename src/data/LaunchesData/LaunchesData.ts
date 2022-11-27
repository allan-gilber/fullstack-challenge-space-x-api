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
}