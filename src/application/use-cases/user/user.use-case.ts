import { CreateUserDTO } from "@application/dtos/user/create-user";
import { UpdateUserDTO } from "@application/dtos/user/update-user";
import { CryptographyAdapter } from "@domain/adapters/cryptography";
import { ExceptionsAdapter } from "@domain/adapters/exceptions";
import { RoleEnum, User } from "@domain/entities/user";
import { UserRepository } from "@domain/repositories/user.repository";
import { Injectable } from "@nestjs/common";



@Injectable()
export class UserUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly exceptionAdapter: ExceptionsAdapter,
        private readonly hashAdapter: CryptographyAdapter,
    ) { }

    async createUser(user: CreateUserDTO): Promise<User> {
        const findUser = await this.userRepository.findUserByEmail(user.email)

        if (findUser) {
            throw this.exceptionAdapter.badRequest({
                message: 'Already exist user with this email',
            })
        }

        const hashedPassword = await this.hashAdapter.generateHash(user.password)

        const { name, email, phone, city, state, language } = user

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            phone,
            city,
            state,
            language,
            role: RoleEnum.INSTITUTION,
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null,
        })
        return await this.userRepository.createUser(newUser)
    }

    async findByEmail(email: string): Promise<User | void> {
        const user = await this.userRepository.findUserByEmail(email)

        if (!user) {
            return
        }

        return user;
    }

    async findById(id: string): Promise<User | void> {
        const findById = await this.userRepository.findUserById(id)

        if (!findById) {
            return this.exceptionAdapter.notFound({
                message: 'Not found a user with this id',
            })
        }

        return findById
    }

    async findAll(): Promise<User[]> {
        const findUsers = await this.userRepository.findAll()

        return findUsers
    }

    async updateUser(
        id: string,
        updateUserDto: UpdateUserDTO,
    ): Promise<User | void> {
        const { city, email, language, name, password, phone, state } =
            updateUserDto

        const user = await this.userRepository.findUserById(id)

        if (!user) {
            return this.exceptionAdapter.notFound({
                message: 'Not found a user with this id',
            })
        }

        if (email) {
            const emailAlreadyUse = await this.userRepository.findUserByEmail(email)

            if (emailAlreadyUse) {
                return this.exceptionAdapter.badRequest({
                    message: 'This email already use',
                })
            }
        }

        let hashPassword = user.getPassword()
        if (password) {
            hashPassword = await this.hashAdapter.generateHash(password)
        }

        user.setCity(city ?? user.getCity())
        user.setEmail(email ?? user.getEmail())
        user.setLanguage(language ?? user.getLanguage())
        user.setName(name ?? user.getName())
        user.setPassword(hashPassword)
        user.setPhone(phone ?? user.getPhone())
        user.setState(state ?? user.getState())
        user.setUpdatedAt(new Date())

        return await this.userRepository.updateUser(id, user)
    }

    async deleteUser(id: string): Promise<void> {
        const user = await this.userRepository.findUserById(id)

        if (!user) {
            return this.exceptionAdapter.notFound({
                message: 'Not found a user with this id',
            })
        }
        await this.userRepository.delete(id)
    }
}