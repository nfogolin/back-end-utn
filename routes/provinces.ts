import { Router, Response, Request } from "express";
import { GetProvinces } from "../controllers/provincesController";
import { body, check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields";

import interceptorReq from "../middlewares/interceptorReq";
import { isConnectionIdValid } from "../helpers/validations";
import { ErrorsEnum } from "../helpers/errorsEnum";

const ProvincesRouter = Router();

ProvincesRouter.post('/', [
    isConnectionIdValid,
    interceptorReq,
    check('CountryId', ErrorsEnum.GetErrorDescript(ErrorsEnum.Errors.PARAM_MISSING_OR_TYPE_MISSING)).isNumeric().optional(),
    check('ProvinceId', ErrorsEnum.GetErrorDescript(ErrorsEnum.Errors.PARAM_MISSING_OR_TYPE_MISSING)).isNumeric().optional(),
    validateFields
],
GetProvinces);

export default ProvincesRouter;