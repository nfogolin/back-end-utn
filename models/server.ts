import express from 'express';
import cors from 'cors';
import IServer from '../interfaces/server';
import AuthorizationRouter from '../routes/authorization';
import ClientsRouter from '../routes/clients';
import interceptorRes from '../middlewares/interceptorRes';
import configs from '../helpers/configs';

class Server implements IServer {

    App: any;
    Port: number;
    AuthorizationPath: string;

    constructor(){
        this.App = express();
        this.Port = Number.parseInt(configs.PORT || '8085');
        this.AuthorizationPath = (configs.AUTHORIZATION_PATH || '').toString();

        this.Middlewares();
        this.Routes();
    }

    Middlewares(){
        this.App.use(cors());
        this.App.use(express.json());
        this.App.use(express.static('public'));
    }

    Routes(){
        this.App.use(interceptorRes);
        this.App.use(this.AuthorizationPath, AuthorizationRouter);
        this.App.use('/Clients/SearchClients', ClientsRouter);
        this.App.use('*', express.static('public'));
    }

    Start(){
        this.App.listen(this.Port, ()=>{
            console.log(`Servidor corriendo sobre puerto ${this.Port}`);
        });
    }
}

export default Server;