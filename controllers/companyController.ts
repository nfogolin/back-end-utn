import { Request, Response } from "express-serve-static-core";
import MSSQL from "../database/connection-MSSQL";

import { ResponseError } from "../helpers/log";
import { Mappings } from "../helpers/mappings";

const GetCompany = (req:any, res:Response) =>{

    let connectionId:string = (req.get('ConnectionId') || "").toString();

    try{
        let mssql = new MSSQL(connectionId);

        mssql.GetCompany().then((result) =>{
            return res.json({
                Company: Mappings.MappingData(result.result, 'ICompany'),
                Error : (result.err != null?[
                    {
                    msg: result.err.errorDescript,
                    location: 'service'
                    }
                ]:null)
            });
        }).catch((err)=>{
            ResponseError(req, res, err);
        });
    }catch(e){
        ResponseError(req, res, e);
    }
}

export {
    GetCompany
}