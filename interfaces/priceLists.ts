import IItemPriceList from "./itemsPriceList";

interface IPriceList {
    Id : number,
    Code : number,
    Descript : string,
    DetailPriceList : IItemPriceList[]
}

export default IPriceList