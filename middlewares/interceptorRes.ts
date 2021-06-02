import { Request, Response } from 'express';
import { RegisterLogActivity } from '../helpers/log';
 
const interceptorRes = (req:Request, res:Response, next:any) => {
    var oldWrite:any = res.write
    var oldEnd:any = res.end;

    var chunks:any = [];

    res.write = function (chunk:any):any {
        chunks.push(chunk);

        oldWrite.apply(res, arguments);
    };

    res.end = function(chunk:any) {
        if (chunk)
            chunks.push(chunk);

        var body = Buffer.concat(chunks).toString('utf8');

        let req1:any = RegisterLogActivity(req, res, 2, (res.req?.baseUrl || "").toString(), body, null);

        if (req1.refreshToken != undefined)
            res.setHeader('refreshToken', req1.refreshToken);

        res.setHeader('activityId', (req1.headers["activityId"] || "").toString());

        oldEnd.apply(res, arguments);
    };
    next();
}

export default interceptorRes;