const { TYPES } = require("mssql");
const sql = require('mssql/msnodesqlv8');
import { query } from 'jsonpath';
import configs from '../helpers/configs';
import { ErrorsEnum } from '../helpers/errorsEnum'

class MSSQL {

    connectionId:string

    constructor(connectionId:string){
        this.connectionId = connectionId;
    }

    createConnection = () => {
        try{
          let [dataBaseConfig]:any = query(require(configs.APP_CONFIGS), '$..connections[?(@.connectionId=="' + this.connectionId + '")]');
          return new sql.ConnectionPool({
            database: dataBaseConfig.host.database,
            server: dataBaseConfig.host.name,
            driver: 'msnodesqlv8',
            options: {
                trustedConnection: true
            },
            setTimeout: dataBaseConfig.host.timeout
          }).connect();
        }catch(e){
          throw e;
        }
    }
    
    ValidateUser = async (sUserName:string
                              , sPassword:string
    ) => {
      try {
        const pool = await this.createConnection();
        const result = await pool.request()
          .input("userName", TYPES.VarChar, sUserName)
          .input("password", TYPES.VarChar, sPassword)
          .output("userID", TYPES.BigInt)
          .output("userNameReal", TYPES.Varchar)
          .output("userLastName", TYPES.Varchar)
          .output("userType", TYPES.Int)
          .execute('sp_ValidateUser');
      return {
        result: {
        nIdUser: result.output.userID,
        sUserNameReal: result.output.userNameReal,
        sUserLastName: result.output.userLastName,
        nUserType: result.output.userType
        },
          err: (result.output.userID == null?
            {
              errorCode : 0,
              errorDescript : ErrorsEnum.GetErrorDescript(ErrorsEnum.Errors.ERROR_USER_OR_PASS_INVALID)
            }
            : null) 
        };
      } catch (err) {
        throw err;
      }
    };

    LogServiceActivity = async (sActivityId:string
                          , nType:number
                          , sUrl:any = null
                          , sAction:any = null
                          , sSoapMessage:any = null
                          , ExceptionMessage:any = null
                          , userId:any = null
    ) => {
    try {
      const pool = await this.createConnection();
      const result = await pool.request()
      .input("activityId", TYPES.VarChar, sActivityId)
      .input("nType", TYPES.Int, nType)
      .input("sUrl", TYPES.VarChar, sUrl)
      .input("sAction", TYPES.VarChar, sAction)
      .input("sSoapMessage", TYPES.VarChar, sSoapMessage)
      .input("ExceptionMessage", TYPES.VarChar, ExceptionMessage)
      .input("userId", TYPES.Int, userId)
      .output("errorCode", TYPES.Varchar)
      .output("errorDescription", TYPES.Varchar)
      .execute('sp_LogServiceActivity');
    return {
      result: {
        
      },
      err: (result.output.errorCode != null?
        {
          errorCode : result.output.errorCode,
          errorDescript : result.output.errorDescription
        }
        : null) 
    };
    } catch (err) {
      throw err;
      }
    };

    GetUserInfo = async (IdUser:number) => {
      try {
        const pool = await this.createConnection();
        const result = await pool.request()
        .input("IdUser", TYPES.Int, IdUser)
        .query(`select IdCodigo, Nombre, Apellido, NUsuario from Empresas.dbo.Usuarios (NOLOCK) where Fecha_Anula IS NULL and IdCodigo = @IdUser`);
          return {
            result: result.recordset,
            err: (result.output.errorCode != null?
              {
                errorCode : result.output.errorCode,
                errorDescript : result.output.errorDescription
              }
              : null)
          };
      } catch (err) {
        throw err;
      }
    };

    GetCountries = async (countryId:number
    ) => {
      try {
        const pool = await this.createConnection();
        const result = await pool.request()
          .query(`select * from GetCountryEntity(${countryId})`);
        return {
          result: result.recordset,
          err: (result.output.errorCode != null?
            {
              errorCode : result.output.errorCode,
              errorDescript : result.output.errorDescription
            }
            : null)
        };
      } catch (err) {
        throw err;
      }
    };

    GetProvinces = async (countryId?:number
                        , provinceId?:number
    ) => {
      try {
        const pool = await this.createConnection();
        const result = await pool.request()
          .input("provinceId", TYPES.BigInt, provinceId)
          .input("countryId", TYPES.BigInt, countryId)
          .execute('sp_GetProvinces');
          return {
            result: result.recordset,
            err: (result.output.errorCode != null?
              {
                errorCode : result.output.errorCode,
                errorDescript : result.output.errorDescription
              }
              : null)
          };
      } catch (err) {
        throw err;
      }
    };

    GetCities = async (cityId?:number
                        , provinceId?:number
                        , countryId?:number
    ) => {
      try {
        const pool = await this.createConnection();
        const result = await pool.request()
          .input("cityId", TYPES.BigInt, cityId)
          .input("provinceId", TYPES.BigInt, provinceId)
          .input("countryId", TYPES.BigInt, countryId)
          .execute('sp_GetCities');
          return {
            result: result.recordset,
            err: (result.output.errorCode != null?
              {
                errorCode : result.output.errorCode,
                errorDescript : result.output.errorDescription
              }
              : null)
          };
      } catch (err) {
        throw err;
      }
    };

    GetCompany = async () => {
      try {
        const pool = await this.createConnection();
        const result = await pool.request()
        .output("errorCode", TYPES.BigInt)
        .output("errorDescription", TYPES.Varchar)
        .execute('sp_GetCompany');
        return {
          result: (result.output.errorCode != null?null:result.recordset),
          err: (result.output.errorCode != null?
            {
              errorCode : result.output.errorCode,
              errorDescript : result.output.errorDescription
            }
            : null) 
        };
      } catch (err) {
        throw err;
      }
    };

    GetCustomers = async (userId : number) => {
      try {
        const pool = await this.createConnection();
        const result = await pool.request()
        .input("userID", TYPES.BigInt, userId)
        .execute('sp_GetCustomers');
        return {
          result: (result.output.errorCode != null?null:result.recordset),
          err: (result.output.errorCode != null?
            {
              errorCode : result.output.errorCode,
              errorDescript : result.output.errorDescription
            }
            : null) 
        };
      } catch (err) {
        throw err;
      }
    };

    CreateUser = async (userName:string
                    , password:string
                    , repeatPassword:string
                    , nombre:string
                    , fantasia:string
                    , apellido:string
                    , mail:string
                    , cuit:string
                    , ciudadId:number) => {
      try {
        const pool = await this.createConnection();
        const result = await pool.request()
        .input("sUserName", TYPES.VarChar, userName)
        .input("sPassword", TYPES.VarChar, password)
        .input("sRepeatNewPassword", TYPES.VarChar, repeatPassword)
        .input("sNombre", TYPES.VarChar, nombre)
        .input("sFantasia", TYPES.VarChar, fantasia)
        .input("sApellido", TYPES.VarChar, apellido)
        .input("sEmail", TYPES.VarChar, mail)
        .input("sCuit", TYPES.VarChar, cuit)
        .input("nIdCiudad", TYPES.BigInt, ciudadId)
        .input("nIdTipoIva", TYPES.BigInt, 2) //Lo hardcodeo.
        .output("nIdUser", TYPES.BigInt)
        .output("nIdClienteProcessed", TYPES.BigInt)
        .output("errorCode", TYPES.Varchar)
        .output("errorDescription", TYPES.Varchar)
        .execute('sp_CreateLogin');
        return {
          result: (result.output.errorCode != null?null:{ nIdUser : result.output.nIdUser, nIdClienteProcessed : result.output.nIdClienteProcessed }),
          err: (result.output.errorCode != null?
            {
              errorCode : result.output.errorCode,
              errorDescript : result.output.errorDescription
            }
            : null) 
        };
      } catch (err) {
        throw err;
      }
    };

    UpdateUserPassword = async (userId:number
                    , oldPassword:string
                    , newPassword:string
                    , repeatPassword:string) => {
      try {
        const pool = await this.createConnection();
        const result = await pool.request()
        .input("userID", TYPES.BigInt, userId)
        .input("oldPassword", TYPES.VarChar, oldPassword)
        .input("newPassword", TYPES.VarChar, newPassword)
        .input("repeatNewPassword", TYPES.VarChar, repeatPassword)
        .output("errorCode", TYPES.Varchar)
        .output("errorDescription", TYPES.Varchar)
        .execute('sp_ChangeUserPassWord');
        return {
          result: null,
          err: (result.output.errorCode != null?
            {
              errorCode : result.output.errorCode,
              errorDescript : result.output.errorDescription
            }
            : null) 
        };
      } catch (err) {
        throw err;
      }
    };

    GetPriceList = async (userId:number) => {
      try {
        const pool = await this.createConnection();
        const result = await pool.request()
        .input("userID", TYPES.BigInt, userId)
        .output("nCantidadPaginas", TYPES.BigInt)
        .execute('sp_GetPriceList');
        return {
          result: (result.recordset),
          err: (result.output.errorCode != null?
            {
              errorCode : result.output.errorCode,
              errorDescript : result.output.errorDescription
            }
            : null)
        };
      } catch (err) {
        throw err;
      }
    };
}

export default MSSQL;