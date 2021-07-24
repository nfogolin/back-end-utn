import { query } from 'jsonpath';
import { Response, Request } from 'express';
import configs from '../helpers/configs';
import { ErrorsEnum } from '../helpers/errorsEnum'
import MSSQL from '../database/connection-MSSQL';
import { RegisterLogException, ResponseError } from './log';

const isConnectionIdValid = async (req:Request, res:Response, next:any) =>{

    let connectionId = (req.get('ConnectionId') || "").toString();
    
    const [dataBaseConfig]:any = await query(require((configs.APP_CONFIGS || "").toString()), '$..connections[?(@.connectionId=="' + connectionId + '")]');
    if (!dataBaseConfig){
        return res.status(401).json({
            Error : [
                {
                    msg: ErrorsEnum.GetErrorDescript(ErrorsEnum.Errors.CONNECTION_ID_INVALID),
                    location: 'service'
                }
            ]
        });
    }

    next();
    
    return connectionId;
}

const isCityValid = async (Ciudad:any, connectionId:string, activityId:string) =>{
    
    let cityId:number = (Ciudad?.Id == undefined?-1: Ciudad.Id);
    let error:boolean = false;

    try{
        let mssql = new MSSQL(connectionId);

        await mssql.GetCities(cityId).then((result) =>{
            if ((result.result as any[]).length == 0){
                error = true;
            }
        }).catch((err)=>{
            RegisterLogException(err, activityId);
        });
    }catch(e){
        RegisterLogException(e, activityId);
    }

    if (error){
        throw new Error(ErrorsEnum.GetErrorDescript(ErrorsEnum.Errors.PARAM_MISSING_OR_TYPE_MISSING));
    }
}

const isValidNewPassword = async(NewPassword:string, RepeatPassword:string) => {
    if (NewPassword != RepeatPassword){
        throw new Error(ErrorsEnum.GetErrorDescript(ErrorsEnum.Errors.PASSWORDS_NOT_MATCH));
    }
}

export {
    isConnectionIdValid,
    isCityValid,
    isValidNewPassword
}