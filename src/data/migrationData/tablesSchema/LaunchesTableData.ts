import DataBase from '../../../services/DataBase';
import MessageErrorsController from '../../../application/MessageErrorsController/MessageErrorsController';
import {AxiosServices} from '../../../services/AxiosServices';


export default class LaunchesTableData extends DataBase {

  private failedInsertsArray: string[] = [];

  public async createLaunchesTable(){
    const boolean = [false, true];
    try {
      return this.connection().schema.hasTable('launches')
        .then((response: any) => {
          if (response === true) return console.log( new MessageErrorsController().getErrorMessage('LAUNCHES_TABLE_ALREADY_EXISTS').message);

          return this.connection().schema.createTable('launches', (table: any) => {
            table.string('launch_id').primary();
            table.string('launch_library_id');
            table.string('launch_rocket_id');
            table.string('fairings');
            table.string('links', 3000);
            table.string('static_fire_date_utc');
            table.string('static_fire_date_unix');
            table.enu('net', boolean);
            table.integer('window');
            table.enu('success', boolean);
            table.string('failures');
            table.string('details', 2000);
            table.string('crew');
            table.string('ships');
            table.string('capsules');
            table.string('payloads', 2000);
            table.string('launchpad');
            table.integer('flight_number');
            table.string('launch_mission_name');
            table.string('date_utc');
            table.string('date_unix');
            table.string('date_local');
            table.string('date_precision');
            table.enu('upcoming', boolean);
            table.string('cores', 2000);
            table.enu('auto_update', boolean);
            table.enu('tbd', boolean);
          })
            .then(() => console.log('Table "launches" successful created!'));
        });
    }
    catch (error: any){
      throw `Error in createLaunchesTable: ${error?.code || error?.message}`;
    }
  }

  public async populateLaunchesTable() {
    const launchData = await new AxiosServices().getLaunchesData();
    if (!launchData) return new MessageErrorsController().getErrorMessage('EMPTY_RESPONSE_FOR_LAUNCHES_DATA_GRAB');
    return await this.insertNewLaunches(launchData)
      .then((result: [] | string[]) => {
        if (result.length !== 0){
          console.log('Failure in inserting the following launch data: ', result);
          return 'partial';
        }
      });
  }

  private async insertNewLaunches(launchesData: any): Promise<string[] | []>{
    const arrayOfResults: string[] = [];

    try {
      const arrayOfPromises = launchesData.map(async (data: any) => {
        return await this.connection().table('launches').insert(data);
      });
      await Promise.allSettled(arrayOfPromises)
        .then(arrayOfPromises => {
          arrayOfPromises.forEach(
            (promise: any ) => {
              if (promise?.status === 'rejected') return arrayOfResults.push(promise.reason.sqlMessage);
            });
        });
    } catch (error: any){
      if (error?.code === 'ER_DUP_ENTRY') this.failedInsertsArray.push(error.sqlMessage);
      console.log('Error inserting new launches table data: ', error);
      throw 'genericError';
    }
    return arrayOfResults;
  }

  public async updateLaunchesTable(launchData: any){
    const searchForLaunchData = await this.connection().table('launches').select('*').where('launch_id', '=', launchData.launch_id);
    if (searchForLaunchData[0]) return searchForLaunchData;
    return await this.connection().table('launches').insert(launchData);
  }
}