interface ResultData<T> extends Result {
  data: T
}

interface Result {
  message: string | undefined
  error: string | undefined
  statusCode: number
  _isSuccess: boolean
  next: string | undefined
}

export type { Result, ResultData }