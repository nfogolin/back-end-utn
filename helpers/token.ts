import jwt from 'jsonwebtoken';

/* Se encripta información que no es sensible y que sea útil para nosotros. Normalmente se encripta Id de usuario*/
/* Hacemos una clase "estática", no tiene sentido instanciar esto */
class Token {
    //Es una cadena que genero manualmente con los caracteres y longitud que desee.
    private static seed:string = "YCr=(w%:Dt+XGU}Ue%xFNcB=wq%fRPc&NLatPC;X+;&D/CEYvU"; //Semilla para generar el token. Es secreto y no debe compartirse. Porque la usarían para crear un token.
    private static caducidad:string = "30d";

    constructor(){

    }

    static getToken(payload:any):string{ //Información almacenada dentro del token.
        const token = jwt.sign(
            {data:payload},
            this.seed,
            {expiresIn: this.caducidad}
        );

        return token;
    }

    /* Para chequear el token necesitamos hacer una promesa, debido a que si el token es correcto
       tenemos que obtener los datos encriptados en él. Para ello necesitamos que esta función
       sea consumida de forma síncrona.
    */
    static checkToken(token:string):Promise<any>{
        return new Promise((resolve, reject)=>{
            jwt.verify(token, this.seed, (error, decode)=>{
                if (error){
                    return reject("Token enviado es incorrecto.");
                }else{
                    return resolve(decode);
                }
            })
        });
    }
}

export default Token; //Se exporta la clase completa.
//export {Token} //Otra manera.