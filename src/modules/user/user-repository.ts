import { UserRequestBody, User } from './user-entity'

export class UserRepository {
  async post({ name, email }: UserRequestBody): Promise<User> {
    const data = prisma.user.create({
      data: {
        name,
        email,
      },
    })
    return data
  }

  async getOneByEmail(email: string): Promise<User | null> {
    const data = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!data) return null
    return data
  }

  async getOneById(id: string): Promise<User | null> {
    const data = await prisma.user.findUnique({
      where: {
        id,
      },
    })
    if (!data) return null
    return data
  }
}