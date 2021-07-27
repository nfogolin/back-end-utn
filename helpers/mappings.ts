import ICity from "../interfaces/cities";
import ICompany from "../interfaces/company";
import ICountry from "../interfaces/countries";
import ICustomer from "../interfaces/customers";
import IItemPriceList from "../interfaces/itemsPriceList";
import IPriceList from "../interfaces/priceLists";
import IProduct from "../interfaces/products";
import IProvince from "../interfaces/provinces";
import IUser from "../interfaces/users";

export class Mappings {

    static MappingData = (resultMssql:any[], interfaceName:string)=>{

        let Results: Array<any> = [];

        if (resultMssql != undefined){
            if (['IPriceList'].includes(interfaceName) == false){
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
                        case 'ICustomer':
                            Results.push(Mappings.MappingCustomers(dataRow));
                            break;
                        case 'IUser':
                            Results.push(Mappings.MappingUsers(dataRow));
                            break;
                        default:
                            break;
                    }
                });
            }else{
                Results.push(Mappings.MappingPriceList(resultMssql));
            }
            
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

    private static MappingUsers (user:any):IUser{

        let User: IUser;

        if (user.Nombre != undefined){

            User = {
                nIdUser : user.IdCodigo,
                sUserNameReal : user.Nombre,
                sUserLastName : user.Apellido,
                nUserType : 1
            };
        }

        return User!;
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

    private static MappingCustomers(customer:any):ICustomer {

        let Customer : ICustomer;

        if (customer.Customer_nIdCodigo != undefined){

            Customer = {
                Id : customer.Customer_nIdCodigo,
                Code : customer.Customer_nCodigo ,
                Descript : customer.Customer_sNombre,
                FantasyName : customer.Customer_sFantasia,
                Address : customer.Customer_sDireccion,
                Phone : customer.Customer_sTelefono,
                Email : customer.Customer_sEmail,
                Cuit : customer.Customer_sCuit,
                City : this.MappingCities(customer)
            }

        }   

        return Customer!;
    }

    private static MappingProducts(product:any):IProduct {

        let Product : IProduct;

        if (product.Product_nIdCodigo != undefined) {

            Product = {
                Id : product.Product_nIdCodigo,
                Code : product.Product_sCodigo,
                Descript : product.Product_sNombre,
                Quantity : product.DepositDetail_nCantidad,
                AdditionalDescript : product.Product_sDescAdicional,
                Images : [
                        product.Product_ImgBinary 
                        , product.Product_ImgBinary2
                        , product.Product_ImgBinary3
                ]   
            }

        }

        return Product!;
    }

    private static MappingItemPriceList(item:any): IItemPriceList {

        let ItemPriceList:IItemPriceList;

        if (item.ItemPriceList_nIdCodigo != undefined){
            ItemPriceList = {
                Id : item.ItemPriceList_nIdCodigo,
                AddedTax : item.Alicuota,
                ClientDiscount : item.CustomerDiscount,
                EquivalentDiscount : item.DescEquivalente,
                EspecifyProductDiscount : item.Detalle_Descuentos_Productos_nTotal,
                FinalPrice : item.PrecioFinalSinDesc,
                FinalPriceWithDiscount : item.PrecioFinalConDesc,
                ItemDiscount : item.Detalle_Descuentos_Rubros_nTotal,
                Price : item.ItemPriceList_nPrecio,
                PriceWithDiscount : item.PrecioConDesc,
                Product : this.MappingProducts(item)
            }
        }
    
        return ItemPriceList!;
    }

    private static MappingPriceList(resultMssql:any[]):IPriceList {
        
        let PriceList:IPriceList;
        let ItemPriceList:IItemPriceList;
        let DetailItemPriceList: Array<IItemPriceList> = new Array();

        resultMssql.forEach((priceList)=>{
            if (priceList.PriceList_nIdCodigo != undefined){

                ItemPriceList = this.MappingItemPriceList(priceList);

                if (PriceList == undefined){
                    PriceList = {
                        Id : priceList.PriceList_nIdCodigo,
                        Code : priceList.PriceList_nCodigo,
                        Descript : priceList.PriceList_sNombre,
                        DetailPriceList : DetailItemPriceList
                    }
                }

                DetailItemPriceList.push(ItemPriceList);
                
            }
        });

        return PriceList!;
    }
}