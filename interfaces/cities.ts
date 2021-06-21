import IProvince from "./provinces";

interface ICity {
    Id : string,
    Code : string,
    Descript : string,
    CodPostal?: string
    Province?: IProvince
}

export default ICity;