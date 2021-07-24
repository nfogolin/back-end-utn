import { Response, Request } from 'express';
import MSSQL from '../database/connection-MSSQL';

import { ResponseError } from '../helpers/log';
import { Mappings } from '../helpers/mappings';

const GetPriceLists = (req:any, res:Response) => {

    let connectionId:string = (req.cn || "").toString();
    let userId:number = (req.us || "").toString();

    try {
        let mssql = new MSSQL(connectionId);

        mssql.GetPriceList(userId
        ).then((result)=>{
            return res.json(
                {
                    PriceLists: Mappings.MappingData(result.result, 'IPriceList'),
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
    GetPriceLists
}