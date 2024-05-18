import http from "http";
import express from "express";
import carsRouter from "./routes/cars.routes";
import bodyParser from "body-parser";
import knex from "knex";
import {Model} from "objection";


const port = 3000;
const app = express();

const knexInstance = knex({
    client: "pg",
    connection: {
        database: "binar_ch_5",
        user: "postgres",
        password: "dokonjou",
        port: 5432
    }
})

Model.knex(knexInstance);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/cars", carsRouter);


app.get("/hello-world", (req, res) => {
    res.status(200).json({
        message: "Hello World"
    })
})

const server = http.createServer(app);
server.listen(port, () => {
    console.log(`API running on port ${port}`)
})