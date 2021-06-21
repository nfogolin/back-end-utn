import { validationResult } from 'express-validator'
import { Request, Response } from 'express';

const validateFields = (req:Request, res:Response, next:any) =>{

    const errors = validationResult(req);
    const errorsReturn:any[] = [];

    errors.array().forEach(error => {
        if (errorsReturn.findIndex(errorRt => errorRt.param === error.param) < 0){
            errorsReturn.push(error);
        }
    });

    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            errors: errorsReturn
        });
    }
    next();
}

export {
    validateFields
}