import { Router, Response, Request } from "express";
import { body, check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields";

import interceptorReq from "../middlewares/interceptorReq";
import { isConnectionIdValid } from "../helpers/validations";
import { ErrorsEnum } from "../helpers/errorsEnum";
import { GetCities } from "../controllers/citiesController";

const CitiesRouter = Router();

CitiesRouter.post('/', [
    isConnectionIdValid,
    interceptorReq,
    check('CityId', ErrorsEnum.GetErrorDescript(ErrorsEnum.Errors.PARAM_MISSING_OR_TYPE_MISSING)).isNumeric().optional(),
    check('CountryId', ErrorsEnum.GetErrorDescript(ErrorsEnum.Errors.PARAM_MISSING_OR_TYPE_MISSING)).isNumeric().optional(),
    check('ProvinceId', ErrorsEnum.GetErrorDescript(ErrorsEnum.Errors.PARAM_MISSING_OR_TYPE_MISSING)).isNumeric().optional(),
    validateFields
],
GetCities);

export default CitiesRouter;