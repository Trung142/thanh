const dp = require('mysql2/promise');
import dotenv from 'dotenv';
dotenv.config();
const poolmysql = dp.createPool({
    database: process.env.DB_NAME!,//database name
	user:process.env.DB_USER!,//user name
    host: process.env.DB_HOST!,//host
    password: process.env.DB_PASSWORD!,//password
    port: parseInt(process.env.DB_PORT!,10),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

export default poolmysql