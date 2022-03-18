import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
const config= process.env;
const TOKEN_KEY= process.env.TOKEN_KEY as string;

export const verifytoken=(req: Request, res: Response, next: NextFunction)=>{
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token) {
        res.status(403).send("A token is required for authentication");
    }
    try {
        req.params.jwt = JSON.stringify(jwt.verify(token, TOKEN_KEY));

    } 
    catch (err){
        res.status(401).send("Invalid Token");
    }
    return next();
};

