import {userTokenData} from '../model/Users';
import {config} from 'dotenv';
import {JwtPayload, Secret, sign, verify} from 'jsonwebtoken';


export default class Authenticator {
  async generateNewToken( payload: userTokenData ){
    config();

    return sign(
      payload,
                process.env.JWT_KEY as Secret,
                {expiresIn: '2h'}
    );
  }

  async validateToken(token: string | undefined): Promise<userTokenData> {
    if (!token) throw new Error('invalidToken');
    config();
    try {
      const tokenData = verify(
        token,
                process.env.JWT_KEY as Secret
      ) as JwtPayload;
      (tokenData);
      return {userId: tokenData.userId as string, userRole: tokenData.userRole as string, userEmail: tokenData.userEmail as string};
    } catch (error){
      console.log('Failure in token validation.');
      throw new Error('invalidToken');
    }
  }

  verifySecretPassword(secretPassword: string): void {
    config();
    if (!process.env.SECRET_PASS){
      console.log('Please, configure the secret password for "admin" role creation');
      throw new Error('genericError');
    }
    if (!(secretPassword === process.env.SECRET_PASS)) throw new Error('emptyParamtersForSignup');
    return;
  }
}