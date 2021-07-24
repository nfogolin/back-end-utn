import { Request,Response } from "express-serve-static-core";
import MSSQL from "../database/connection-MSSQL";

import { ResponseError } from "../helpers/log";
import { Mappings } from "../helpers/mappings";

const GetCustomers = (req:any, res:Response) =>{

    let userId:number = req.us;

    let connectionId:string = (req.cn || "").toString();

    try{
        let mssql = new MSSQL(connectionId);

        mssql.GetCustomers(userId).then((result) =>{
            return res.json({
                Customers: Mappings.MappingData(result.result, 'ICustomer'),
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
    GetCustomers
}