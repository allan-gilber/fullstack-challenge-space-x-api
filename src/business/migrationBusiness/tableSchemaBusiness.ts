import LaunchesTableData from '../../data/migrationData/tablesSchema/LaunchesTableData';
import RocketsTableData from '../../data/migrationData/tablesSchema/RocketsTableData';

export default class TableSchemaBusiness {
  public async createRocketsTableSchema(){
    return await new RocketsTableData().createRocketsTable();
  }

  public async createLaunchesTableSchema(){
    return await new LaunchesTableData().createLaunchesTable();
  }
}