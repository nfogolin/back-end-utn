import { Router, Response, Request } from 'express';
import { verificarToken } from '../middlewares/authentication';

import interceptorReq from '../middlewares/interceptorReq'
import { GetPriceLists } from '../controllers/priceListsController';

const PriceListRouter = Router();

PriceListRouter.post('/', [
    verificarToken,
    interceptorReq
],
GetPriceLists);

export default PriceListRouter;