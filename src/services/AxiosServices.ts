import axios from 'axios';
import DatabaseParser from '../business/DatabaseParser/DatabaseParser';
import {rocketDataInfo} from '../models/rocketsInfoModels';

export class AxiosServices {
  private BASE_URL = 'https://api.spacexdata.com/v4/';
  private totalPages = 0;
  private LIMIT = 25;
  private actualPage = 0;
  private loopController = true;

  public async getRocketsData(): Promise<rocketDataInfo[] | []>{
    const arrayOfPromises: any[] = [];

    do {
      // eslint-disable-next-line no-await-in-loop
      const responseData: any =  await this.getBlockOfRocketsData();
      arrayOfPromises.push(responseData);
      this.actualPage++;
    } while (this.loopController);

    return await Promise.all(arrayOfPromises.map(promise => promise));
  }

  private async getBlockOfRocketsData(){
    const body = {
      'options': {
        limit: this.LIMIT,
        offset: this.LIMIT * this.actualPage
      }
    };

    const axiosRequest: any = await axios.post(`${this.BASE_URL}rockets/query`, body);
    if (this.totalPages === 0) this.totalPages = axiosRequest.data.totalPages;
    if (!axiosRequest.data.hasNextPage || this.actualPage > this.totalPages) this.loopController = false;

    const arrayOfPromises: Promise<[]>[]= await axiosRequest.data.docs.map((rocket: any) => {
      return {rocket_id: rocket.id, rocket_name: rocket.name};
    });

    return await Promise.all(arrayOfPromises.map(promise => promise));
  }

  public async getLaunchesData(): Promise<any[] | []>{
    const arrayOfPromises: any[] = [];
    do {
      // eslint-disable-next-line no-await-in-loop
      const responseData: any = await this.getBlockOfLaunchesData();
      arrayOfPromises.push(responseData);
      this.actualPage++;
    } while (this.loopController);
    return await Promise.all(arrayOfPromises.map(promise => promise));
  }

  private async getBlockOfLaunchesData(){
    const body = {
      'options': {
        limit: this.LIMIT,
        offset: this.LIMIT * this.actualPage
      }
    };
    const axiosRequest: any = await axios.post(`${this.BASE_URL}launches/query`, body);
    if (this.totalPages === 0) this.totalPages = axiosRequest.data.totalPages;
    if (!axiosRequest.data.hasNextPage || this.actualPage > this.totalPages) this.loopController = false;

    const arrayOfPromises: Promise<[]>[]= await axiosRequest.data.docs.map(async (launch: any) => {
      const parsers = new DatabaseParser();

      launch = await  parsers.launchDataPropertyNameHandler(launch);
      launch = await  parsers.stringifyArraysFields(launch);
      launch = await  parsers.convertBooleanToString(launch);

      return launch;
    });

    return await Promise.all(arrayOfPromises.map(promise => promise));
  }
}