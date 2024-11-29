import { ValidationError } from 'yup'
import { CustomError } from '../errors/custom-error'
import { NextFunction, Request, Response } from 'express'
import { Error as PostgresError } from 'postgres'

const handleError = (
  error: PostgresError,
  request: Request,
  response: Response,
  _: NextFunction
) => {
  if (error instanceof CustomError) {
    return response.status(error.statusCode).json({ message: error.message })
  }
  if (error instanceof ValidationError) {
    return response.status(400).json({ message: error.message })
  }
  return response
    .status(500)
    .json({ message: 'Ocorreu um erro ao fazer a requisição.' })
}

export default handleError