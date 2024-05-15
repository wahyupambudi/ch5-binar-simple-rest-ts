import http from "http";
import express from "express";
import carsRouter from "./routes/cars.routes";
import bodyParser from "body-parser";

const port = 3000;
const app = express();

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