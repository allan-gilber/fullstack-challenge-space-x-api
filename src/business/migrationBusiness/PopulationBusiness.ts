import LaunchesTableData from '../../data/migrationData/tablesSchema/LaunchesTableData';
import RocketsTableData from '../../data/migrationData/tablesSchema/RocketsTableData';


export default class PopulationBusiness {
  public async populateRocketsTable(){
    return await new RocketsTableData().populateRocketsTable();
  }

  public async populateLaunchesTable(){
    return new LaunchesTableData().populateLaunchesTable();
  }
}