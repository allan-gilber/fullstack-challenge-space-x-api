import RocketsData from '../../data/RocketsData/RocketsData';

export default class RocketsBusiness {
  public async getRocketList(){
    const arrayOfRockets =  await new RocketsData().getRocketsList();
    return arrayOfRockets.map((rocket: any) => {
      return {id: rocket.rocket_id, name: rocket.rocket_name};
    });
  }
}