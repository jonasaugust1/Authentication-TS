import { DataSource } from 'typeorm';
import { Request, Response } from "express"
import { AppDataSource } from "../data-source"
import { User } from "../entity/User"
import { validate } from 'class-validator';

export class UserController {

    static listAll = async (req: Request, res: Response) => {
        const userRepository = AppDataSource.getRepository(User)
        const users = await userRepository.find({select: ["id", "username", "role"]})

        res.send(users)
    }

    static getOneById = async (req: Request, res: Response) => {
        const id: any = req.params.id

        const userRepository = AppDataSource.getRepository(User)
        let user: User
        try {
            const user = await userRepository.findOneOrFail({where: id})
        } catch (error) {
            res.status(404).send("User not found")
        }

        res.send(user)
    }

    static newUser = async (req: Request, res: Response) => {
        let {username, password, role} = req.body

        let user: User = new User()
        user.username = username
        user.password = password
        user.role = role

        const errors = await validate(user)

        if(errors.length > 0) {
            res.status(400).send(errors)
        }

        user.hashPassword()

        const userRepository = AppDataSource.getRepository(User)

        try {
            await userRepository.save(user)
        } catch (error) {
            res.status(400).send(error)
        }

        res.status(201).send("User created")
    }

    static editUser = async (req: Request, res: Response) => {
        
        const id: any = req.params.id

        const {username, role} = req.body

        const userRepository = AppDataSource.getRepository(User)
        let user: User

        try {
            user = await userRepository.findOneOrFail({where: id})
        } catch (error) {
            res.status(404).send("User not found")
        }

        if(username) {
            user.username = username
        }

        if(role) {
            user.role = role
        }

        const errors = await validate(user)
        if(errors.length > 0){
            res.status(400).send(errors)
        }

        try {
            await userRepository.save(user)
        } catch (error) {
            res.status(409).send("Username already in use")
        }

        res.status(204)
    }

    static deleteUser = async (req: Request, res: Response) => {
        
        const id: any = req.params.id

        const userRepository = AppDataSource.getRepository(User)
        let user: User

        try {
            user = await userRepository.findOneOrFail({where: id})
        } catch (error) {
            res.status(404).send("User not found")
        }

        userRepository.delete(id)

        res.status(204)
    }
}