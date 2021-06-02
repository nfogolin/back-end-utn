import { query } from 'jsonpath';
import { Router, Response, Request } from 'express';

const isConnectionIdValid = async (req:Request, res:Response, next:any) =>{

    let connectionId = (req.get('ConnectionId') || "").toString();
    
    const [dataBaseConfig]:any = await query(require((process.env.CONNECTIONS_CONFIG || "").toString()), '$..connections[?(@.connectionId=="' + connectionId + '")]');
    if (!dataBaseConfig){
        return res.status(401).json({
            error: 'connectionId no es válido.'
        });
    }
    
    next();
}

export {
    isConnectionIdValid
}