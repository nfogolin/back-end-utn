import ICity from "./cities";

interface ICompany {
    Id : string,
    Code : string,
    Descript : string,
    FantasyName : string,
    Address : string,
    City : ICity,
    Phone : string,
    CelPhone?: string,
    Email?: string,
    StartActivities : Date,
    AdditionalMails?: string,
    ActivityDescription?: string,
    ContactInformation?: string,
    Facebook?: string,
    Instagram?: string
}

export default ICompany