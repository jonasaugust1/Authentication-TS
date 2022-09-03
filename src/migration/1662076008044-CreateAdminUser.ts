import { MigrationInterface, QueryRunner } from "typeorm"
import { AppDataSource } from "../data-source"
import { User } from "../entity/User"

export class CreateAdminUser1662076008044 implements MigrationInterface {
    // Algo novo que vai entrar no sistema
    public async up(queryRunner: QueryRunner): Promise<void> {
       
        let user = new User()
        user.username = "admin"
        user.password = "admin"
        user.hashPassword()
        user.role = "ADMIN"

        const userRepository = AppDataSource.getRepository(User)
        await userRepository.save(user)
    }
    // Algo que vai ser tirado do sistema
    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
