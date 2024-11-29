import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from './schema'
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined')
}

const db = drizzle(process.env.DATABASE_URL, { schema, logger: true })
