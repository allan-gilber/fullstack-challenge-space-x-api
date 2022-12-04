import cron from 'node-cron';
import {AxiosServices} from '../../services/AxiosServices';

export default class CronController {
  private cronService: any;
  private cronExpression: string;
  private isCronRunning = false;

  constructor(){
    this.cronService = cron;
    this.cronExpression = '* * * * *';
  }

  public async startCronService(){
    const schedule = await this.cronService.schedule(this.cronExpression, async () => {
      if (this.isCronRunning) {
        console.log('Last CRON task didn\'t finished. Skipping new task for next scheduled time.');
        return;
      }
      this.isCronRunning= true;
      console.log('Starting CRON scheduled update...');
      await new AxiosServices().getRocketsData();
      this.isCronRunning= false;
      return;
    });
    await schedule.start();
  }

  private cronUpdater() {
    return;
  }
}