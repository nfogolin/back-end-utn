import { query } from 'jsonpath';
import { Router, Response, Request } from 'express';
import configs from '../helpers/configs';
import { ErrorsEnum } from '../helpers/errorsEnum'

const isConnectionIdValid = async (req:Request, res:Response, next:any) =>{

    let connectionId = (req.get('ConnectionId') || "").toString();
    
    const [dataBaseConfig]:any = await query(require((configs.APP_CONFIGS || "").toString()), '$..connections[?(@.connectionId=="' + connectionId + '")]');
    if (!dataBaseConfig){
        return res.status(401).json({
            error: ErrorsEnum.GetErrorDescript(ErrorsEnum.Errors.CONNECTION_ID_INVALID)
        });
    }
    
    next();
}

export {
    isConnectionIdValid
}