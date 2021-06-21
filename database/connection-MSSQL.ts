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
            }
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
          err: (result.output.userID == null?ErrorsEnum.GetErrorDescript(ErrorsEnum.Errors.ERROR_USER_OR_PASS_INVALID): null) 
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
      err: (result.output.errorCode != null?result.output.errorCode: null) 
    };
    } catch (err) {
      throw err;
      }
    };

    SearchClients = async (IdEmpresa:string) => {
      try {
        const pool = await this.createConnection();
        const result = await pool.request()
        .input("IdEmpresa", TYPES.VarChar, IdEmpresa)
        .query(`select TOP 50 * from Clientes(NOLOCK) where IdEmpresa = @IdEmpresa`);
          return {
            result: result.recordset,
            err: null
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
          err: null
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
            err: null
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
            err: null
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
}

export default MSSQL;