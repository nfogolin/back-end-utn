import express from 'express';
import cors from 'cors';
import IServer from '../interfaces/server';
import AuthorizationRouter from '../routes/authorization';
import ClientsRouter from '../routes/clients';
import CountriesRouter from '../routes/countries';
import interceptorRes from '../middlewares/interceptorRes';
import configs from '../helpers/configs';
import ProvincesRouter from '../routes/provinces';
import CitiesRouter from '../routes/cities';
import CompanyRouter from '../routes/company';

class Server implements IServer {

    App: any;
    Port: number;
    AuthorizationPath: string;
    SearchClientsPath: string;
    GetCountriesPath: string;
    GetProvincePath: string;
    GetCityPath: string;
    GetCompany: string;

    constructor(){
        this.App = express();
        this.Port = Number.parseInt(configs.PORT || '8085');
        this.AuthorizationPath = (configs.AUTHORIZATION_PATH || '').toString();
        this.SearchClientsPath = (configs.SEARCH_CLIENTS_PATH || '').toString();
        this.GetCountriesPath = (configs.GET_COUNTRIES_PATH || '').toString();
        this.GetProvincePath = (configs.GET_PROVINCES_PATH || '').toString();
        this.GetCityPath = (configs.GET_CITIES_PATH ||'').toString();
        this.GetCompany = (configs.GET_COMPANY_PATH ||'').toString();

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
        this.App.use(this.SearchClientsPath, ClientsRouter);
        this.App.use(this.GetCountriesPath, CountriesRouter);
        this.App.use(this.GetProvincePath, ProvincesRouter);
        this.App.use(this.GetCityPath, CitiesRouter);
        this.App.use(this.GetCompany, CompanyRouter)
        this.App.use('*', express.static('public'));
    }

    Start(){
        this.App.listen(this.Port, ()=>{
            console.log(`Servidor corriendo sobre puerto ${this.Port}`);
        });
    }
}

export default Server;