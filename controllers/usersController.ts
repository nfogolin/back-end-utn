import { Request, Response } from "express-serve-static-core";
import MSSQL from "../database/connection-MSSQL";

import { ResponseError } from "../helpers/log";
import { Mappings } from "../helpers/mappings";

const CreateUser = (req:any, res:Response) =>{

    let userName:string = req.body.UserName;
    let password:string = req.body.Password;
    let repeatPassword:string = req.body.RepeatPassword;
    let nombre:string = req.body.Nombre;
    let fantasia:string = req.body.Fantasia;
    let apellido:string = req.body.Apellido;
    let mail:string = req.body.Mail;
    let cuit:string = req.body.Cuit;
    let ciudadId:number = req.body.Ciudad.Id;

    let connectionId:string = (req.get('ConnectionId') || "").toString();

    try{
        let mssql = new MSSQL(connectionId);

        mssql.CreateUser(userName
                    , password
                    , repeatPassword
                    , nombre
                    , fantasia
                    , apellido
                    , mail
                    , cuit
                    , ciudadId
        ).then((result) =>{

            if (result.err == null){

                mssql.GetCustomers(result.result?.nIdUser).then((resultCms) =>{
                    res.json({
                        UserId : result.result?.nIdUser,
                        Customer : Mappings.MappingData(resultCms.result, 'ICustomer'),
                        Error: null
                    });
                }).catch((err)=>{
                    ResponseError(req, res, err);
                });
                
            }else{
                res.json({
                    Error : (result.err != null?[
                        {
                        msg: result.err.errorDescript,
                        location: 'service'
                        }
                    ]:null)
                });
            }

        }).catch((err)=>{
            ResponseError(req, res, err);
        });
    }catch(e){
        ResponseError(req, res, e);
    }
}

const UpdateUserPassword = (req:any, res:Response) =>{

    let oldPassword:string = req.body.OldPassword;
    let newPassword:string = req.body.NewPassword;
    let repeatPassword:string = req.body.RepeatPassword;
    let userId:number = req.us;

    let connectionId:string = (req.cn || "").toString();

    try{
        let mssql = new MSSQL(connectionId);

        mssql.UpdateUserPassword(userId
                            , oldPassword
                            , newPassword
                            , repeatPassword
        ).then((result) =>{

            res.json({
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

const GetUserData = (req:any, res: Response) =>{

    let userId:number = req.us;
    
    let connectionId:string = (req.cn || "").toString();

    try{
        let mssql = new MSSQL(connectionId);

        mssql.GetUserInfo(userId).then((result) =>{
            return res.json({
                User: Mappings.MappingData(result.result, 'IUser'),
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
    CreateUser,
    UpdateUserPassword,
    GetUserData
}