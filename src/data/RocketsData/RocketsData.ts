import DataBase from '../../services/DataBase';

export default class RocketsData extends DataBase {
  async getRocketsList(){
    return await this.connection().table('rockets').select('*').orderBy('rocket_id', 'asc');
  }
}