import { Router, Response, Request } from 'express';
import { body, check } from 'express-validator';
import { AuthorizationUser } from '../controllers/authorizationController';
import { isConnectionIdValid } from '../helpers/validations'
import { validateFields } from '../middlewares/validate-fields'
import { ErrorsEnum } from '../helpers/errorsEnum'

import interceptorReq from '../middlewares/interceptorReq'

const AuthorizationRouter = Router();

AuthorizationRouter.post('/', [
    isConnectionIdValid,
    interceptorReq,
    body('Usuario', ErrorsEnum.GetErrorDescript(ErrorsEnum.Errors.ERROR_USUARIO)).not().isEmpty(),
    body('Password', ErrorsEnum.GetErrorDescript(ErrorsEnum.Errors.ERROR_PASSWORD)).not().isEmpty(),
    validateFields
],
AuthorizationUser);

export default AuthorizationRouter;