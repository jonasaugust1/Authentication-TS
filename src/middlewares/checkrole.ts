import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source"; 
import { User } from "../entity/User";

export const checkRole = (roles: Array<string>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const id = res.locals.jwtPayLoad.userId;

        const userRespository = AppDataSource.getRepository(User);
        let user: User;

        try {
            user = await userRespository.findOneOrFail(id);
        } catch (error: any) {
            res.status(401).send(error.message);
        }

        if(roles.indexOf(user.role) > -1) next();
        else res.status(401).send();
    }
}