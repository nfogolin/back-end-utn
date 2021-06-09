import jwt from 'jsonwebtoken';
import configs from '../helpers/configs';
import { ErrorsEnum } from '../helpers/errorsEnum'

class Token {
    private static seed:string = configs.SEED_TOKEN;
    private static caducidad:string = configs.EXPIRATION_TOKEN;

    constructor(){

    }

    static getToken(payload:any):string{
        const token = jwt.sign(
            {data:payload},
            this.seed,
            {expiresIn: this.caducidad}
        );

        return token;
    }

    static checkToken(token:string):Promise<any>{
        return new Promise((resolve, reject)=>{
            jwt.verify(token, this.seed, (error, decode)=>{
                if (error){
                    return reject(ErrorsEnum.GetErrorDescript(ErrorsEnum.Errors.TOKEN_INVALID));
                }else{
                    return resolve(decode);
                }
            })
        });
    }
}

export default Token;