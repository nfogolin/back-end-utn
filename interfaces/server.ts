
interface IServer {

    App: any,
    Port: number,
    AuthorizationPath: string,
    SearchClientsPath: string,
    GetProvincePath: string,
    GetCountriesPath: string,
    GetCityPath: string,
    GetCompany: string

    Middlewares(): void

    Routes(): void

    Start(): void

};

export default IServer;