import { Router } from "express";
import { check } from "express-validator";
import { CreateUser, UpdateUserPassword } from "../controllers/usersController";
import { validateFields } from "../middlewares/validate-fields";

import interceptorReq from "../middlewares/interceptorReq";
import { isCityValid, isConnectionIdValid, isValidNewPassword } from "../helpers/validations";
import { ErrorsEnum } from "../helpers/errorsEnum";
import { verificarToken } from "../middlewares/authentication";

const UserRouter = Router();

UserRouter.post('/', [
    isConnectionIdValid,
    interceptorReq,
    check('UserName', ErrorsEnum.GetErrorDescript(ErrorsEnum.Errors.PARAM_MISSING_OR_TYPE_MISSING)).not().isEmpty(),
    check('Password', ErrorsEnum.GetErrorDescript(ErrorsEnum.Errors.PARAM_MISSING_OR_TYPE_MISSING)).not().isEmpty(),
    check('RepeatPassword', ErrorsEnum.GetErrorDescript(ErrorsEnum.Errors.PARAM_MISSING_OR_TYPE_MISSING)).not().isEmpty(),
    check('Nombre', ErrorsEnum.GetErrorDescript(ErrorsEnum.Errors.PARAM_MISSING_OR_TYPE_MISSING)).not().isEmpty(),
    check('Fantasia', ErrorsEnum.GetErrorDescript(ErrorsEnum.Errors.PARAM_MISSING_OR_TYPE_MISSING)).not().isEmpty(),
    check('Apellido', ErrorsEnum.GetErrorDescript(ErrorsEnum.Errors.PARAM_MISSING_OR_TYPE_MISSING)).not().isEmpty(),
    check('Mail', ErrorsEnum.GetErrorDescript(ErrorsEnum.Errors.PARAM_MISSING_OR_TYPE_MISSING)).not().isEmpty(),
    check('Cuit', ErrorsEnum.GetErrorDescript(ErrorsEnum.Errors.PARAM_MISSING_OR_TYPE_MISSING)).not().isEmpty(),
    check('Ciudad').custom((Ciudad, { req }) => {
        return isCityValid(Ciudad, (req.get('ConnectionId') || "").toString(), req.headers!["activityId"]);
    }),
    validateFields
],
CreateUser);

UserRouter.put('/', [
    verificarToken,
    interceptorReq,
    check('OldPassword', ErrorsEnum.GetErrorDescript(ErrorsEnum.Errors.PARAM_MISSING_OR_TYPE_MISSING)).not().isEmpty(),
    check('NewPassword', ErrorsEnum.GetErrorDescript(ErrorsEnum.Errors.PARAM_MISSING_OR_TYPE_MISSING)).not().isEmpty(),
    check('RepeatPassword', ErrorsEnum.GetErrorDescript(ErrorsEnum.Errors.PARAM_MISSING_OR_TYPE_MISSING)).not().isEmpty(),
    check('NewPassword').custom((NewPassword, { req }) => {
        return isValidNewPassword(NewPassword, req.body?.RepeatPassword);
    }),
    validateFields
],
UpdateUserPassword);

export default UserRouter;