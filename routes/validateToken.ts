import { Router, Response, Request } from 'express';
import { GetUserData } from '../controllers/usersController';
import { verificarToken } from '../middlewares/authentication';

import interceptorReq from '../middlewares/interceptorReq'

const ValidateTokenRouter = Router();

ValidateTokenRouter.post('/', [
    verificarToken,
    interceptorReq
], GetUserData);

export default ValidateTokenRouter;