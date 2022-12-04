import cron from 'node-cron';
import LaunchesTableData from '../../data/migrationData/tablesSchema/LaunchesTableData';
import RocketsTableData from '../../data/migrationData/tablesSchema/RocketsTableData';
import {AxiosServices} from '../../services/AxiosServices';

export default class CronController {
  private cronService: any;
  private cronExpression: string;
  private isCronRunning = false;

  constructor(){
    this.cronService = cron;
    this.cronExpression = '0 9 * * *';
  }

  public async startCronService(){
    return await this.cronService.schedule(this.cronExpression, this.cronUpdater);
  }

  private async cronUpdater() {
    if (this.isCronRunning) {
      console.log('Last CRON task didn\'t finished. Skipping new task for next scheduled time.');
      return;
    }
    console.log('Starting CRON scheduled update...');

    let arrayOfPromises: any[] = [];
    this.isCronRunning= true;


    try {
      const newListOfRocketsTableData = new RocketsTableData();
      const newListOfLaunchesTableData = new LaunchesTableData();

      const rocketData = await new AxiosServices().getRocketsData();
      const launchesData = await new AxiosServices().getLaunchesData();

      rocketData.forEach(async arrayOfRocketData => {
        arrayOfRocketData.forEach(async rocketInformation => {
          const updateRocketData = await newListOfRocketsTableData.updateRocketsTable(rocketInformation);
          arrayOfPromises.push(updateRocketData);
        });});

      await Promise.all(arrayOfPromises);
      arrayOfPromises = [];

      launchesData.forEach(async arrayOfLaunchesData => {
        arrayOfLaunchesData.forEach(async (launchInformation: any) => {
          const updateLaunchesData = await newListOfLaunchesTableData.updateLaunchesTable(launchInformation);
          arrayOfPromises.push(updateLaunchesData);
        });});

      await Promise.all(arrayOfPromises);
      this.isCronRunning= false;
    }
    catch (error: any){
      console.log('Error in cronUpdater: ', error?.code || error?.message || error);
    }
    return;
  }
}