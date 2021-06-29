import ICity from "./cities";

interface ICustomer {
    Id : number,
    Code : number,
    Descript : string,
    FantasyName : string,
    Address : string,
    Phone : string,
    Email : string,
    Cuit : string,
    City : ICity
}

export default ICustomer;

/*

body('mobile', 'Invalid mobile number.')
.escape()
.exists({checkFalsy: true})
.isLength({min: 11, max:11})
.matches(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)

Exec sp_GetCustomers 90113
*/