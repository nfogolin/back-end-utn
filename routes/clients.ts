import { Router, Response, Request } from 'express';
import { body, check } from 'express-validator';
import { SearchClients } from '../controllers/clientsController';
import { validateFields } from '../middlewares/validate-fields'
import { verificarToken } from '../middlewares/authentication';

import interceptorReq from '../middlewares/interceptorReq'

const ClientsRouter = Router();

ClientsRouter.post('/', [
    verificarToken,
    interceptorReq
],
SearchClients);

export default ClientsRouter;