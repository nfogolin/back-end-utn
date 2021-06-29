import { query } from 'jsonpath';
import configs from '../helpers/configs';

enum Errors {
    ERROR_USUARIO = 1,
    ERROR_PASSWORD = 2,
    ERROR_USER_OR_PASS_INVALID = 3,
    CONNECTION_ID_INVALID = 4,
    TOKEN_INVALID = 5,
    COULD_NOT_OPERATION = 6,
    PARAM_MISSING_OR_TYPE_MISSING = 7,
    PASSWORDS_NOT_MATCH = 8
}

export class ErrorsEnum {

    static Errors = Errors;

    static GetErrorDescript (ErrorNum:number):string {
        let [error]:any = query(require(configs.APP_CONFIGS), '$..errors[?(@.errorNum==' + ErrorNum + ')]');

        return error.errorDescript;
    }
}