import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import {Request, Response, NextFunction} from 'express'
import { Data } from '../interface/Data'

dotenv.config()


export const verifyToken = (req, res,) => {
    try {
        // Get token from headers
        const token = req.headers['token'] ;
        if(!token){
            return res.status(401).json({message: 'You are not authenticated'})
        }
        const verify = jwt.verify(token, process.env.TOKEN_SECRET) 
       req.info = verify

    } catch (error) {
        return res.status(500).json({error: 'something went wrong'})
    }
    next()
}