import { Response, Request } from 'express';
import MSSQL from '../database/connection-MSSQL';

import { ResponseError } from '../helpers/log';

const SearchClients = (req:any, res:Response) => {

    let connectionId:string = (req.cn || "").toString();

    try {
        let mssql = new MSSQL(connectionId);

        mssql.SearchClients('1'
        ).then((result)=>{
            return res.json(
                {
                    Clientes: result.result,
                    Error : (result.err != null?[
                        {
                        msg: result.err.errorDescript,
                        location: 'service'
                        }
                    ]:null)
                }
            )
        }).catch((err)=>{
            ResponseError(req, res, err);
        });
    }catch(e){
        ResponseError(req, res, e);
    }
}

export {
    SearchClients
}