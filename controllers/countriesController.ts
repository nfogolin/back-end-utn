import { Request, Response } from "express-serve-static-core";
import MSSQL from "../database/connection-MSSQL";

import { ResponseError } from "../helpers/log";
import { Mappings } from "../helpers/mappings";
import ICountry from "../interfaces/countries";

const GetCountries = (req:any, res: Response) =>{

    let countryId:number = req.body.CountryId;
    
    let connectionId:string = (req.get('ConnectionId') || "").toString();

    try{
        let mssql = new MSSQL(connectionId);

        mssql.GetCountries(countryId).then((result) =>{
            return res.json({
                Countries: Mappings.MappingData(result.result, 'ICountry'),
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
    GetCountries
}