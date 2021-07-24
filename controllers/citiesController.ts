import { Request, Response } from "express-serve-static-core";
import MSSQL from "../database/connection-MSSQL";

import { ResponseError } from "../helpers/log";
import { Mappings } from "../helpers/mappings";

const GetCities = (req:any, res: Response) =>{

    let countryId:number = req.body.CountryId;
    let provinceId:number = req.body.ProvinceId;
    let cityId:number = req.body.CityId;
    
    let connectionId:string = (req.get('ConnectionId') || "").toString();

    try{
        let mssql = new MSSQL(connectionId);

        mssql.GetCities(cityId, provinceId, countryId).then((result) =>{
            return res.json({
                Cities: Mappings.MappingData(result.result, 'ICity'),
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
    GetCities
}