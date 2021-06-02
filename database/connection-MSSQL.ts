const { TYPES } = require("mssql");
const sql = require('mssql/msnodesqlv8');
import { query } from 'jsonpath';

class MSSQL {

    connectionId:string

    constructor(connectionId:string){
        this.connectionId = connectionId;
    }

    createConnection = () => {
        try{
          let [dataBaseConfig]:any = query(require((process.env.CONNECTIONS_CONFIG || "").toString()), '$..connections[?(@.connectionId=="' + this.connectionId + '")]');
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
          err: (result.output.userID == null?'El nombre de usuario y/o el la contraseña son inválidos.': null) 
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
        nIdUser: result.output.userID,
        sUserNameReal: result.output.userNameReal,
        sUserLastName: result.output.userLastName,
        nUserType: result.output.userType
      },
      err: (result.output.userID == null?'El nombre de usuario y/o el la contraseña son inválidos.': null) 
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

}

export default MSSQL;