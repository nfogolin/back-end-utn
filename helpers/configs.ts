import { config } from 'dotenv';

config({
    path: '../.env'
});

export = {
    AUTHORIZATION_PATH : process.env.AUTHORIZATION_PATH || "",
    SEARCH_CLIENTS_PATH : process.env.SEARCH_CLIENTS_PATH || "",
    GET_COUNTRIES_PATH : process.env.GET_COUNTRIES_PATH || "",
    GET_PROVINCES_PATH : process.env.GET_PROVINCES_PATH || "",
    GET_CITIES_PATH : process.env.GET_CITIES_PATH || "",
    GET_COMPANY_PATH : process.env.GET_COMPANY_PATH || "",
    GET_CUSTOMERS_PATH : process.env.GET_CUSTOMERS_PATH || "",
    CREATE_USER_PATH : process.env.CREATE_USER_PATH || "",
    UPDATE_PASSWORD_PATH : process.env.UPDATE_PASSWORD_PATH || "",
    GET_PRICE_LISTS_PATH : process.env.GET_PRICE_LISTS_PATH || "",
    VALIDATE_TOKEN_PATH : process.env.VALIDATE_TOKEN || "",
    PORT : process.env.PORT || "",
    SEED_TOKEN : process.env.SEED_TOKEN || "",
    EXPIRATION_TOKEN : process.env.EXPIRATION_TOKEN || "",
    APP_CONFIGS : process.env.APP_CONFIGS || ""
}