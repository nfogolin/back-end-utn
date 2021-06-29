import { Router } from "express";
import { GetCustomers } from "../controllers/customersController";

import interceptorReq from "../middlewares/interceptorReq";
import { verificarToken } from "../middlewares/authentication";

const CustomersRouter = Router();

CustomersRouter.post('/', [
    verificarToken,
    interceptorReq
],
GetCustomers);

export default CustomersRouter;