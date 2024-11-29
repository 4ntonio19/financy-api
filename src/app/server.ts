import express, { NextFunction, Request, Response } from 'express'
import routes from './routes'
import cors from 'cors'
import handleError from '../shared/middlewares/handle-error'
import { Error as PostgresError } from 'postgres'
const app = express()
const PORT = 3333

app.use(cors({ origin: '*' }))

app.use(routes)
app.use(
  (
    error: PostgresError,
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    handleError(error, request, response, next)
  }
)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
