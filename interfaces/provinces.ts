import ICountry from "./countries";

interface IProvince {
    Id : string,
    Code : string,
    Descript : string,
    Country : ICountry
}

export default IProvince;