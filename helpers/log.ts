const log = require('log-to-file');
import MSSQL from '../database/connection-MSSQL';

const RegisterLogException = (sLog:string, activityId:string):string => {
    log("activityId: " + activityId + " => " + sLog);
    return "La operación no se pudo finalizar.";
}

const ResponseError = (req:any, res:any, err:any) =>{

    RegisterLogActivity(req, res, 3, req.baseUrl, undefined, err.toString());

    res.status(401).json({
        Error : RegisterLogException(err, (req.headers["activityId"] || "").toString()),
        activityId : req.headers["activityId"]
    });
}

const RegisterLogActivity = (req:any
                            , res:any
                            , nType: number
                            , sUrl:string
                            , sSoapMessage?: any
                            , ExceptionMessage?: any
                            ):Request => {
    let connectionId:string = (req.get('ConnectionId') || "").toString();
    
    if (connectionId == "")
        connectionId = req.cn

    try {
        if (connectionId != undefined){
            
            let mssql = new MSSQL(connectionId);

            mssql.LogServiceActivity((req.headers["activityId"] || "").toString()
                            , nType
                            , req.get('host')
                            , sUrl
                            , sSoapMessage
                            , ExceptionMessage
                            , (req.us != undefined?req.us:undefined)
            ).catch((err)=>{
                RegisterLogException(err, req.headers["activityId"])
            });
        }
    }catch(e){
        RegisterLogException(e, req.headers["activityId"])
    }

    return req;
}

export { ResponseError, RegisterLogActivity, RegisterLogException };