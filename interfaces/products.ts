
interface IProduct {
    Id : number,
    Code : string,
    Descript : string,
    Quantity : string,
    AdditionalDescript? : string
    Images : Array<string>
}

export default IProduct;