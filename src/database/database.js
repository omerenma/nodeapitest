import dotenv from 'dotenv'
import pool from 'pg'

const {Pool} = pool



dotenv.config()

const {
    POSTGRES_HOST,
    POSTGRES_DB ,
    PGPORT,
    POSTGRES_USER ,
    POSTGRES_PASSWORD,
    ENV
} = process.env 

export const client = new Pool({
    host:POSTGRES_HOST,
    port: PGPORT,
    database:  POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD
})

