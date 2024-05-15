interface ArrList {
    id: number,
    name: string,
    price: string,
    startRent: string,
    finishRent: string,
    createdAt: string,
    updatedAt: string
}

type idItem =  number;

const filterCars = (arrList: ArrList[], idItem: number) => {
    return arrList.find(({id}) => id === idItem)
}

export default filterCars;