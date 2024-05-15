import{Router, Request, Response} from "express";
import {v4 as uuidv4} from 'uuid';
import {cars} from "../__data_mocks__/cars";
import filterCars from "../utils/filter";

const router = Router();

// GET cars
router.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        cars
    })
})

router.get("/:id", (req: Request, res: Response) => {
    const getId: number = Number(req.params.id);
    // const carById = cars.find(({id}) => id === getId)
    const carById = filterCars(cars, getId)

    // console.log({carById})
    res.status(200).json({
        car:carById
    })
})

// PUT/UPDATE
router.put("/:id", (req: Request, res: Response) => {
    const getId: number = Number(req.params.id);
    const { name, price, startRent, finishRent } = req.body;
    const carById = filterCars(cars, getId);

    const updatedCarById = {
        ...carById, 
        id: getId,
        name,
        price,
        startRent,
        finishRent,
        createdAt: "05/14/2024",
        updatedAt: "05/14/2024"
    };

    const filterUpdatedCar = cars.filter(({id}) => id !== getId);
    filterUpdatedCar.push(updatedCarById)
    
    // console.log({filterUpdatedCar})

    res.status(200).json({
        status: "OK",
        message: "Data Updated Successfully",
        cars: filterUpdatedCar
    })
})

router.delete("/:id", (req: Request, res: Response) => {
    const getId = Number(req.params.id);

    const filterById = cars.filter(({id}) => id !== getId);

    res.status(200).json({
        status: "OK",
        message: "Item successfully deleted",
        cars: filterById
    })
})

router.post("/create", (req: Request, res: Response) => {
    const {name, price, startRent, finishRent} = req.body;
    const newObj = {
        id: uuidv4(),
        name,
        price,
        startRent,
        finishRent,
        createdAt: "05/14/2024",
        updatedAt: new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' })
    }

    res.status(201).json({
        status: "OK",
        message: "Item Successfully created",
        data: newObj
    })
})

export default router;