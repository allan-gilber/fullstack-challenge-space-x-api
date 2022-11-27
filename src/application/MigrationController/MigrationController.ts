import PopulationBusiness from '../../business/migrationBusiness/PopulationBusiness';
import TableSchemaBusiness from '../../business/migrationBusiness/tableSchemaBusiness';
import DataBase from '../../services/DataBase';
import MessageErrorsController from '../MessageErrorsController/MessageErrorsController';

/* It's a class that creates a table schema and populates it with data */
export class MigrationController extends DataBase {
  public async startMigration(){
    try {
      console.clear();
      // Creating Table Schema
      const tableSchemaBuilder = new TableSchemaBusiness();
      await tableSchemaBuilder.createRocketsTableSchema();
      await tableSchemaBuilder.createLaunchsTableSchema();
      console.log('Fnished table Schema creation.');


      // Populating tables
      const populator = new PopulationBusiness();
      await populator.populateRocketsTable()
        .then(async result => {
          if (result === 'partial'){console.log('Finished populating rockets table with some errors.');}
          else {console.log('Finished populating table "rockets"!');}
          return await populator.populateLaunchsTable();
        })
        .then(result => {
          if (result === 'partial'){console.log('Finished populating launchs table with some errors.');}
          else {console.log('Finished populating table "launchs"!');}

          console.log('Finished all tables populators!');
          process.exit();
        });
    } catch (error: any){
      const messageCotroller = new MessageErrorsController();
      console.log('333', error);
      if (error?.code === 'ER_DUP_ENTRY') return console.log(`Error in PopulationBusiness: ${error.sqlMessage}\n`, messageCotroller.getErrorMessage('ER_DUP_ENTRY_FOR_POPULATING_ROCKETS_TABLE').message);
      console.log('Error in MigrationController: ', messageCotroller.getErrorMessage(error.code).message);
      process.exit();
    } finally {
      this.closeConnection();
    }
    return;
  }
}

new MigrationController().startMigration();