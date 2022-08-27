import { Router, Response, Request, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config/config";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    const token = <string>req.header["auth"];
    let jwtPayLoad;

    try{
        jwtPayLoad = <any>jwt.verify(token, config.jwtSecret);
        res.locals.jwtPayLoad = jwtPayLoad;
    } catch(error: any){
        res.status(401).send();
    }

    const {userId, username} = jwtPayLoad;
    const newToken = jwt.sign({userId, username}, config.jwtSecret, {
        expiresIn: "1h"
    })

    res.setHeader("token", newToken);

    next();
}

