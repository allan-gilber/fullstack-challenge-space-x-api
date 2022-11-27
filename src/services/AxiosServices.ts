import axios from 'axios';
import DatabaseParser from '../business/DatabaseParser/DatabaseParser';
import {rocketDataInfo} from '../models/rocketsInfoModels';

export class AxiosServices {
  private BASE_URL = 'https://api.spacexdata.com/v4/';
  private totalPages = 0;
  private LIMIT = 25;
  private actualPage = 0;
  private loopControler = true;

  public async getRocketsData(): Promise<rocketDataInfo[] | []>{
    return await axios.get(`${this.BASE_URL}rockets`).then((response: any) => {
      return response.data.map((rocket: any) => {
        return {rocket_id: rocket.id, rocket_name: rocket.name};
      });
    }).catch(error => {
      console.log('getRocketsData error:', error.message || error.response?.data?.message);
      return [];
    });
  }

  public async getLaunchsData(): Promise<any[] | []>{
    const requestData = await this.requestAlLLaunchData();
    return requestData;
  }

  private requestAlLLaunchData = async () => {
    const arrayOfPromisses: any[] = [];
    do {
      console.log('rodou', this.loopControler, this.actualPage, this.totalPages, this.actualPage > this.totalPages);
      // eslint-disable-next-line no-await-in-loop
      const responseData: any = await this.getBlockOfLaunchData();
      console.log('nextpage3:', responseData.hasNextPage);
      arrayOfPromisses.push(responseData);
      this.actualPage++;
    } while (this.loopControler);
    return Promise.all(arrayOfPromisses.map(promise => promise));
  };

  private async getBlockOfLaunchData(){
    const body = {
      'options': {
        limit: this.LIMIT,
        offset: this.LIMIT * this.actualPage
      }
    };
    const axiosRequest: any = await axios.post(`${this.BASE_URL}launches/query`, body);
    console.log('axiosRequest', axiosRequest.data.hasNextPage, axiosRequest.data.totalPages);
    if (this.totalPages === 0) this.totalPages = axiosRequest.data.totalPages;
    if (!axiosRequest.data.hasNextPage || this.actualPage > this.totalPages) this.loopControler = false;

    console.log('size:', axiosRequest.data.docs.length);
    const arrayOfPromisses: Promise<[]>[]= await axiosRequest.data.docs.map(async (launch: any) => {
      const parsers = new DatabaseParser();

      launch = await  parsers.launchDataPropertyNameHandler(launch);
      launch = await  parsers.stringifyArraysFields(launch);
      launch = await  parsers.convertBooleanToString(launch);

      return launch;
    });

    return await Promise.all(arrayOfPromisses.map(promise => promise));
  }
}