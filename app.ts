import { config } from 'dotenv';
import Server from './models/server'

config({path: '../.env'});

let server:Server = new Server();

server.Start();
