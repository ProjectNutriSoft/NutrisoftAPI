import {connect, Request} from 'mssql'

const config = {
    user: process.env.DB_USER || '',
    password: process.env.DB_PASS || '',
    server: process.env.DB_SERVER || '',
    database: process.env.DB_DATABASE || ''
}

export const getConnection = async ()=>{
    const pool = await connect(config);
    return pool.request();
}