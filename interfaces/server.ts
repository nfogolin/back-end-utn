
interface IServer {

    App: any,
    Port: number,
    AuthorizationPath: string,
    SearchClientsPath: string,
    GetProvincePath: string,
    GetCountriesPath: string,
    GetCityPath: string,
    GetCompanyPath: string,
    GetCustomersPath: string,
    CreateUserPath:string,
    UpdatePasswordPath:string,
    GetPriceListsPath:string
    GetValidateTokenPath:string

    Middlewares(): void

    Routes(): void

    Start(): void

};

export default IServer;