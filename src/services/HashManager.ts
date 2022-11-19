import {compareSync, genSaltSync, hash} from 'bcryptjs';

export default class HashManager{
  async createHash(plaintText: string){
    const salt = genSaltSync(12);

    const cypherText = await hash(plaintText, salt);

    return cypherText;
  }

  async compareHashs(plaintText: string, cypherText: string){
    return compareSync(plaintText, cypherText);
  }
}