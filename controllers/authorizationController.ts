import { Response, Request } from 'express';
import MSSQL from '../database/connection-MSSQL';
import Token from '../helpers/token';

import { ResponseError } from '../helpers/log';

const AuthorizationUser = (req:Request, res:Response) => {

    let nombreUsuario:string = req.body.Usuario;
    let password:string = req.body.Password;
    let connectionId:string = (req.get('ConnectionId') || "").toString();

    try {
        let mssql = new MSSQL(connectionId);

        mssql.ValidateUser(nombreUsuario
                        , password
        ).then((result)=>{
            return res.json(
                {
                    Data: {
                        nIdUser: (result.err == null?result.result?.nIdUser:null),
                        sUserNameReal: (result.err == null?result.result?.sUserNameReal:null),
                        sUserLastName: (result.err == null?result.result?.sUserLastName:null),
                        nUserType: (result.err == null?result.result?.nUserType:null),
                        Token: (result.err == null?Token.getToken({
                            us : result.result?.nIdUser,
                            cn : connectionId
                        }):null)
                    },
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
    AuthorizationUser
}