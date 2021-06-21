import ICity from "../interfaces/cities";
import ICompany from "../interfaces/company";
import ICountry from "../interfaces/countries";
import IProvince from "../interfaces/provinces";

export class Mappings {

    static MappingData = (resultMssql:any[], interfaceName:string)=>{

        let Results: Array<any> = [];

        if (resultMssql != undefined){
            resultMssql.forEach((dataRow)=>{
                switch (interfaceName) {
                    case 'ICountry':
                        Results.push(Mappings.MappingCountries(dataRow));
                        break;
                    case 'IProvince':
                        Results.push(Mappings.MappingProvinces(dataRow));
                        break;
                    case 'ICity':
                        Results.push(Mappings.MappingCities(dataRow));
                        break;
                    case 'ICompany':
                            Results.push(Mappings.MappingCompany(dataRow));
                            break;
                    default:
                        break;
                }
            });
        }

        return Results;
    }

    private static MappingCountries (country:any):ICountry{

        let Country: ICountry;

        if (country.Country_nIdCodigo != undefined){

            Country = {
                Id : country.Country_nIdCodigo,
                Code : country.Country_nCodigo,
                Descript : country.Country_sNombre
            };

        }

        return Country!;
    }

    private static MappingProvinces (province:any):IProvince{

        let Province: IProvince;

        if (province.Province_nIdCodigo != undefined){

            Province = {
                Id : province.Province_nIdCodigo,
                Code : province.Province_nCodigo,
                Descript: province.Province_sNombre,
                Country : Mappings.MappingCountries(province)
            };

        }
        
        return Province!;
    }

    private static MappingCities (city:any):ICity{

        let City: ICity;

        if (city.City_nIdCodigo != undefined){

            City = {
                Id : city.City_nIdCodigo,
                Code : city.City_nCodigo,
                Descript: city.City_sNombre,
                CodPostal : city.City_sCodPostal,
                Province : Mappings.MappingProvinces(city)
            };

        }
        
        return City!;
    }

    private static MappingCompany(company:any):ICompany{

        let Company: ICompany;

        if (company.Company_IdCodigo != undefined){

            Company = {
                Id : company.Company_IdCodigo,
                Code : company.Company_Codigo,      
                Descript: company.Company_Nombre,                                     
                FantasyName : company.Company_RazonSocial,                                
                Phone : company.Company_Telefono,               
                CelPhone : company.Company_Celular,                
                Address : company.Company_Direccion,                                  
                Email : company.Company_Email,                                      
                StartActivities : company.Company_FechaInicio,     
                City : this.MappingCities(company),    
                AdditionalMails : company.Company_MailsAdicionales,                                                                                                                                                                                                                                   
                ActivityDescription : company.Company_DescActividad,                                                                                                                                                                                                                                            
                ContactInformation : company.Company_DatosContacto,                                                                                                                                                                                                                                            
                Facebook : company.Company_Facebook,                                                                                     
                Instagram : company.Company_Instagram
            }

        }

        return Company!;
    }
}