import LaunchsTableData from '../../data/migrationData/tablesSchema/LaunchsTableData';
import RocketsTableData from '../../data/migrationData/tablesSchema/RocketsTableData';


export default class PopulationBusiness {
  public async populateRocketsTable(){
    return await new RocketsTableData().populateRocketsTable();
  }

  public async populateLaunchsTable(){
    return new LaunchsTableData().populateLaunchsTable();
  }
}