import{Router, Request, Response} from "express";
import {v4 as uuidv4} from 'uuid';
import {cars} from "../__data_mocks__/cars";
import filterCars from "../utils/filter";
import pool from "../db/index"

const router = Router();

// GET cars
router.get("/", async (_req: Request, res: Response) => {
    const result = await pool.query("SELECT * FROM cars");
    const data = result.rows;

    res.status(200).json({
        message: "OK",
        cars: data
    })
})

router.get("/:id", async (req: Request, res: Response) => {
    const getId: number = Number(req.params.id);
    const query = await pool.query(`SELECT * FROM cars WHERE id = ${getId}`);
    
    const result = query.rows[0];
    // const carById = cars.find(({id}) => id === getId)
    // const carById = filterCars(cars, getId)

    // console.log({carById})
    res.status(200).json({
        car:result
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

router.post("/create", async (req: Request, res: Response) => {
    const idCar = Math.floor(Math.random() * 100);
    const {name, startRent, finishRent, avaibility} = req.body;
    const query = await pool.query("INSERT INTO cars (id, name, start_date, end_date, avaibility) VALUES ($1, $2, $3, $4, $5) RETURNING *", [idCar, name, startRent, finishRent, avaibility]);

    const createdCar = query.rows;

    // const newObj = {
    //     id: uuidv4(),
    //     name,
    //     price,
    //     startRent,
    //     finishRent,
    //     createdAt: "05/14/2024",
    //     updatedAt: new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' })
    // }

    res.status(201).json({
        status: "OK",
        message: "Item Successfully created",
        data: createdCar
    })
})

export default router;