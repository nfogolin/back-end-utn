import { config } from 'dotenv';

config({
    path: '../.env'
});

export = {
    AUTHORIZATION_PATH : process.env.AUTHORIZATION_PATH || "",
    PORT : process.env.PORT || "",
    SEED_TOKEN : process.env.SEED_TOKEN || "",
    EXPIRATION_TOKEN : process.env.EXPIRATION_TOKEN || "",
    APP_CONFIGS : process.env.APP_CONFIGS || ""
}