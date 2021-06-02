import { Router, Response, Request } from 'express';
import { body, check } from 'express-validator';
import { AuthorizationUser } from '../controllers/authorizationController';
import { isConnectionIdValid } from '../helpers/validations'
import { validateFields } from '../middlewares/validate-fields'

import interceptorReq from '../middlewares/interceptorReq'

const AuthorizationRouter = Router();

AuthorizationRouter.post('/', [
    isConnectionIdValid,
    interceptorReq,
    body('Usuario', 'El usuario no puede estar vacío.').not().isEmpty(),
    body('Password', 'La contraseña no puede estar vacía.').not().isEmpty(),
    validateFields
],
AuthorizationUser);

export default AuthorizationRouter;