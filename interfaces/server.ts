
interface IServer {

    App: any,
    Port: number,
    AuthorizationPath: string,

    Middlewares(): void

    Routes(): void

    Start(): void

};

export default IServer;