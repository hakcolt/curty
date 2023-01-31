import constants from "./Contraints"
import { UserInput } from "./User"

interface ResultData<T> {
  message: string | undefined
  error: string | undefined
  statusCode: number
  _isSuccess: boolean
  next: string | undefined
  data: T
}

interface Result {
  message: string | undefined
  error: string | undefined
  statusCode: number
  _isSuccess: boolean
  next: string | undefined
}

export { constants }
export type { Result, ResultData, UserInput }