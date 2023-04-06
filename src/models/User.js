import {client} from '../database/database.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


    export class UsersModel {
    async addUser(user) {
        try {
            const db_connection = client.connect()
            const checkEmail = `SELECT email FROM users WHERE email=($1)`
            const query_email = await (await db_connection).query(checkEmail, [user.email])
            if( query_email.rows.length > 0){
                throw new Error(`User with email: ${user.email},  already exist.`)
            }else{
                const hash =   bcrypt.hashSync(user.password, 10);
                const sql = 'INSERT INTO users (name, email, role, password) VALUES ($1, $2, $3, $4) RETURNING * ';
                const result = await (await db_connection).query(sql, [user.name,user.email, user.role,  hash])
                const response =  result
                 return response.rows[0]
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    async login (user){
        try {
            const db_connection = client.connect()
            const check_email = `SELECT email, password FROM users WHERE email = ($1)`
            const query_email = await (await db_connection).query(check_email, [user.email])
            if(query_email.rows.length > 0){
               const isMatch = await bcrypt.compare(user.password, query_email.rows[0].password)
                if(isMatch){
                    return query_email.rows[0]
                }
                throw new Error('Invalid credentials supplied')
            }
            throw new Error('User not found')
        } catch (error) {
            throw new Error(error)
        } 
    }

    // Get all users
    async getUsers (){
        try {
         const db_connection = client.connect()
         const sql = `SELECT * FROM users`
         const query = await (await db_connection).query(sql)
         return query.rows
        } catch (error) {
            console.log("BAD THING :", error)
         return error
        }
    }

    // Delete user

    async deleteUser (id) {
        try {
            const db_connection = client.connect()
            const query_id = `DELETE  FROM users WHERE id =($1)`
            const sql = await (await db_connection).query(query_id, [id])
            return sql.rows[0]
        } catch (error) {
            return error
        }
    }

     // UPDATE user

     async editUser (id){
        try {
            const db_connection = client.connect()
            const query = `UPDATE users SET name, email, role WHERE id = ($1)`
            const sql = await (await db_connection).query(query, [id, name, email, role])
            if (sql.rows.length > 0 ) {
                return sql.rows[0].id
            }
                return sql.rows[0]
        } catch (error) {
            return error
        }
    }
    

}