import {Pool} from "pg";

// set db configuration
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "binar_ch_5",
    password: "dokonjou",
    port: 5432
})

export default pool;