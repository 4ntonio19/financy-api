import { UserRequestBody, User } from "./user.entity"

export interface CreateUserModel {
    create: (dto: UserRequestBody) => Promise<string>
}

export interface ListUserByIdModel {
    findById: (id: string) => Promise<User>
}

export interface ListUserByEmailModel {
    findByEmail: (email: string) => Promise<User>
}