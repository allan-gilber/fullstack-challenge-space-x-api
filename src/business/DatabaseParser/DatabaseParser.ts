/* It takes an array of objects and returns an array of objects with the same data but with different keys */
export default class DatabaseParser {
  public async launchDataPropertyNameHandler(arrayOfData: any): Promise<any>{
    let temporaryObjArray: any;
    try {
      temporaryObjArray = arrayOfData;
      const arrayOfPropertys: string[] = ['id,launch_id', 'rocket,launch_rocket_id', 'name, launch_misson_name'];

      arrayOfPropertys.forEach((propertyNames: string) => {
        const arrayOfPropertyNamesToBeChanged: string[] = propertyNames.split(',');
        temporaryObjArray[arrayOfPropertyNamesToBeChanged[1]] = temporaryObjArray[arrayOfPropertyNamesToBeChanged[0]];
        delete temporaryObjArray[arrayOfPropertyNamesToBeChanged[0]];
      });

      return temporaryObjArray;

    } catch (error: any){
      console.log('error in launchDataPropertyNameHandler:', error);

      throw new Error('genericError');
    }
  }

  public async stringifyArraysFields(arrayOfData: any): Promise<any>{
    let temporaryObjArray: any;

    try {
      temporaryObjArray = arrayOfData;
      const fieldNames: string[]= ['fairings', 'links', 'failures','crew', 'ships', 'capsules', 'payloads', 'cores'];

      fieldNames.forEach((propertyName: string) => {
        temporaryObjArray[propertyName] = JSON.stringify(temporaryObjArray[propertyName]);
      });

      return temporaryObjArray;

    } catch (error: any){
      console.log('error in stringifyArraysFields:', error);

      throw new Error('genericError');
    }
  }

  public async convertBooleanToString(arrayOfData: any): Promise<any>{
    let temporaryObjArray: any;
    try {
      temporaryObjArray = arrayOfData;
      const arrayOfPropertys: string[] = ['net', 'success', 'upcoming','auto_update', 'tbd'];

      arrayOfPropertys.forEach((propertyNames: string) => {
        if (temporaryObjArray[propertyNames] === null) return;
        temporaryObjArray[propertyNames] = temporaryObjArray[propertyNames].toString();
      });

      return temporaryObjArray;

    } catch (error: any){

      console.log('error in convertBooleanToString:', error);

      throw new Error('genericError');
    }
  }
}