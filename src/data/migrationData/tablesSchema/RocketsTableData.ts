import MessageErrorsController from '../../../application/MessageErrorsController/MessageErrorsController';
import {rocketDataInfo} from '../../../models/rocketsInfoModels';
import {AxiosServices} from '../../../services/AxiosServices';
import DataBase from '../../../services/DataBase';

export default class RocketsTableData extends DataBase {
  private failedInsertsArray: string[] = [];

  public async createRocketsTable(){
    try {
      return await this.connection().schema.hasTable('rockets')
        .then((response: any) => {
          if (response === true)  return console.log( new MessageErrorsController().getErrorMessage('ROCKETS_TABLE_ALREADY_EXISTS').message);

          return this.connection().schema.createTable('rockets', (table: any) => {
            table.string('rocket_id').primary();
            table.string('rocket_name').notNullable();
          })
            .then(() =>  console.log('Table "rockets" successful created!'));
        });
    }
    catch (error: any){
      throw `Error in createRocketsTable: ${error?.code || error?.message}`;
    }
  }

  public async populateRocketsTable(){
    const rocketData = await new AxiosServices().getRocketsData();
    if (!rocketData) return new MessageErrorsController().getErrorMessage('EMPTY_RESPONSE_FOR_ROCKETS_DATA_GRAB');
    const result = await this.insertNewRockets(rocketData);

    if (result.length !== 0) {
      console.log('Failure in inserting the following rocket data: ', result);
      return 'partial';
    }

    return result;
  }

  public async updateRocketsTable(rocketData: any){
    const searchForRocketData = await this.connection().table('rockets').select('*').where('rocket_id', '=', rocketData.rocket_id);
    if (searchForRocketData[0]) return searchForRocketData;
    return await this.connection().table('rockets').insert(rocketData);
  }

  private async insertNewRockets(rocketData: rocketDataInfo[][]): Promise<string[] | []>{
    const arrayOfResults: string[] = [];
    try {
      const arrayOfPromises = rocketData.map(async rocketData => {
        return await this.connection().table('rockets').insert(rocketData);
      });
      await Promise.allSettled(arrayOfPromises).then(arrayOfPromises => {
        arrayOfPromises.forEach(
          (promise: any ) => {
            if (promise?.status === 'rejected') return arrayOfResults.push(promise.reason.sqlMessage);
          });
      });
    } catch (error: any ) {
      if (error?.code === 'ER_DUP_ENTRY') this.failedInsertsArray.push(error.sqlMessage);
      console.log('Error inserting new rockets table data: ', error);
      throw 'genericError';
    }
    return arrayOfResults;
  }
}