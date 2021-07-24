import { Request, Response } from "express-serve-static-core";
import MSSQL from "../database/connection-MSSQL";

import { ResponseError } from "../helpers/log";
import { Mappings } from "../helpers/mappings";

const GetProvinces = (req:any, res: Response) =>{

    let countryId:number = req.body.CountryId;
    let provinceId:number = req.body.ProvinceId;
    
    let connectionId:string = (req.get('ConnectionId') || "").toString();

    try{
        let mssql = new MSSQL(connectionId);

        mssql.GetProvinces(countryId, provinceId).then((result) =>{
            return res.json({
                Provinces: Mappings.MappingData(result.result, 'IProvince'),
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
    GetProvinces
}