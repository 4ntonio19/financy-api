import { and, desc, eq, gte, lte } from 'drizzle-orm'
import { db } from '../../config/db'
import { categorySchema, transactionSchema } from '../../config/db/schema'
import { Transaction, TransactionRequestBody } from './transaction-entity'
import { string } from 'yup'

export class TransactionRepository {
  async getAllInPeriod(
    userId: string,
    startDate: Date,
    endDate: Date
  ): Promise<Transaction[]> {
    console.log(userId)

    const data = db
      .select({
        id: transactionSchema.id,
        title: transactionSchema.title,
        value: transactionSchema.value,
        type: transactionSchema.type,
        date: transactionSchema.date,
        category: {
          id: categorySchema.id,
          title: categorySchema.title,
          color: categorySchema.color,
        },
      })
      .from(transactionSchema)
      .innerJoin(
        categorySchema,
        eq(transactionSchema.categoryId, categorySchema.id)
      )
      .where(
        and(
          eq(transactionSchema.userId, userId),
          gte(transactionSchema.date, startDate),
          lte(transactionSchema.date, endDate)
        )
      )
      .orderBy(desc(transactionSchema.date))
    return data
  }

  async getOneById(id: string, userId: string): Promise<Transaction> {
    const data = await db
      .select({
        id: transactionSchema.id,
        title: transactionSchema.title,
        value: transactionSchema.value,

        type: transactionSchema.type,
        date: transactionSchema.date,
        category: {
          id: transactionSchema.categoryId,
        },
      })
      .from(transactionSchema)
      .where(
        and(eq(transactionSchema.id, id), eq(transactionSchema.userId, userId))
      )

    const transaction = data[0]
    return transaction
  }

  async postOne(userId: string, dto: TransactionRequestBody): Promise<string> {
    const data = await db
      .insert(transactionSchema)
      .values({
        title: dto.title,
        value: dto.value,
        type: dto.type,
        date: new Date(),
        categoryId: dto.categoryId,
        userId,
      })
      .returning({ id: transactionSchema.id })

    const transactionId = data[0].id
    return transactionId
  }

  async putOne(
    id: string,
    userId: string,
    dto: TransactionRequestBody
  ): Promise<string> {
    const data = await db
      .update(transactionSchema)
      .set({
        title: dto.title,
        value: dto.value,
        date: new Date(dto.date),
        type: dto.type,
        categoryId: dto.categoryId,
      })
      .where(
        and(eq(transactionSchema.id, id), eq(transactionSchema.userId, userId))
      )
      .returning({ id: transactionSchema.id })
    const transactionId = data[0].id
    return transactionId
  }

  async deleteOne(id: string, userId: string): Promise<void> {
    await db
      .delete(transactionSchema)
      .where(
        and(eq(transactionSchema.id, id), eq(transactionSchema.userId, userId))
      )
  }
}
