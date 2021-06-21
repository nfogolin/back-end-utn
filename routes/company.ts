import { Router, Response, Request } from "express";

import interceptorReq from "../middlewares/interceptorReq";
import { isConnectionIdValid } from "../helpers/validations";
import { GetCompany } from "../controllers/companyController";

const CompanyRouter = Router();

CompanyRouter.post('/', [
    isConnectionIdValid,
    interceptorReq
],
GetCompany);

export default CompanyRouter;