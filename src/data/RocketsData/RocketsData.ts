import DataBase from '../../services/DataBase';

export default class RocketsData extends DataBase {
  async getRocketsList(){
    const response = await this.connection().table('rockets').select('*').orderBy('rocket_id', 'asc');
    return response;
  }
}