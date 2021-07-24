import Token from '../helpers/token';
import { NextFunction, Response } from 'express'
import { RegisterLogException } from '../helpers/log'

import { v4 as uuidv4 } from 'uuid';

export const verificarToken = (req:any, res:any, next:NextFunction) =>{
    
    const userToken = req.get("Authorization") || "";

    Token.checkToken(userToken).then((decode)=>{
        req.us = decode.data.us; 
        req.cn = decode.data.cn;
        const refreshToken = Token.getToken(
            {
                us : req.us,
                cn : req.cn
            }
        );
        req.refreshToken = refreshToken;
        next();
    }).catch((err)=>{
        req.headers["activityId"] = uuidv4();
        RegisterLogException(JSON.stringify(req.body), req.headers["activityId"]);
        RegisterLogException(err, req.headers["activityId"]);
        res.status(401).json({
            Error : [
                {
                msg: err,
                location: 'service',
                activityId : req.headers["activityId"]
                }
            ]
        });
    });
}