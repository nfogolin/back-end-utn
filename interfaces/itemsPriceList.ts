import IProduct from "./products";

interface IItemPriceList {
    Id : number,
    AddedTax : number,
    ClientDiscount : number,
    EquivalentDiscount : number,
    EspecifyProductDiscount : number,
    FinalPrice : number
    FinalPriceWithDiscount : number,
    ItemDiscount : number,
    Price : number
    PriceWithDiscount : number
    Product : IProduct
}

export default IItemPriceList;