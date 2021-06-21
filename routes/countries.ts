import { Router, Response, Request } from "express";
import { body, check } from "express-validator";
import { GetCountries } from "../controllers/countriesController";
import { validateFields } from "../middlewares/validate-fields";

import interceptorReq from "../middlewares/interceptorReq";
import { isConnectionIdValid } from "../helpers/validations";
import { ErrorsEnum } from "../helpers/errorsEnum";

const CountriesRouter = Router();

CountriesRouter.post('/', [
    isConnectionIdValid,
    interceptorReq,
    check('CountryId', ErrorsEnum.GetErrorDescript(ErrorsEnum.Errors.PARAM_MISSING_OR_TYPE_MISSING)).not().isEmpty().isNumeric(),
    validateFields
],
GetCountries);

export default CountriesRouter;